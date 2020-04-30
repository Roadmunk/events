
const fs                   = require('fs');
const path                 = require('path');
const WrapperTypes         = require('google-protobuf/google/protobuf/wrappers_pb');
let { TestMessage }        = require('./dist/test_message_pb');
const OptionalFieldPatcher = require('../OptionalFieldsPatcher');

// Simplify writing tests for all different scalar & wrapper types by looping over these arrays to generate the different test cases with minimal code duplication
const SCALAR_FIELDS = Object.freeze([
	{ type : 'double',   defaultVal : 0,      sampleVal : 123.456, ...accessorsFromSuffix('DoubleField'),   jsonName : 'doubleField'   },
	{ type : 'float',    defaultVal : 0,      sampleVal : 123.456, ...accessorsFromSuffix('FloatField'),    jsonName : 'floatField'    },
	{ type : 'int32',    defaultVal : 0,      sampleVal : 123456,  ...accessorsFromSuffix('Int32Field'),    jsonName : 'int32Field'    },
	{ type : 'int64',    defaultVal : 0,      sampleVal : 123456,  ...accessorsFromSuffix('Int64Field'),    jsonName : 'int64Field'    },
	{ type : 'uint32',   defaultVal : 0,      sampleVal : 123456,  ...accessorsFromSuffix('Uint32Field'),   jsonName : 'uint32Field'   },
	{ type : 'uint64',   defaultVal : 0,      sampleVal : 123456,  ...accessorsFromSuffix('Uint64Field'),   jsonName : 'uint64Field'   },
	{ type : 'sint32',   defaultVal : 0,      sampleVal : -123456, ...accessorsFromSuffix('Sint32Field'),   jsonName : 'sint32Field'   },
	{ type : 'sint64',   defaultVal : 0,      sampleVal : -123456, ...accessorsFromSuffix('Sint64Field'),   jsonName : 'sint64Field'   },
	{ type : 'fixed32',  defaultVal : 0,      sampleVal : 123456,  ...accessorsFromSuffix('Fixed32Field'),  jsonName : 'fixed32Field'  },
	{ type : 'fixed64',  defaultVal : 0,      sampleVal : 123456,  ...accessorsFromSuffix('Fixed64Field'),  jsonName : 'fixed64Field'  },
	{ type : 'sfixed32', defaultVal : 0,      sampleVal : -123456, ...accessorsFromSuffix('Sfixed32Field'), jsonName : 'sfixed32Field' },
	{ type : 'sfixed64', defaultVal : 0,      sampleVal : -123456, ...accessorsFromSuffix('Sfixed64Field'), jsonName : 'sfixed64Field' },
	{ type : 'bool',     defaultVal : false , sampleVal : true,    ...accessorsFromSuffix('BoolField'),     jsonName : 'boolField'     },
	{ type : 'string',   defaultVal : '',     sampleVal : 'foo',   ...accessorsFromSuffix('StringField'),   jsonName : 'stringField'   },
	{ type : 'bytes',    defaultVal : '',     sampleVal : 'Zm9v',  ...accessorsFromSuffix('BytesField'),    jsonName : 'bytesField'    },
]);
const OPTIONAL_WRAPPER_FIELDS = Object.freeze([
	{ type : 'BoolValue',   scalarDefault : false, sampleVal : true,    ...accessorsFromSuffix('WrapperBoolField'),   jsonName : 'wrapperBoolField'   },
	{ type : 'BytesValue',  scalarDefault : '',    sampleVal : 'Zm9v',  ...accessorsFromSuffix('WrapperBytesField'),  jsonName : 'wrapperBytesField'  },
	{ type : 'DoubleValue', scalarDefault : 0,     sampleVal : 123.456, ...accessorsFromSuffix('WrapperDoubleField'), jsonName : 'wrapperDoubleField' },
	{ type : 'FloatValue',  scalarDefault : 0,     sampleVal : 123.456, ...accessorsFromSuffix('WrapperFloatField'),  jsonName : 'wrapperFloatField'  },
	{ type : 'Int32Value',  scalarDefault : 0,     sampleVal : 123456,  ...accessorsFromSuffix('WrapperInt32Field'),  jsonName : 'wrapperInt32Field'  },
	{ type : 'Int64Value',  scalarDefault : 0,     sampleVal : 123456,  ...accessorsFromSuffix('WrapperInt64Field'),  jsonName : 'wrapperInt64Field'  },
	{ type : 'StringValue', scalarDefault : '',    sampleVal : 'Foo',   ...accessorsFromSuffix('WrapperStringField'), jsonName : 'wrapperStringField' },
	{ type : 'UInt32Value', scalarDefault : 0,     sampleVal : 123456,  ...accessorsFromSuffix('WrapperUint32Field'), jsonName : 'wrapperUint32Field' },
	{ type : 'UInt64Value', scalarDefault : 0,     sampleVal : 123456,  ...accessorsFromSuffix('WrapperUint64Field'), jsonName : 'wrapperUint64Field' },
]);

