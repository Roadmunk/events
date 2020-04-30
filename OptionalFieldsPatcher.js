const { FileDescriptorSet, FieldDescriptorProto } = require('google-protobuf/google/protobuf/descriptor_pb');
const WrapperTypes                                = require('google-protobuf/google/protobuf/wrappers_pb');

/**
 * Array of all built-in wrapper type names we want to consider as optional fields
 * 
 * NOTE: We must hard-code the specific wrapper types we want to become optional, as requiring other
 * protobuf classes from the `google-protobuf` package will register additional non-wrapper-type
 * message classes to the same namespace (i.e. `WrapperTypes` contains more than just the wrapper types)
 * @see https://github.com/protocolbuffers/protobuf/blob/master/src/google/protobuf/wrappers.proto for all wrapper types
 * 
 * @type{String[]}
 */
const OPTIONAL_WRAPPER_TYPE_NAMES = Object.freeze([
	'BoolValue',
	'BytesValue',
	'DoubleValue',
	'FloatValue',
	'Int32Value',
	'Int64Value',
	'StringValue',
	'UInt32Value',
	'UInt64Value'
]);

/**
 * Map of the fully qualified proto name to the generated JS type instance, for all wrapper types that are to be
 * considered optional fields on a message
 * @type{Map<String, Function>}
 */
const OPTIONAL_FIELD_TYPE_MAP = (() => {
	const map = new Map();
	for (const typeName of OPTIONAL_WRAPPER_TYPE_NAMES) {
		map.set(`.google.protobuf.${typeName}`, WrapperTypes[typeName]);
	}
	return map;
})();

/**
 * Sorted list of javascript keywords which cannot be used as names in object output.
 * If they appear as a name, it should be prefixed with 'pb_'.
 * @see https://developers.google.com/protocol-buffers/docs/reference/javascript-generated#message
 * @see https://github.com/protocolbuffers/protobuf/blob/master/src/google/protobuf/compiler/js/js_generator.cc
 */
const RESERVED_KEYWORDS = new Set([
	'abstract',   'boolean',      'break',      'byte',    'case',
    'catch',      'char',         'class',      'const',   'continue',
    'debugger',   'default',      'delete',     'do',      'double',
    'else',       'enum',         'export',     'extends', 'false',
    'final',      'finally',      'float',      'for',     'function',
    'goto',       'if',           'implements', 'import',  'in',
    'instanceof', 'int',          'interface',  'long',    'native',
    'new',        'null',         'package',    'private', 'protected',
    'public',     'return',       'short',      'static',  'super',
    'switch',     'synchronized', 'this',       'throw',   'throws',
    'transient',  'try',          'typeof',     'var',     'void',
    'volatile',   'while',        'with',
]);


/**
 * Object representation of a `FieldDescriptorProto`
 * @see https://github.com/protocolbuffers/protobuf/blob/master/src/google/protobuf/descriptor.proto#L138
 * @typedef {Object} FieldDescriptorProto
 * @property {String} name
 * @property {Number} number
 * @property {Number} label
 * @property {Number} type
 * @property {String} [typeName]
 * @property {String} [extendee]
 * @property {String} [defaultValue]
 * @property {Number} [oneOfIndex]
 * @property {String} jsonName
 * @property {Number} [options]
 */

/**
 * Normalized representation of a field descriptor
 * @typedef {Object} NormalizedFieldDescriptor
 * @property {String}   name          The JS/JSON name of the field
 * @property {String}   upperCaseName The JS/JSON name of the field, with the first letter capitalized to easily
 *                                    use as a suffix when constructing accessor method names
 * @property {Boolean}  isMessage     Whether the field is a message type (true) or not (false)
 * @property {Boolean}  isOptional    Whether the field is one of the optional types (true) or not (false)
 * @property {Function} [type]        The optional type class of the field (only set when `isOptional === true`)
 */

/**
 * Simplified object representation describing a message
 * @typedef {Object} MessageDescriptor
 * @property {FieldDescriptorProto[]}         fields      Array of descriptors for all fields of this message
 * @property {Map<String, MessageDescriptor>} nestedTypes Any nested message types, indexed by the type name
 */


