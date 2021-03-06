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

goog.exportSymbol('proto.roadmunk.ResetPasswordRequest', null, global);

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
proto.roadmunk.ResetPasswordRequest = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.roadmunk.ResetPasswordRequest, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  proto.roadmunk.ResetPasswordRequest.displayName = 'proto.roadmunk.ResetPasswordRequest';
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
proto.roadmunk.ResetPasswordRequest.prototype.toObject = function(opt_includeInstance) {
  return proto.roadmunk.ResetPasswordRequest.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Whether to include the JSPB
 *     instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.roadmunk.ResetPasswordRequest} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.roadmunk.ResetPasswordRequest.toObject = function(includeInstance, msg) {
  var f, obj = {
    deployment: jspb.Message.getFieldWithDefault(msg, 1, ""),
    email: jspb.Message.getFieldWithDefault(msg, 2, ""),
    hubspotutk: jspb.Message.getFieldWithDefault(msg, 3, ""),
    ip: jspb.Message.getFieldWithDefault(msg, 4, ""),
    pageUrl: jspb.Message.getFieldWithDefault(msg, 5, "")
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
 * @return {!proto.roadmunk.ResetPasswordRequest}
 */
proto.roadmunk.ResetPasswordRequest.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.roadmunk.ResetPasswordRequest;
  return proto.roadmunk.ResetPasswordRequest.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.roadmunk.ResetPasswordRequest} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.roadmunk.ResetPasswordRequest}
 */
proto.roadmunk.ResetPasswordRequest.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {string} */ (reader.readString());
      msg.setDeployment(value);
      break;
    case 2:
      var value = /** @type {string} */ (reader.readString());
      msg.setEmail(value);
      break;
    case 3:
      var value = /** @type {string} */ (reader.readString());
      msg.setHubspotutk(value);
      break;
    case 4:
      var value = /** @type {string} */ (reader.readString());
      msg.setIp(value);
      break;
    case 5:
      var value = /** @type {string} */ (reader.readString());
      msg.setPageUrl(value);
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
proto.roadmunk.ResetPasswordRequest.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.roadmunk.ResetPasswordRequest.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.roadmunk.ResetPasswordRequest} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.roadmunk.ResetPasswordRequest.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getDeployment();
  if (f.length > 0) {
    writer.writeString(
      1,
      f
    );
  }
  f = message.getEmail();
  if (f.length > 0) {
    writer.writeString(
      2,
      f
    );
  }
  f = message.getHubspotutk();
  if (f.length > 0) {
    writer.writeString(
      3,
      f
    );
  }
  f = message.getIp();
  if (f.length > 0) {
    writer.writeString(
      4,
      f
    );
  }
  f = message.getPageUrl();
  if (f.length > 0) {
    writer.writeString(
      5,
      f
    );
  }
};


/**
 * optional string deployment = 1;
 * @return {string}
 */
proto.roadmunk.ResetPasswordRequest.prototype.getDeployment = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/** @param {string} value */
proto.roadmunk.ResetPasswordRequest.prototype.setDeployment = function(value) {
  jspb.Message.setField(this, 1, value);
};


/**
 * optional string email = 2;
 * @return {string}
 */
proto.roadmunk.ResetPasswordRequest.prototype.getEmail = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 2, ""));
};


/** @param {string} value */
proto.roadmunk.ResetPasswordRequest.prototype.setEmail = function(value) {
  jspb.Message.setField(this, 2, value);
};


/**
 * optional string hubspotutk = 3;
 * @return {string}
 */
proto.roadmunk.ResetPasswordRequest.prototype.getHubspotutk = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 3, ""));
};


/** @param {string} value */
proto.roadmunk.ResetPasswordRequest.prototype.setHubspotutk = function(value) {
  jspb.Message.setField(this, 3, value);
};


/**
 * optional string ip = 4;
 * @return {string}
 */
proto.roadmunk.ResetPasswordRequest.prototype.getIp = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 4, ""));
};


/** @param {string} value */
proto.roadmunk.ResetPasswordRequest.prototype.setIp = function(value) {
  jspb.Message.setField(this, 4, value);
};


/**
 * optional string page_url = 5;
 * @return {string}
 */
proto.roadmunk.ResetPasswordRequest.prototype.getPageUrl = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 5, ""));
};


/** @param {string} value */
proto.roadmunk.ResetPasswordRequest.prototype.setPageUrl = function(value) {
  jspb.Message.setField(this, 5, value);
};


goog.object.extend(exports, proto.roadmunk);