/**
 * Helper to generate the different accessor names based of of a suffix
 * @param {String} suffix 
 * @returns {Object}
 */
function accessorsFromSuffix(suffix) {
	return {
		getter     : `get${suffix}`,
		setter     : `set${suffix}`,
		hasField   : `has${suffix}`,
		clearField : `clear${suffix}`,
	}
}

// Need to grab the prototype keys before `TestMessage` gets patched in the `beforeAll()` below
// to allow us to properly create mock message classes in their pre-patched state 
const ORIG_PROTOTYPE_KEYS = Object.freeze({
	TestMessage         : Object.keys(TestMessage.prototype),
	NestedMessage       : Object.keys(TestMessage.NestedMessage.prototype),
	NestedNestedMessage : Object.keys(TestMessage.NestedMessage.NestedNestedMessage.prototype),
});

/**
 * Creates a mock message class duplicate of `TestMessage` and its nested message types in their pre-patched form.
 * @returns {Function}
 */
function mockMessageClass() {
	const MockMessage = _mockMessageClassHelper(
		function MockMessage() {},
		ORIG_PROTOTYPE_KEYS.TestMessage
	);
	MockMessage.NestedMessage = _mockMessageClassHelper(
		function MockNestedMessage() {},
		ORIG_PROTOTYPE_KEYS.NestedMessage
	);
	MockMessage.NestedMessage.NestedNestedMessage = _mockMessageClassHelper(
		function MockNestedNestedMessage() {},
		ORIG_PROTOTYPE_KEYS.NestedNestedMessage
	);
	return MockMessage;
}

/**
 * Helper to generate prototype & static stub functions on a mock message class
 * @param {Function} mockClass The class to have prototype/static functions stubbed
 * @param {String[]} protoKeys The names of all prototype functions to be stubbed
 * @returns {Function} The passed in class for easy chaining
 */
function _mockMessageClassHelper(mockClass, protoKeys) {
	for (const key of protoKeys) {
		mockClass.prototype[key] = jest.fn();
	}
	mockClass.deserializeBinary = jest.fn();
	mockClass.toObject = jest.fn();
	return mockClass;
}

