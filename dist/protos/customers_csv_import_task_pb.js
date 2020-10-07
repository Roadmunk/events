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

goog.exportSymbol('proto.roadmunk.CustomersCSVImportTask', null, global);

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
proto.roadmunk.CustomersCSVImportTask = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.roadmunk.CustomersCSVImportTask, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  proto.roadmunk.CustomersCSVImportTask.displayName = 'proto.roadmunk.CustomersCSVImportTask';
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
proto.roadmunk.CustomersCSVImportTask.prototype.toObject = function(opt_includeInstance) {
  return proto.roadmunk.CustomersCSVImportTask.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Whether to include the JSPB
 *     instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.roadmunk.CustomersCSVImportTask} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.roadmunk.CustomersCSVImportTask.toObject = function(includeInstance, msg) {
  var f, obj = {
    deployment: jspb.Message.getFieldWithDefault(msg, 1, ""),
    accountId: jspb.Message.getFieldWithDefault(msg, 2, ""),
    taskId: jspb.Message.getFieldWithDefault(msg, 3, ""),
    oldStatus: jspb.Message.getFieldWithDefault(msg, 4, ""),
    newStatus: jspb.Message.getFieldWithDefault(msg, 5, ""),
    userId: jspb.Message.getFieldWithDefault(msg, 6, ""),
    packageName: jspb.Message.getFieldWithDefault(msg, 7, "")
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
 * @return {!proto.roadmunk.CustomersCSVImportTask}
 */
proto.roadmunk.CustomersCSVImportTask.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.roadmunk.CustomersCSVImportTask;
  return proto.roadmunk.CustomersCSVImportTask.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.roadmunk.CustomersCSVImportTask} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.roadmunk.CustomersCSVImportTask}
 */
proto.roadmunk.CustomersCSVImportTask.deserializeBinaryFromReader = function(msg, reader) {
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
      msg.setAccountId(value);
      break;
    case 3:
      var value = /** @type {string} */ (reader.readString());
      msg.setTaskId(value);
      break;
    case 4:
      var value = /** @type {string} */ (reader.readString());
      msg.setOldStatus(value);
      break;
    case 5:
      var value = /** @type {string} */ (reader.readString());
      msg.setNewStatus(value);
      break;
    case 6:
      var value = /** @type {string} */ (reader.readString());
      msg.setUserId(value);
      break;
    case 7:
      var value = /** @type {string} */ (reader.readString());
      msg.setPackageName(value);
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
proto.roadmunk.CustomersCSVImportTask.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.roadmunk.CustomersCSVImportTask.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.roadmunk.CustomersCSVImportTask} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.roadmunk.CustomersCSVImportTask.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getDeployment();
  if (f.length > 0) {
    writer.writeString(
      1,
      f
    );
  }
  f = message.getAccountId();
  if (f.length > 0) {
    writer.writeString(
      2,
      f
    );
  }
  f = message.getTaskId();
  if (f.length > 0) {
    writer.writeString(
      3,
      f
    );
  }
  f = message.getOldStatus();
  if (f.length > 0) {
    writer.writeString(
      4,
      f
    );
  }
  f = message.getNewStatus();
  if (f.length > 0) {
    writer.writeString(
      5,
      f
    );
  }
  f = message.getUserId();
  if (f.length > 0) {
    writer.writeString(
      6,
      f
    );
  }
  f = message.getPackageName();
  if (f.length > 0) {
    writer.writeString(
      7,
      f
    );
  }
};


/**
 * optional string deployment = 1;
 * @return {string}
 */
proto.roadmunk.CustomersCSVImportTask.prototype.getDeployment = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/** @param {string} value */
proto.roadmunk.CustomersCSVImportTask.prototype.setDeployment = function(value) {
  jspb.Message.setField(this, 1, value);
};


/**
 * optional string account_id = 2;
 * @return {string}
 */
proto.roadmunk.CustomersCSVImportTask.prototype.getAccountId = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 2, ""));
};


/** @param {string} value */
proto.roadmunk.CustomersCSVImportTask.prototype.setAccountId = function(value) {
  jspb.Message.setField(this, 2, value);
};


/**
 * optional string task_id = 3;
 * @return {string}
 */
proto.roadmunk.CustomersCSVImportTask.prototype.getTaskId = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 3, ""));
};


/** @param {string} value */
proto.roadmunk.CustomersCSVImportTask.prototype.setTaskId = function(value) {
  jspb.Message.setField(this, 3, value);
};


/**
 * optional string old_status = 4;
 * @return {string}
 */
proto.roadmunk.CustomersCSVImportTask.prototype.getOldStatus = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 4, ""));
};


/** @param {string} value */
proto.roadmunk.CustomersCSVImportTask.prototype.setOldStatus = function(value) {
  jspb.Message.setField(this, 4, value);
};


/**
 * optional string new_status = 5;
 * @return {string}
 */
proto.roadmunk.CustomersCSVImportTask.prototype.getNewStatus = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 5, ""));
};


/** @param {string} value */
proto.roadmunk.CustomersCSVImportTask.prototype.setNewStatus = function(value) {
  jspb.Message.setField(this, 5, value);
};


/**
 * optional string user_id = 6;
 * @return {string}
 */
proto.roadmunk.CustomersCSVImportTask.prototype.getUserId = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 6, ""));
};


/** @param {string} value */
proto.roadmunk.CustomersCSVImportTask.prototype.setUserId = function(value) {
  jspb.Message.setField(this, 6, value);
};


/**
 * optional string package_name = 7;
 * @return {string}
 */
proto.roadmunk.CustomersCSVImportTask.prototype.getPackageName = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 7, ""));
};


/** @param {string} value */
proto.roadmunk.CustomersCSVImportTask.prototype.setPackageName = function(value) {
  jspb.Message.setField(this, 7, value);
};


goog.object.extend(exports, proto.roadmunk);