/**
 * Describes a class designed to be able to patch a proto3 message JS class implementation to simplify interacting
 * with the well-known wrapper types, such that they behave more like their scalar equivalent types. Since these types
 * also have a default value of `undefined` in JS, this allows fields of these types to be considered "optional", 
 * such that the message consumer can distinguish between the field being unset or set to the scalar default value.
 * To do so it parses the `FileDescriptorSet` message output from the `protoc` build.
 */
class OptionalFieldsPatcher {
	/**
	 * Creates a new OptionalFieldsPatcher instance.
	 * @param {String|Uint8Array} binaryFileDescriptorSet Binary representation of the `FileDescriptorSet` of the
	 *                                                    messages to be patched.
	 */
	constructor (binaryFileDescriptorSet) {
		this._messageFieldDescriptors = parseFileDescriptorSet(binaryFileDescriptorSet);
	}

	/**
	 * Patches a given message class to make wrapper type field accessors behave like their scalar equivalents.
	 * Any nested message classes are also patched.
	 * @param {String}   messageName  The name of the message class (as defined in the `.proto` file)
	 * @param {Function} messageClass The JS class describing the message
	 */
	patch(messageName, messageClass) {
		if (!messageName || !messageClass) {
			throw new Error('message name & class are required');
		}

		const messageDescriptor = this._messageFieldDescriptors.get(messageName);
		const fields            = (messageDescriptor && messageDescriptor.fields) || [];
		const nestedTypes       = (messageDescriptor && messageDescriptor.nestedTypes) || [];

		this._patchRecursive(messageClass, fields, nestedTypes);
		return messageClass;
	}

	/**
	 * @private
	 * Recursively patches the provided message class and any nested message classes
	 * @param {Function}                       messageClass The class to be patched
	 * @param {FieldDescriptorProto[]}         fields       Descriptors of all fields for the message type
	 * @param {Map<String, MessageDescriptor>} nestedTypes  Descriptors of any nested message types
	 */
	_patchRecursive(messageClass, fields, nestedTypes) {
		const fieldDescriptors = normalizeFieldDescriptors(fields);
		const optionalFields   = fieldDescriptors.filter(({ isOptional }) => !!isOptional);

		for (const field of optionalFields) {
			// If this is a BytesValue field, add the `get..._asB64()` and `get..._asU8()` convenience methods
			// (NOTE: need to do this _before_ proxying the generic `get...()` method)
			if (field.type === WrapperTypes.BytesValue) {
				const origGetter = messageClass.prototype[`get${field.upperCaseName}`];
				messageClass.prototype[`get${field.upperCaseName}_asB64`] = function() {
					const msg = origGetter.call(this);
					if (!msg) {
						return msg;
					}
					return msg.getValue_asB64();
				};
				messageClass.prototype[`get${field.upperCaseName}_asU8`] = function() {
					const msg = origGetter.call(this);
					if (!msg) {
						return msg;
					}
					return msg.getValue_asU8();
				};
			}

			// Proxy the getter & setter accessors
			proxyFunction(messageClass.prototype, `get${field.upperCaseName}`, origGetter =>
				function() {
					const msg = origGetter.call(this);
					if (!msg) {
						return msg;
					}
					return msg.getValue();
				}
			);
			proxyFunction(messageClass.prototype, `set${field.upperCaseName}`, origSetter =>
				function(newValue) {
					// clear value if setting null/undefined
					if (newValue === null || newValue === undefined) {
						origSetter.call(this, undefined);
						return;
					}

					const wrapper = new field.type();
					wrapper.setValue(newValue);
					origSetter.call(this, wrapper);
				}
			);
		}
	
		proxyFunction(messageClass.prototype, 'toObject', origToObject =>
			function(opt_includeInstance) {
				return messageClass.toObject(opt_includeInstance, this);
			}
		);
	
		// NOTE: the changes made to wrapper type field accessors above break the default `toObject()`
		// functionality for those fields, so we need to re-implement `toObject()` ourselves
		proxyFunction(messageClass, 'toObject', () =>
			function(includeInstance, msg) {
				const obj = {};
				fieldDescriptors.forEach(({ name, upperCaseName, type, isRepeated, isMessage, isOptional }) => {
					// Prefix the key with `pb_` if it is a JS reserved keyword
					const key = RESERVED_KEYWORDS.has(name) ? `pb_${name}` : name;

					if (isRepeated) {
						let val = msg[`get${upperCaseName}List`]();
						// If this is a list of messages, call `toObject()` on each message instance as well
						if (isMessage) {
							val = val.map(msg => msg.toObject(includeInstance));
						}
						obj[key] = val;
					}
					// Recursively call `toObject()` on any non-optional wrapper type fields
					else if (isMessage && !isOptional) {
						const val = msg[`get${upperCaseName}`]();
						obj[key] = val && val.toObject(includeInstance);
					}
					else if (type === WrapperTypes.BytesValue) {
						obj[key] = msg[`get${upperCaseName}_asB64`]();
					}
					// Otherwise just get the value
					else {
						obj[key] = msg[`get${upperCaseName}`]();
					}
				});
				if (includeInstance) {
					obj.$jspbMessageInstance = msg;
				}
				return obj;
			}
		);

		// Recurse through any nested message types & patch those classes too
		nestedTypes.forEach(({ fields, nestedTypes }, typeName) => {
			if (messageClass.hasOwnProperty(typeName)) {
				this._patchRecursive(messageClass[typeName], fields, nestedTypes);
			}
		});
	}
}
module.exports = OptionalFieldsPatcher;

