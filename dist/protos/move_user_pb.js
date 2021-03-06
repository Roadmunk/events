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

goog.exportSymbol('proto.roadmunk.MoveUserRequest', null, global);

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
proto.roadmunk.MoveUserRequest = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.roadmunk.MoveUserRequest, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  proto.roadmunk.MoveUserRequest.displayName = 'proto.roadmunk.MoveUserRequest';
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
proto.roadmunk.MoveUserRequest.prototype.toObject = function(opt_includeInstance) {
  return proto.roadmunk.MoveUserRequest.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Whether to include the JSPB
 *     instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.roadmunk.MoveUserRequest} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.roadmunk.MoveUserRequest.toObject = function(includeInstance, msg) {
  var f, obj = {
    userToMove: jspb.Message.getFieldWithDefault(msg, 1, ""),
    destinationAccount: jspb.Message.getFieldWithDefault(msg, 2, ""),
    destinationRole: jspb.Message.getFieldWithDefault(msg, 3, ""),
    modifiedByUser: jspb.Message.getFieldWithDefault(msg, 4, ""),
    deployment: jspb.Message.getFieldWithDefault(msg, 5, ""),
    source: jspb.Message.getFieldWithDefault(msg, 6, "")
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
 * @return {!proto.roadmunk.MoveUserRequest}
 */
proto.roadmunk.MoveUserRequest.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.roadmunk.MoveUserRequest;
  return proto.roadmunk.MoveUserRequest.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.roadmunk.MoveUserRequest} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.roadmunk.MoveUserRequest}
 */
proto.roadmunk.MoveUserRequest.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {string} */ (reader.readString());
      msg.setUserToMove(value);
      break;
    case 2:
      var value = /** @type {string} */ (reader.readString());
      msg.setDestinationAccount(value);
      break;
    case 3:
      var value = /** @type {string} */ (reader.readString());
      msg.setDestinationRole(value);
      break;
    case 4:
      var value = /** @type {string} */ (reader.readString());
      msg.setModifiedByUser(value);
      break;
    case 5:
      var value = /** @type {string} */ (reader.readString());
      msg.setDeployment(value);
      break;
    case 6:
      var value = /** @type {string} */ (reader.readString());
      msg.setSource(value);
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
proto.roadmunk.MoveUserRequest.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.roadmunk.MoveUserRequest.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.roadmunk.MoveUserRequest} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.roadmunk.MoveUserRequest.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getUserToMove();
  if (f.length > 0) {
    writer.writeString(
      1,
      f
    );
  }
  f = message.getDestinationAccount();
  if (f.length > 0) {
    writer.writeString(
      2,
      f
    );
  }
  f = message.getDestinationRole();
  if (f.length > 0) {
    writer.writeString(
      3,
      f
    );
  }
  f = message.getModifiedByUser();
  if (f.length > 0) {
    writer.writeString(
      4,
      f
    );
  }
  f = message.getDeployment();
  if (f.length > 0) {
    writer.writeString(
      5,
      f
    );
  }
  f = message.getSource();
  if (f.length > 0) {
    writer.writeString(
      6,
      f
    );
  }
};


/**
 * optional string user_to_move = 1;
 * @return {string}
 */
proto.roadmunk.MoveUserRequest.prototype.getUserToMove = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/** @param {string} value */
proto.roadmunk.MoveUserRequest.prototype.setUserToMove = function(value) {
  jspb.Message.setField(this, 1, value);
};


/**
 * optional string destination_account = 2;
 * @return {string}
 */
proto.roadmunk.MoveUserRequest.prototype.getDestinationAccount = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 2, ""));
};


/** @param {string} value */
proto.roadmunk.MoveUserRequest.prototype.setDestinationAccount = function(value) {
  jspb.Message.setField(this, 2, value);
};


/**
 * optional string destination_role = 3;
 * @return {string}
 */
proto.roadmunk.MoveUserRequest.prototype.getDestinationRole = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 3, ""));
};


/** @param {string} value */
proto.roadmunk.MoveUserRequest.prototype.setDestinationRole = function(value) {
  jspb.Message.setField(this, 3, value);
};


/**
 * optional string modified_by_user = 4;
 * @return {string}
 */
proto.roadmunk.MoveUserRequest.prototype.getModifiedByUser = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 4, ""));
};


/** @param {string} value */
proto.roadmunk.MoveUserRequest.prototype.setModifiedByUser = function(value) {
  jspb.Message.setField(this, 4, value);
};


/**
 * optional string deployment = 5;
 * @return {string}
 */
proto.roadmunk.MoveUserRequest.prototype.getDeployment = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 5, ""));
};


/** @param {string} value */
proto.roadmunk.MoveUserRequest.prototype.setDeployment = function(value) {
  jspb.Message.setField(this, 5, value);
};


/**
 * optional string source = 6;
 * @return {string}
 */
proto.roadmunk.MoveUserRequest.prototype.getSource = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 6, ""));
};


/** @param {string} value */
proto.roadmunk.MoveUserRequest.prototype.setSource = function(value) {
  jspb.Message.setField(this, 6, value);
};


goog.object.extend(exports, proto.roadmunk);
