/**
 * @fileoverview
 * @enhanceable
 * @suppress {messageConventions} JS Compiler reports an error if a variable or
 *     field starts with 'MSG_' and isn't a translatable message.
 * @public
 */
// GENERATED CODE -- DO NOT EDIT!

var jspb = require('google-protobuf');
var goog = jspb;
var global = Function('return this')();

goog.exportSymbol('proto.roadmunk.AccountUpdatedMessage', null, global);

/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.roadmunk.AccountUpdatedMessage = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.roadmunk.AccountUpdatedMessage, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  proto.roadmunk.AccountUpdatedMessage.displayName = 'proto.roadmunk.AccountUpdatedMessage';
}


if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto suitable for use in Soy templates.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     com.google.apps.jspb.JsClassTemplate.JS_RESERVED_WORDS.
 * @param {boolean=} opt_includeInstance Whether to include the JSPB instance
 *     for transitional soy proto support: http://goto/soy-param-migration
 * @return {!Object}
 */
proto.roadmunk.AccountUpdatedMessage.prototype.toObject = function(opt_includeInstance) {
  return proto.roadmunk.AccountUpdatedMessage.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Whether to include the JSPB
 *     instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.roadmunk.AccountUpdatedMessage} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.roadmunk.AccountUpdatedMessage.toObject = function(includeInstance, msg) {
  var f, obj = {
    id: jspb.Message.getFieldWithDefault(msg, 1, ""),
    companyName: jspb.Message.getFieldWithDefault(msg, 2, ""),
    useStrictPasswordStrength: jspb.Message.getFieldWithDefault(msg, 3, false),
    minPasswordLength: jspb.Message.getFieldWithDefault(msg, 4, 0),
    isSingleSignOnOnly: jspb.Message.getFieldWithDefault(msg, 5, false),
    defaultAuthenticationProviderType: jspb.Message.getFieldWithDefault(msg, 6, ""),
    shouldPublishRequireSso: jspb.Message.getFieldWithDefault(msg, 7, false),
    billingEmail: jspb.Message.getFieldWithDefault(msg, 8, ""),
    deployment: jspb.Message.getFieldWithDefault(msg, 9, ""),
    hasGoodStanding: jspb.Message.getFieldWithDefault(msg, 10, false)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.roadmunk.AccountUpdatedMessage}
 */
proto.roadmunk.AccountUpdatedMessage.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.roadmunk.AccountUpdatedMessage;
  return proto.roadmunk.AccountUpdatedMessage.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.roadmunk.AccountUpdatedMessage} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.roadmunk.AccountUpdatedMessage}
 */
proto.roadmunk.AccountUpdatedMessage.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {string} */ (reader.readString());
      msg.setId(value);
      break;
    case 2:
      var value = /** @type {string} */ (reader.readString());
      msg.setCompanyName(value);
      break;
    case 3:
      var value = /** @type {boolean} */ (reader.readBool());
      msg.setUseStrictPasswordStrength(value);
      break;
    case 4:
      var value = /** @type {number} */ (reader.readInt32());
      msg.setMinPasswordLength(value);
      break;
    case 5:
      var value = /** @type {boolean} */ (reader.readBool());
      msg.setIsSingleSignOnOnly(value);
      break;
    case 6:
      var value = /** @type {string} */ (reader.readString());
      msg.setDefaultAuthenticationProviderType(value);
      break;
    case 7:
      var value = /** @type {boolean} */ (reader.readBool());
      msg.setShouldPublishRequireSso(value);
      break;
    case 8:
      var value = /** @type {string} */ (reader.readString());
      msg.setBillingEmail(value);
      break;
    case 9:
      var value = /** @type {string} */ (reader.readString());
      msg.setDeployment(value);
      break;
    case 10:
      var value = /** @type {boolean} */ (reader.readBool());
      msg.setHasGoodStanding(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.roadmunk.AccountUpdatedMessage.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.roadmunk.AccountUpdatedMessage.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.roadmunk.AccountUpdatedMessage} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.roadmunk.AccountUpdatedMessage.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getId();
  if (f.length > 0) {
    writer.writeString(
      1,
      f
    );
  }
  f = message.getCompanyName();
  if (f.length > 0) {
    writer.writeString(
      2,
      f
    );
  }
  f = message.getUseStrictPasswordStrength();
  if (f) {
    writer.writeBool(
      3,
      f
    );
  }
  f = message.getMinPasswordLength();
  if (f !== 0) {
    writer.writeInt32(
      4,
      f
    );
  }
  f = message.getIsSingleSignOnOnly();
  if (f) {
    writer.writeBool(
      5,
      f
    );
  }
  f = message.getDefaultAuthenticationProviderType();
  if (f.length > 0) {
    writer.writeString(
      6,
      f
    );
  }
  f = message.getShouldPublishRequireSso();
  if (f) {
    writer.writeBool(
      7,
      f
    );
  }
  f = message.getBillingEmail();
  if (f.length > 0) {
    writer.writeString(
      8,
      f
    );
  }
  f = message.getDeployment();
  if (f.length > 0) {
    writer.writeString(
      9,
      f
    );
  }
  f = message.getHasGoodStanding();
  if (f) {
    writer.writeBool(
      10,
      f
    );
  }
};