/**
 * @private
 * Parses a binary `FileDescriptorSet` message into an easier to use JS Map indexed by message name
 * @param {String} binaryFileDescriptorSet 
 * @returns {Map<String, MessageDescriptor>}
 */
function parseFileDescriptorSet(binaryFileDescriptorSet) {
	const message = FileDescriptorSet.deserializeBinary(binaryFileDescriptorSet);
	const result  = new Map();

	const fileList = message.getFileList();
	for (const fileDescriptor of fileList) {
		// Only parse behaviour of messages in the `roadmunk` package
		if (fileDescriptor.getPackage() !== 'roadmunk') {
			break;
		}

		const messageTypeList = fileDescriptor.getMessageTypeList();
		for (const messageType of messageTypeList) {
			result.set(messageType.getName(), parseMessageType(messageType));
		}
	}
	return result;
}

/**
 * @private
 * Helper to recursively process a `DescriptorProto` message type instance into a simplified
 * `MessageDescriptor`, containing only the field & nested type information about the message.
 * @param {DescriptorProto} messageType The message describing the Message type
 * @returns {MessageDescriptor}
 */
function parseMessageType(messageType) {
	const result = {
		fields : [],
		nestedTypes : new Map(),
	};

	const fieldList = messageType.getFieldList();
	for (const field of fieldList) {
		result.fields.push(field.toObject());
	}

	const nestedTypeList = messageType.getNestedTypeList();
	for(const nestedType of nestedTypeList) {
		result.nestedTypes.set(nestedType.getName(), parseMessageType(nestedType));
	}

	return result;
}

/**
 * @private
 * Normalizes `FieldDescriptorProto` messages into a simplified `NormalizedFieldDescriptor` containing
 * only the pertinent information required to patch the JS message class field accessors.
 * @param {FieldDescriptorProto[]} fieldDescriptors 
 * @returns {NormalizedFieldDescriptor[]}
 */
function normalizeFieldDescriptors(fieldDescriptors) {
	if (!fieldDescriptors) {
		return [];
	}

	return fieldDescriptors.map(({ type, label, typeName, jsonName }) => {
		const optionalType = typeName && OPTIONAL_FIELD_TYPE_MAP.get(typeName);
		const isRepeated   = label === FieldDescriptorProto.Label.LABEL_REPEATED;
		const isMessage    = type === FieldDescriptorProto.Type.TYPE_MESSAGE;
		const isOptional   = isMessage && !isRepeated && !!optionalType;
		return {
			name          : jsonName,
			upperCaseName : `${jsonName.charAt(0).toUpperCase()}${jsonName.slice(1)}`,
			type          : optionalType,
			isRepeated,
			isMessage,
			isOptional,
		}
	});
}

/**
 * @private
 * Helper to simplify proxying an existing function on `obj`.
 * @param {Object} obj    The object with the original function to proxy
 * @param {String} fnName The name of the original function
 * @param {Function(Function) => Function} callback A callback which takes the original function as its parameter
 *                                                  and returns the new function implementation
 */
function proxyFunction(obj, fnName, callback) {
	if (obj.hasOwnProperty(fnName) && typeof obj[fnName] === 'function') {
		obj[fnName] = callback(obj[fnName]);
	}
}