describe('MessageClass Patching', () => {
	let patcher;
	beforeAll(() => {
		patcher = new OptionalFieldPatcher(fs.readFileSync(path.join(__dirname, '/dist/descriptors.msg')));
		TestMessage = patcher.patch('TestMessage', TestMessage);
	});

	describe('OptionalFieldsPatcher', () => {
		it('should throw an error if no messageName provided', () => {
			expect(() =>
				patcher.patch(null, function() {})
			).toThrow('message name & class are required');
		});

		it('should throw an error if no messageClass provided', () => {
			expect(() =>
				patcher.patch('SomeMessage')
			).toThrow('message name & class are required');
		});

		it('should return the message class passed in', () => {
			const mockClass = function() {};
			const result = patcher.patch('MockMessage', mockClass);
			expect(result).toEqual(mockClass);
		});

		SCALAR_FIELDS.forEach(({ type, getter, setter }) => {
			it(`should not proxy the getter of a ${type} scalar field`, () => {
				const MockMessage = mockMessageClass();
				const orig        = MockMessage.prototype[getter];
				patcher.patch('TestMessage', MockMessage);
				expect(MockMessage.prototype[getter]).toEqual(orig);
			});

			it(`should not proxy the setter of a ${type} scalar field`, () => {
				const MockMessage = mockMessageClass();
				const orig = MockMessage.prototype[setter];
				patcher.patch('TestMessage', MockMessage);
				expect(MockMessage.prototype[setter]).toEqual(orig);
			});
		});

		OPTIONAL_WRAPPER_FIELDS.forEach(({ type, getter, setter }) => {
			it(`should proxy the getter of a ${type} wrapper field`, () => {
				const MockMessage = mockMessageClass();
				const orig        = MockMessage.prototype[getter];
				patcher.patch('TestMessage', MockMessage);
				expect(MockMessage.prototype[getter]).not.toEqual(orig);
			});

			it(`should proxy the setter of a ${type} wrapper field`, () => {
				const MockMessage = mockMessageClass();
				const orig        = MockMessage.prototype[setter];
				patcher.patch('TestMessage', MockMessage);
				expect(MockMessage.prototype[setter]).not.toEqual(orig);
			});
		});

		it('should add a `get..._asB64()` convenience method for BytesValue wrapper type fields', () => {
			const MockMessage = mockMessageClass();
			expect(MockMessage.prototype.getWrapperBytesField_asB64).toBeFalsy();
			patcher.patch('TestMessage', MockMessage);
			expect(MockMessage.prototype.getWrapperBytesField_asB64).toBeTruthy();
			expect(MockMessage.prototype.getWrapperBytesField_asB64).toEqual(expect.any(Function));
		});

		it('should add a `get..._asU8()` convenience method for BytesValue wrapper type fields', () => {
			const MockMessage = mockMessageClass();
			expect(MockMessage.prototype.getWrapperBytesField_asU8).toBeFalsy();
			patcher.patch('TestMessage', MockMessage);
			expect(MockMessage.prototype.getWrapperBytesField_asU8).toBeTruthy();
			expect(MockMessage.prototype.getWrapperBytesField_asU8).toEqual(expect.any(Function));
		});

		it('should not proxy the getter of an enum field', () => {
			const MockMessage = mockMessageClass();
			const orig = MockMessage.prototype.getEnumField;
			patcher.patch('TestMessage', MockMessage);
			expect(MockMessage.prototype.getEnumField).toEqual(orig);
		});

		it('should not proxy the setter of an enum field', () => {
			const MockMessage = mockMessageClass();
			const orig = MockMessage.prototype.setEnumField;
			patcher.patch('TestMessage', MockMessage);
			expect(MockMessage.prototype.setEnumField).toEqual(orig);
		});

		it('should not proxy the getter of a repeated scalar field', () => {
			const MockMessage = mockMessageClass();
			const orig = MockMessage.prototype.getRepeatedStringFieldList;
			patcher.patch('TestMessage', MockMessage);
			expect(MockMessage.prototype.getRepeatedStringFieldList).toEqual(orig);
		});

		it('should not proxy the setter of a repeated scalar field', () => {
			const MockMessage = mockMessageClass();
			const orig = MockMessage.prototype.setRepeatedStringFieldList;
			patcher.patch('TestMessage', MockMessage);
			expect(MockMessage.prototype.setRepeatedStringFieldList).toEqual(orig);
		});

		it('should not proxy the getter of a repeated wrapper type field', () => {
			const MockMessage = mockMessageClass();
			const orig = MockMessage.prototype.getRepeatedWrapperStringFieldList;
			patcher.patch('TestMessage', MockMessage);
			expect(MockMessage.prototype.getRepeatedWrapperStringFieldList).toEqual(orig);
		});

		it('should not proxy the setter of a repeated wrapper type field', () => {
			const MockMessage = mockMessageClass();
			const orig = MockMessage.prototype.setRepeatedWrapperStringFieldList;
			patcher.patch('TestMessage', MockMessage);
			expect(MockMessage.prototype.setRepeatedWrapperStringFieldList).toEqual(orig);
		});

		it('should proxy the `toObject()` instance method', () => {
			const MockMessage = mockMessageClass();
			const orig        = MockMessage.prototype.toObject;
			patcher.patch('TestMessage', MockMessage);
			expect(MockMessage.prototype.toObject).not.toEqual(orig);
		});

		it('should proxy the `toObject()` static function', () => {
			const MockMessage = mockMessageClass();
			const orig        = MockMessage.toObject;
			patcher.patch('TestMessage', MockMessage);
			expect(MockMessage.toObject).not.toEqual(orig);
		});

		it('should patch nested message classes', () => {
			const MockMessage             = mockMessageClass();
			const { NestedMessage }       = MockMessage;
			const { NestedNestedMessage } = NestedMessage;

			const nestedOrig = {
				getStringField        : NestedMessage.prototype.getStringField,
				setStringField        : NestedMessage.prototype.setStringField,
				getWrapperStringField : NestedMessage.prototype.getWrapperStringField,
				setWrapperStringField : NestedMessage.prototype.setWrapperStringField,
				toObject              : NestedMessage.prototype.toObject,
			};
			const nestedOrigStaticToObject = NestedMessage.toObject;
			const nestedNestedOrig = {
				getStringField        : NestedNestedMessage.prototype.getStringField,
				setStringField        : NestedNestedMessage.prototype.setStringField,
				getWrapperStringField : NestedNestedMessage.prototype.getWrapperStringField,
				setWrapperStringField : NestedNestedMessage.prototype.setWrapperStringField,
				toObject              : NestedNestedMessage.prototype.toObject,
			};
			const nestedNestedOrigStaticToObject = NestedNestedMessage.toObject;

			patcher.patch('TestMessage', MockMessage);

			expect(NestedMessage.prototype.getStringField).toEqual(nestedOrig.getStringField);
			expect(NestedMessage.prototype.setStringField).toEqual(nestedOrig.setStringField);
			expect(NestedMessage.prototype.getWrapperStringField).not.toEqual(nestedOrig.getWrapperStringField);
			expect(NestedMessage.prototype.setWrapperStringField).not.toEqual(nestedOrig.setWrapperStringField);
			expect(NestedMessage.prototype.toObject).not.toEqual(nestedOrig.toObject);
			expect(NestedMessage.toObject).not.toEqual(nestedOrigStaticToObject);

			expect(NestedNestedMessage.prototype.getStringField).toEqual(nestedNestedOrig.getStringField);
			expect(NestedNestedMessage.prototype.setStringField).toEqual(nestedNestedOrig.setStringField);
			expect(NestedNestedMessage.prototype.getWrapperStringField).not.toEqual(nestedNestedOrig.getWrapperStringField);
			expect(NestedNestedMessage.prototype.setWrapperStringField).not.toEqual(nestedNestedOrig.setWrapperStringField);
			expect(NestedNestedMessage.prototype.toObject).not.toEqual(nestedNestedOrig.toObject);
			expect(NestedNestedMessage.toObject).not.toEqual(nestedNestedOrigStaticToObject);
		});
	});

	describe('field getters', () => {
		describe('scalar types', () => {
			SCALAR_FIELDS.forEach(({ type, defaultVal, sampleVal, getter, setter }) => {
				it(`should get the default value of a ${type} field when no value is set`, () => {
					const message = new TestMessage();
					expect(message[getter]()).toEqual(defaultVal);
				});
				
				it(`should get the value of a ${type} field`, () => {
					const message = new TestMessage();
					message[setter](sampleVal);
					expect(message[getter]()).toEqual(sampleVal);
				});
			});
		});

		describe('optional wrapper types', () => {
			OPTIONAL_WRAPPER_FIELDS.forEach(({ type, sampleVal, scalarDefault, getter, setter }) => {
				it(`should get \`undefined\` from a ${type} wrapper field when no value is set`, () => {
					const message = new TestMessage();
					expect(message[getter]()).toEqual(undefined);
				})

				it(`should get the scalar value of a ${type} wrapper field`, () => {
					const message = new TestMessage();
					message[setter](sampleVal);
					expect(message[getter]()).toEqual(sampleVal);
				});

				it(`should get the scalar value of a ${type} field if it is set to the scalar default value`, () => {
					const message = new TestMessage();
					message[setter](scalarDefault);
					expect(message[getter]()).toEqual(scalarDefault);
				});
			});

			it('should always return a Base64 string from the `get..._asB64()` method of a BytesValue field', () => {
				const message = new TestMessage();
				const value   = new Uint8Array([ 1, 2, 4, 8, 16, 32 ]);
				message.setWrapperBytesField(value);
				// sanity check: the generic getter should always return the value in the format it was set
				expect(message.getWrapperBytesField()).toEqual(value);

				expect(message.getWrapperBytesField_asB64()).toEqual('AQIECBAg');
			});

			it('should always return a Uint8Array from the `get..._asU8()` method of a BytesValue field', () => {
				const message = new TestMessage();
				const value   = 'AQIECBAg';
				message.setWrapperBytesField(value);
				// sanity check: the generic getter should always return the value in the format it was set
				expect(message.getWrapperBytesField()).toEqual(value);

				expect(message.getWrapperBytesField_asU8()).toEqual(new Uint8Array([ 1, 2, 4, 8, 16, 32 ]));
			});
		});

		describe('nested message types', () => {
			it('should get `undefined` when no value is set', () => {
				const message = new TestMessage();
				expect(message.getNestedMessageField()).toEqual(undefined);
			});

			it('should get the message instance when a value is set', () => {
				const message = new TestMessage();
				const nestedMessage = new TestMessage.NestedMessage();
				message.setNestedMessageField(nestedMessage);
				expect(message.getNestedMessageField()).toEqual(nestedMessage);
			});

			it('should get the default value of a scalar field when no value is set', () => {
				const message = new TestMessage();
				const nestedMessage = new TestMessage.NestedMessage();
				message.setNestedMessageField(nestedMessage);
				expect(message.getNestedMessageField().getStringField()).toEqual('');
			});

			it('should get the value of a scalar field when a value is set', () => {
				const message = new TestMessage();
				const nestedMessage = new TestMessage.NestedMessage();
				nestedMessage.setStringField('foo');
				message.setNestedMessageField(nestedMessage);
				expect(message.getNestedMessageField().getStringField()).toEqual('foo');
			});

			it('should get `undefined` from a wrapper type field when no value is set', () => {
				const message = new TestMessage();
				const nestedMessage = new TestMessage.NestedMessage();
				message.setNestedMessageField(nestedMessage);
				expect(message.getNestedMessageField().getWrapperStringField()).toEqual(undefined);
			});

			it('should get the scalar value from a wrapper type field when a value is set', () => {
				const message = new TestMessage();
				const nestedMessage = new TestMessage.NestedMessage();
				nestedMessage.setWrapperStringField('bar');
				message.setNestedMessageField(nestedMessage);
				expect(message.getNestedMessageField().getWrapperStringField()).toEqual('bar');
			});

			it('should get the scalar value from a wrapper type field when it is set to the default scalar value', () => {
				const message = new TestMessage();
				const nestedMessage = new TestMessage.NestedMessage();
				nestedMessage.setWrapperStringField('');
				message.setNestedMessageField(nestedMessage);
				expect(message.getNestedMessageField().getWrapperStringField()).toEqual('');
			});
		});

		describe('enum types', () => {
			it('should get the default value when no value set', () => {
				const message = new TestMessage();
				expect(message.getEnumField()).toEqual(0);	
			});

			it('should get the value', () => {
				const message = new TestMessage();
				message.setEnumField(TestMessage.CustomEnum.FOO);
				expect(message.getEnumField()).toEqual(TestMessage.CustomEnum.FOO);
			});
		});

		describe('repeated fields', () => {
			it('should return an empty array when a repeated scalar field has no values set', () => {
				const message = new TestMessage();
				const result = message.getRepeatedStringFieldList();
				expect(result).toEqual([]);
				expect(result).toHaveLength(0);
			});

			it('should return an array of values for a repeated scalar field', () => {
				const message = new TestMessage();
				message.addRepeatedStringField('one');
				message.addRepeatedStringField('two');
				message.addRepeatedStringField('three');
				const result = message.getRepeatedStringFieldList();
				expect(result).toHaveLength(3);
				expect(result).toEqual([ 'one', 'two', 'three' ]);
			});

			it('should return an empty array when a repeated wrapper type field has no values set', () => {
				const message = new TestMessage();
				const result = message.getRepeatedWrapperStringFieldList();
				expect(result).toEqual([]);
				expect(result).toHaveLength(0);
			});

			it('should return an array of messages for a repeated wrapper type field', () => {
				const message = new TestMessage();
				[ 'one', 'two', 'three' ].forEach(val => {
					const wrapper = new WrapperTypes.StringValue();
					wrapper.setValue(val);
					message.addRepeatedWrapperStringField(wrapper);
				});

				const result = message.getRepeatedWrapperStringFieldList();
				expect(result).toHaveLength(3);
				expect(result).toEqual([
					expect.any(WrapperTypes.StringValue),
					expect.any(WrapperTypes.StringValue),
					expect.any(WrapperTypes.StringValue)
				]);
				expect(result[0].getValue()).toEqual('one');
				expect(result[1].getValue()).toEqual('two');
				expect(result[2].getValue()).toEqual('three');
			});
		});
	});

	describe('field setters', () => {
		describe('scalar types', () => {
			SCALAR_FIELDS.forEach(({ type, defaultVal, sampleVal, getter, setter }) => {
				it(`should be able to set a value to a ${type} field`, () => {
					const message = new TestMessage();
					expect(message[getter]()).toEqual(defaultVal);
					message[setter](sampleVal);
					expect(message[getter]()).toEqual(sampleVal);
				});
			});
		});

		describe('optional wrapper types', () => {
			OPTIONAL_WRAPPER_FIELDS.forEach(({ type, scalarDefault, sampleVal, getter, setter }) => {
				it(`should be able to set a scalar value to a ${type} wrapper field`, () => {
					const message = new TestMessage();
					expect(message[getter]()).toEqual(undefined);
					message[setter](sampleVal);
					expect(message[getter]()).toEqual(sampleVal);
				});

				it(`should be able to set the scalar default value to a ${type} wrapper field`, () => {
					const message = new TestMessage();
					expect(message[getter]()).toEqual(undefined);
					message[setter](scalarDefault);
					expect(message[getter]()).toEqual(scalarDefault);
				});

				it(`should set the value to \`undefined\` when a ${type} wrapper field is set to \`undefined\``, () => {
					const message = new TestMessage();
					expect(message[getter]()).toEqual(undefined);
					message[setter](undefined);
					expect(message[getter]()).toEqual(undefined);
				});

				it(`should set the value to \`undefined\` when a ${type} wrapper field is set to \`null\``, () => {
					const message = new TestMessage();
					expect(message[getter]()).toEqual(undefined);
					message[setter](null);
					expect(message[getter]()).toEqual(undefined);
				});
			});
		});

		describe('nested message types', () => {
			it('should be able to set a message instance to the field', () => {
				const message = new TestMessage();
				const nestedMessage = new TestMessage.NestedMessage();
				message.setNestedMessageField(nestedMessage);
				expect(message.getNestedMessageField()).toEqual(nestedMessage);
			});

			it('should clear the field when set to `undefined`', async () => {
				const message = new TestMessage();
				message.setNestedMessageField(new TestMessage.NestedMessage());
				expect(message.getNestedMessageField()).toBeTruthy();
				message.setNestedMessageField(undefined);
				expect(message.getNestedMessageField()).toEqual(undefined);
			});

			it('should be able to set a value to a scalar field of the nested message', () => {
				const message = new TestMessage();
				const nestedMessage = new TestMessage.NestedMessage();
				nestedMessage.setStringField('foo');
				message.setNestedMessageField(nestedMessage);
				expect(message.getNestedMessageField().getStringField()).toEqual('foo');
			});

			it('should be able to set a scalar value to a wrapper type field of the nested message', () => {
				const message = new TestMessage();
				const nestedMessage = new TestMessage.NestedMessage();
				nestedMessage.setWrapperStringField('bar');
				message.setNestedMessageField(nestedMessage);
				expect(message.getNestedMessageField().getWrapperStringField()).toEqual('bar');
			});
		});

		describe('enum types', () => {
			it('should be able to set the field value', () => {
				const message = new TestMessage();
				message.setEnumField(TestMessage.CustomEnum.BAR);
				expect(message.getEnumField()).toEqual(TestMessage.CustomEnum.BAR);
			});
		});

		describe('repeated fields', () => {
			it('should be able to set the value of a repeated scalar field', () => {
				const message = new TestMessage();
				message.setRepeatedStringFieldList([ 'one', 'three' ]);
				message.addRepeatedStringField('two', 1);
				expect(message.getRepeatedStringFieldList()).toEqual([ 'one', 'two', 'three' ]);
			});

			it('should be able to set the value of a repeated wrapper type field', () => {
				const wrappers = [ 'one', 'two', 'three' ].map(val => {
					const wrapper = new WrapperTypes.StringValue();
					wrapper.setValue(val);
					return wrapper;
				});
				const message = new TestMessage();
				message.setRepeatedWrapperStringFieldList([ wrappers[0], wrappers[2] ]);
				message.addRepeatedWrapperStringField(wrappers[1], 1);
				expect(message.getRepeatedWrapperStringFieldList()).toEqual(wrappers);
			});
		});
	});

	describe('has<field>()', () => {
		describe('optional wrapper types', () => {
			OPTIONAL_WRAPPER_FIELDS.forEach(({ type, scalarDefault, sampleVal, setter, hasField, clearField }) => {
				it(`should return false if a ${type} wrapper field is not set`, () => {
					const message = new TestMessage();
					expect(message[hasField]()).toEqual(false);
				});

				it(`should return true if a ${type} wrapper field is set to a value`, () => {
					const message = new TestMessage();
					message[setter](sampleVal);
					expect(message[hasField]()).toEqual(true);
				});

				it(`should return true if a ${type} wrapper field is set to the scalar default value`, () => {
					const message = new TestMessage();
					message[setter](scalarDefault);
					expect(message[hasField]()).toEqual(true);
				});

				it(`should return false if a ${type} wrapper field is set to \`undefined\``, () => {
					const message = new TestMessage();
					message[setter](undefined);
					expect(message[hasField]()).toEqual(false);
				});

				it(`should return false if a ${type} wrapper field is set to \`null\``, () => {
					const message = new TestMessage();
					message[setter](null);
					expect(message[hasField]()).toEqual(false);
				});

				it(`should return false if a ${type} wrapper field is cleared`, () => {
					const message = new TestMessage();
					message[setter](sampleVal);
					expect(message[hasField]()).toEqual(true);
					message[clearField]();
					expect(message[hasField]()).toEqual(false);
				});
			});
		});

		describe('nested message types', () => {
			it('should return false if no message is set', () => {
				const message = new TestMessage();
				expect(message.hasNestedMessageField()).toEqual(false);
			});

			it('should return true if a message is set', () => {
				const message = new TestMessage();
				message.setNestedMessageField(new TestMessage.NestedMessage());
				expect(message.hasNestedMessageField()).toEqual(true);
			});

			it('should return false if a wrapper type field of the message is not set', () => {
				const message = new TestMessage();
				message.setNestedMessageField(new TestMessage.NestedMessage());
				expect(message.getNestedMessageField().hasWrapperStringField()).toEqual(false);
			});

			it('should return true if a wrapper type field of the message is set', () => {
				const message = new TestMessage();
				const nestedMessage = new TestMessage.NestedMessage();
				nestedMessage.setWrapperStringField('bar');
				message.setNestedMessageField(nestedMessage);
				expect(message.getNestedMessageField().hasWrapperStringField()).toEqual(true);
			});
		});
	});

	describe('clear<field>()', () => {
		describe('optional wrapper types', () => {
			OPTIONAL_WRAPPER_FIELDS.forEach(({ type, scalarDefault, sampleVal, getter, setter, clearField }) => {
				it(`should clear a ${type} wrapper field set to the scalar default value`, () => {
					const message = new TestMessage();
					message[setter](scalarDefault);
					expect(message[getter]()).toEqual(scalarDefault);
					message[clearField]();
					expect(message[getter]()).toEqual(undefined);
				});

				it(`should clear a ${type} wrapper field set to a non-default scalar value`, () => {
					const message = new TestMessage();
					message[setter](scalarDefault);
					expect(message[getter]()).toEqual(scalarDefault);
					message[clearField]();
					expect(message[getter]()).toEqual(undefined);
				});
			});
		});

		describe('nested message types', () => {
			it('should clear the message value', () => {
				const message = new TestMessage();
				message.setNestedMessageField(new TestMessage.NestedMessage());
				expect(message.getNestedMessageField()).toBeTruthy();
				message.clearNestedMessageField();
				expect(message.getNestedMessageField()).toEqual(undefined);
			});
		});
	});

	describe('#toObject()', () => {
		beforeAll(() => {
			jest.spyOn(TestMessage, 'toObject');
		});

		afterAll(() => {
			TestMessage.toObject.mockRestore();
		});

		it('should just call the static `toObject()` function', () => {
			const message = new TestMessage();

			message.toObject();
			expect(TestMessage.toObject).toHaveBeenCalledTimes(1);
			expect(TestMessage.toObject).toHaveBeenCalledWith(undefined, message);

			TestMessage.toObject.mockClear();

			message.toObject(true);
			expect(TestMessage.toObject).toHaveBeenCalledTimes(1);
			expect(TestMessage.toObject).toHaveBeenCalledWith(true, message);

			TestMessage.toObject.mockClear();

			message.toObject(false);
			expect(TestMessage.toObject).toHaveBeenCalledTimes(1);
			expect(TestMessage.toObject).toHaveBeenCalledWith(false, message);
		});
	});

	describe('static toObject()', () => {
		describe('scalar type fields', () => {
			SCALAR_FIELDS.forEach(({ type, defaultVal, sampleVal, setter, jsonName }) => {
				it(`should return an object containing the default scalar value when a ${type} field is not set`, () => {
					const message = new TestMessage();
					expect(TestMessage.toObject(undefined, message)).toEqual(expect.objectContaining({
						[jsonName] : defaultVal,
					}));
				});

				it(`should return an object containing the value when a ${type} field is set`, () => {
					const message = new TestMessage();
					message[setter](sampleVal);
					expect(TestMessage.toObject(undefined, message)).toEqual(expect.objectContaining({
						[jsonName] : sampleVal,
					}));
				});
			});
		});

		describe('reserved keyword field names', () => {
			it('should prefix fields using reserved keyword names with `pb_`', () => {
				const message = new TestMessage();

				const result = TestMessage.toObject(undefined, message);

				const keys = Object.keys(result);
				expect(keys).not.toEqual(expect.arrayContaining([ 'abstract', 'public', 'synchronized' ]));
				expect(keys).toEqual(expect.arrayContaining([ 'pb_abstract', 'pb_public', 'pb_synchronized' ]));
				expect(result).toEqual(expect.objectContaining({
					pb_abstract     : false,
					pb_public       : '',
					pb_synchronized : 0,
				}));
			})
		});

		describe('optional wrapper fields', () => {
			OPTIONAL_WRAPPER_FIELDS.forEach(({ type, scalarDefault, sampleVal, setter, getter, jsonName }) => {
				it(`should return an object containing undefined when a ${type} field is not set`, () => {
					const message = new TestMessage();
					expect(TestMessage.toObject(undefined, message)).toEqual(expect.objectContaining({
						[jsonName] : undefined,
					}));
				});

				it(`should return an object containing the value when a ${type} field is set to the default scalar value`, () => {
					const message = new TestMessage();
					message[setter](scalarDefault);
					expect(TestMessage.toObject(undefined, message)).toEqual(expect.objectContaining({
						[jsonName] : scalarDefault,
					}));
				});

				it(`should return an object containing the value when a ${type} field is set to a value`, () => {
					const message = new TestMessage();
					message[setter](sampleVal);
					expect(message[getter]()).toEqual(sampleVal);
					expect(TestMessage.toObject(undefined, message)).toEqual(expect.objectContaining({
						[jsonName] : sampleVal,
					}));
				});
			});

			it('should always convert a BytesValue wrapper field value to a Base64 string', () => {
				const message = new TestMessage();
				const data = new Uint8Array([ 1, 2, 4, 8, 16, 32 ]);
				message.setWrapperBytesField(data);

				// sanity check: the data should remain stored as a Uint8Array
				const setValue = message.getWrapperBytesField();
				expect(setValue).not.toEqual(expect.any(String));
				expect(setValue).toEqual(expect.any(Uint8Array));
				expect(setValue).toEqual(data);

				expect(TestMessage.toObject(undefined, message)).toEqual(expect.objectContaining({
					wrapperBytesField : 'AQIECBAg',
				}));
			});
		});

		describe('enum types', () => {
			it('should return an object containing the default value when no value is set', () => {
				const message = new TestMessage();
				expect(TestMessage.toObject(undefined, message)).toEqual(expect.objectContaining({
					enumField : 0,
				}));
			});

			it('should return an object containing the value set to the field', () => {
				const message = new TestMessage();
				message.setEnumField(TestMessage.CustomEnum.FOO);
				expect(TestMessage.toObject(undefined, message)).toEqual(expect.objectContaining({
					enumField : TestMessage.CustomEnum.FOO,
				}));
			});
		});

		describe('nested messages', () => {
			it('should handle complex nested message types with scalar & optional wrapper type fields', () => {
				const message = new TestMessage();
				message.setStringField('string1');
				message.setWrapperStringField('string2');

				const nestedMessage = new TestMessage.NestedMessage();
				nestedMessage.setStringField('string3');
				nestedMessage.setWrapperStringField('string4');

				const nestedNestedMessage = new TestMessage.NestedMessage.NestedNestedMessage();
				nestedNestedMessage.setStringField('string5');
				nestedNestedMessage.setWrapperStringField('string6');
				nestedMessage.setNestedNestedMessageField(nestedNestedMessage);

				const otherMessage = new TestMessage();
				otherMessage.setBoolField(true);
				otherMessage.setWrapperBoolField(false);
				nestedMessage.setTestMessageField(otherMessage);

				message.setNestedMessageField(nestedMessage);

				expect(TestMessage.toObject(undefined, message)).toEqual(expect.objectContaining({
					boolField          : false,
					stringField        : 'string1',
					wrapperBoolField   : undefined,
					wrapperStringField : 'string2',
					nestedMessageField : {
						stringField              : 'string3',
						wrapperStringField       : 'string4',
						nestedNestedMessageField : {
							stringField        : 'string5',
							wrapperStringField : 'string6',
						},
						testMessageField : expect.objectContaining({
							boolField          : true,
							stringField        : '',
							wrapperBoolField   : false,
							wrapperStringField : undefined,
						}),
					},
				}));
			});
		});

		describe('repeated fields', () => {
			it('should return an object with an array of scalar values for repeated scalar fields', () => {
				const message = new TestMessage();
				message.addRepeatedStringField('one');
				message.addRepeatedStringField('two');
				message.addRepeatedStringField('three');

				expect(TestMessage.toObject(undefined, message)).toEqual(expect.objectContaining({
					repeatedStringField : [ 'one', 'two', 'three' ],
				}));
			});

			it('should return an object with an array of objects for repeated wrapper type fields', () => {
				const message = new TestMessage();
				[ 'one', 'two', 'three' ].forEach(val => {
					const wrapper = new WrapperTypes.StringValue();
					wrapper.setValue(val);
					message.addRepeatedWrapperStringField(wrapper);
				});

				expect(TestMessage.toObject(undefined, message)).toEqual(expect.objectContaining({
					repeatedWrapperStringField : [
						{ value : 'one' },
						{ value : 'two' },
						{ value : 'three' },
					],
				}));
			});
		});
	});
});
