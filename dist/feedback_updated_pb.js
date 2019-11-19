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

goog.exportSymbol('proto.roadmunk.FeedbackUpdatedMessage', null, global);

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
proto.roadmunk.FeedbackUpdatedMessage = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.roadmunk.FeedbackUpdatedMessage, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  proto.roadmunk.FeedbackUpdatedMessage.displayName = 'proto.roadmunk.FeedbackUpdatedMessage';
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
proto.roadmunk.FeedbackUpdatedMessage.prototype.toObject = function(opt_includeInstance) {
  return proto.roadmunk.FeedbackUpdatedMessage.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Whether to include the JSPB
 *     instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.roadmunk.FeedbackUpdatedMessage} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.roadmunk.FeedbackUpdatedMessage.toObject = function(includeInstance, msg) {
  var f, obj = {
    feedbackId: jspb.Message.getFieldWithDefault(msg, 1, ""),
    feedbackOwnerId: jspb.Message.getFieldWithDefault(msg, 2, ""),
    newStatus: jspb.Message.getFieldWithDefault(msg, 3, ""),
    newProductAreaId: jspb.Message.getFieldWithDefault(msg, 4, ""),
    productAreaName: jspb.Message.getFieldWithDefault(msg, 5, ""),
    customerId: jspb.Message.getFieldWithDefault(msg, 6, ""),
    customerName: jspb.Message.getFieldWithDefault(msg, 7, ""),
    userId: jspb.Message.getFieldWithDefault(msg, 8, ""),
    accountId: jspb.Message.getFieldWithDefault(msg, 9, ""),
    deployment: jspb.Message.getFieldWithDefault(msg, 10, "")
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
 * @return {!proto.roadmunk.FeedbackUpdatedMessage}
 */
proto.roadmunk.FeedbackUpdatedMessage.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.roadmunk.FeedbackUpdatedMessage;
  return proto.roadmunk.FeedbackUpdatedMessage.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.roadmunk.FeedbackUpdatedMessage} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.roadmunk.FeedbackUpdatedMessage}
 */
proto.roadmunk.FeedbackUpdatedMessage.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {string} */ (reader.readString());
      msg.setFeedbackId(value);
      break;
    case 2:
      var value = /** @type {string} */ (reader.readString());
      msg.setFeedbackOwnerId(value);
      break;
    case 3:
      var value = /** @type {string} */ (reader.readString());
      msg.setNewStatus(value);
      break;
    case 4:
      var value = /** @type {string} */ (reader.readString());
      msg.setNewProductAreaId(value);
      break;
    case 5:
      var value = /** @type {string} */ (reader.readString());
      msg.setProductAreaName(value);
      break;
    case 6:
      var value = /** @type {string} */ (reader.readString());
      msg.setCustomerId(value);
      break;
    case 7:
      var value = /** @type {string} */ (reader.readString());
      msg.setCustomerName(value);
      break;
    case 8:
      var value = /** @type {string} */ (reader.readString());
      msg.setUserId(value);
      break;
    case 9:
      var value = /** @type {string} */ (reader.readString());
      msg.setAccountId(value);
      break;
    case 10:
      var value = /** @type {string} */ (reader.readString());
      msg.setDeployment(value);
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
proto.roadmunk.FeedbackUpdatedMessage.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.roadmunk.FeedbackUpdatedMessage.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.roadmunk.FeedbackUpdatedMessage} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.roadmunk.FeedbackUpdatedMessage.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getFeedbackId();
  if (f.length > 0) {
    writer.writeString(
      1,
      f
    );
  }
  f = message.getFeedbackOwnerId();
  if (f.length > 0) {
    writer.writeString(
      2,
      f
    );
  }
  f = message.getNewStatus();
  if (f.length > 0) {
    writer.writeString(
      3,
      f
    );
  }
  f = message.getNewProductAreaId();
  if (f.length > 0) {
    writer.writeString(
      4,
      f
    );
  }
  f = message.getProductAreaName();
  if (f.length > 0) {
    writer.writeString(
      5,
      f
    );
  }
  f = message.getCustomerId();
  if (f.length > 0) {
    writer.writeString(
      6,
      f
    );
  }
  f = message.getCustomerName();
  if (f.length > 0) {
    writer.writeString(
      7,
      f
    );
  }
  f = message.getUserId();
  if (f.length > 0) {
    writer.writeString(
      8,
      f
    );
  }
  f = message.getAccountId();
  if (f.length > 0) {
    writer.writeString(
      9,
      f
    );
  }
  f = message.getDeployment();
  if (f.length > 0) {
    writer.writeString(
      10,
      f
    );
  }
};