/**
 * optional string id = 1;
 * @return {string}
 */
proto.roadmunk.AccountUpdatedMessage.prototype.getId = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/** @param {string} value */
proto.roadmunk.AccountUpdatedMessage.prototype.setId = function(value) {
  jspb.Message.setField(this, 1, value);
};


/**
 * optional string company_name = 2;
 * @return {string}
 */
proto.roadmunk.AccountUpdatedMessage.prototype.getCompanyName = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 2, ""));
};


/** @param {string} value */
proto.roadmunk.AccountUpdatedMessage.prototype.setCompanyName = function(value) {
  jspb.Message.setField(this, 2, value);
};


/**
 * optional bool use_strict_password_strength = 3;
 * Note that Boolean fields may be set to 0/1 when serialized from a Java server.
 * You should avoid comparisons like {@code val === true/false} in those cases.
 * @return {boolean}
 */
proto.roadmunk.AccountUpdatedMessage.prototype.getUseStrictPasswordStrength = function() {
  return /** @type {boolean} */ (jspb.Message.getFieldWithDefault(this, 3, false));
};


/** @param {boolean} value */
proto.roadmunk.AccountUpdatedMessage.prototype.setUseStrictPasswordStrength = function(value) {
  jspb.Message.setField(this, 3, value);
};


/**
 * optional int32 min_password_length = 4;
 * @return {number}
 */
proto.roadmunk.AccountUpdatedMessage.prototype.getMinPasswordLength = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 4, 0));
};


/** @param {number} value */
proto.roadmunk.AccountUpdatedMessage.prototype.setMinPasswordLength = function(value) {
  jspb.Message.setField(this, 4, value);
};


/**
 * optional bool is_single_sign_on_only = 5;
 * Note that Boolean fields may be set to 0/1 when serialized from a Java server.
 * You should avoid comparisons like {@code val === true/false} in those cases.
 * @return {boolean}
 */
proto.roadmunk.AccountUpdatedMessage.prototype.getIsSingleSignOnOnly = function() {
  return /** @type {boolean} */ (jspb.Message.getFieldWithDefault(this, 5, false));
};


/** @param {boolean} value */
proto.roadmunk.AccountUpdatedMessage.prototype.setIsSingleSignOnOnly = function(value) {
  jspb.Message.setField(this, 5, value);
};


/**
 * optional string default_authentication_provider_type = 6;
 * @return {string}
 */
proto.roadmunk.AccountUpdatedMessage.prototype.getDefaultAuthenticationProviderType = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 6, ""));
};


/** @param {string} value */
proto.roadmunk.AccountUpdatedMessage.prototype.setDefaultAuthenticationProviderType = function(value) {
  jspb.Message.setField(this, 6, value);
};


/**
 * optional bool should_publish_require_sso = 7;
 * Note that Boolean fields may be set to 0/1 when serialized from a Java server.
 * You should avoid comparisons like {@code val === true/false} in those cases.
 * @return {boolean}
 */
proto.roadmunk.AccountUpdatedMessage.prototype.getShouldPublishRequireSso = function() {
  return /** @type {boolean} */ (jspb.Message.getFieldWithDefault(this, 7, false));
};


/** @param {boolean} value */
proto.roadmunk.AccountUpdatedMessage.prototype.setShouldPublishRequireSso = function(value) {
  jspb.Message.setField(this, 7, value);
};


/**
 * optional string billing_email = 8;
 * @return {string}
 */
proto.roadmunk.AccountUpdatedMessage.prototype.getBillingEmail = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 8, ""));
};


/** @param {string} value */
proto.roadmunk.AccountUpdatedMessage.prototype.setBillingEmail = function(value) {
  jspb.Message.setField(this, 8, value);
};


/**
 * optional string deployment = 9;
 * @return {string}
 */
proto.roadmunk.AccountUpdatedMessage.prototype.getDeployment = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 9, ""));
};


/** @param {string} value */
proto.roadmunk.AccountUpdatedMessage.prototype.setDeployment = function(value) {
  jspb.Message.setField(this, 9, value);
};


/**
 * optional bool has_good_standing = 10;
 * Note that Boolean fields may be set to 0/1 when serialized from a Java server.
 * You should avoid comparisons like {@code val === true/false} in those cases.
 * @return {boolean}
 */
proto.roadmunk.AccountUpdatedMessage.prototype.getHasGoodStanding = function() {
  return /** @type {boolean} */ (jspb.Message.getFieldWithDefault(this, 10, false));
};


/** @param {boolean} value */
proto.roadmunk.AccountUpdatedMessage.prototype.setHasGoodStanding = function(value) {
  jspb.Message.setField(this, 10, value);
};


goog.object.extend(exports, proto.roadmunk);