/**
 * optional string feedback_id = 1;
 * @return {string}
 */
proto.roadmunk.FeedbackUpdatedMessage.prototype.getFeedbackId = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/** @param {string} value */
proto.roadmunk.FeedbackUpdatedMessage.prototype.setFeedbackId = function(value) {
  jspb.Message.setField(this, 1, value);
};


/**
 * optional string feedback_owner_id = 2;
 * @return {string}
 */
proto.roadmunk.FeedbackUpdatedMessage.prototype.getFeedbackOwnerId = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 2, ""));
};


/** @param {string} value */
proto.roadmunk.FeedbackUpdatedMessage.prototype.setFeedbackOwnerId = function(value) {
  jspb.Message.setField(this, 2, value);
};


/**
 * optional string new_status = 3;
 * @return {string}
 */
proto.roadmunk.FeedbackUpdatedMessage.prototype.getNewStatus = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 3, ""));
};


/** @param {string} value */
proto.roadmunk.FeedbackUpdatedMessage.prototype.setNewStatus = function(value) {
  jspb.Message.setField(this, 3, value);
};


/**
 * optional string new_product_area_id = 4;
 * @return {string}
 */
proto.roadmunk.FeedbackUpdatedMessage.prototype.getNewProductAreaId = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 4, ""));
};


/** @param {string} value */
proto.roadmunk.FeedbackUpdatedMessage.prototype.setNewProductAreaId = function(value) {
  jspb.Message.setField(this, 4, value);
};


/**
 * optional string product_area_name = 5;
 * @return {string}
 */
proto.roadmunk.FeedbackUpdatedMessage.prototype.getProductAreaName = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 5, ""));
};


/** @param {string} value */
proto.roadmunk.FeedbackUpdatedMessage.prototype.setProductAreaName = function(value) {
  jspb.Message.setField(this, 5, value);
};


/**
 * optional string customer_id = 6;
 * @return {string}
 */
proto.roadmunk.FeedbackUpdatedMessage.prototype.getCustomerId = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 6, ""));
};


/** @param {string} value */
proto.roadmunk.FeedbackUpdatedMessage.prototype.setCustomerId = function(value) {
  jspb.Message.setField(this, 6, value);
};


/**
 * optional string customer_name = 7;
 * @return {string}
 */
proto.roadmunk.FeedbackUpdatedMessage.prototype.getCustomerName = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 7, ""));
};


/** @param {string} value */
proto.roadmunk.FeedbackUpdatedMessage.prototype.setCustomerName = function(value) {
  jspb.Message.setField(this, 7, value);
};


/**
 * optional string user_id = 8;
 * @return {string}
 */
proto.roadmunk.FeedbackUpdatedMessage.prototype.getUserId = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 8, ""));
};


/** @param {string} value */
proto.roadmunk.FeedbackUpdatedMessage.prototype.setUserId = function(value) {
  jspb.Message.setField(this, 8, value);
};


/**
 * optional string account_id = 9;
 * @return {string}
 */
proto.roadmunk.FeedbackUpdatedMessage.prototype.getAccountId = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 9, ""));
};


/** @param {string} value */
proto.roadmunk.FeedbackUpdatedMessage.prototype.setAccountId = function(value) {
  jspb.Message.setField(this, 9, value);
};


/**
 * optional string deployment = 10;
 * @return {string}
 */
proto.roadmunk.FeedbackUpdatedMessage.prototype.getDeployment = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 10, ""));
};


/** @param {string} value */
proto.roadmunk.FeedbackUpdatedMessage.prototype.setDeployment = function(value) {
  jspb.Message.setField(this, 10, value);
};


goog.object.extend(exports, proto.roadmunk);
