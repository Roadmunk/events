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

var google_protobuf_wrappers_pb = require('google-protobuf/google/protobuf/wrappers_pb.js');
goog.exportSymbol('proto.roadmunk.SignupAccountRequest', null, global);

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
proto.roadmunk.SignupAccountRequest = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.roadmunk.SignupAccountRequest, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  proto.roadmunk.SignupAccountRequest.displayName = 'proto.roadmunk.SignupAccountRequest';
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
proto.roadmunk.SignupAccountRequest.prototype.toObject = function(opt_includeInstance) {
  return proto.roadmunk.SignupAccountRequest.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Whether to include the JSPB
 *     instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.roadmunk.SignupAccountRequest} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.roadmunk.SignupAccountRequest.toObject = function(includeInstance, msg) {
  var f, obj = {
    email: jspb.Message.getFieldWithDefault(msg, 1, ""),
    userId: jspb.Message.getFieldWithDefault(msg, 2, ""),
    accountId: jspb.Message.getFieldWithDefault(msg, 3, ""),
    deployment: jspb.Message.getFieldWithDefault(msg, 4, ""),
    accountRole: jspb.Message.getFieldWithDefault(msg, 5, ""),
    source: jspb.Message.getFieldWithDefault(msg, 6, ""),
    hash: jspb.Message.getFieldWithDefault(msg, 7, ""),
    googleId: jspb.Message.getFieldWithDefault(msg, 8, ""),
    hubspotutk: jspb.Message.getFieldWithDefault(msg, 9, ""),
    ip: jspb.Message.getFieldWithDefault(msg, 10, ""),
    pageUrl: jspb.Message.getFieldWithDefault(msg, 11, ""),
    firstName: jspb.Message.getFieldWithDefault(msg, 12, ""),
    lastName: jspb.Message.getFieldWithDefault(msg, 13, ""),
    companyName: (f = msg.getCompanyName()) && google_protobuf_wrappers_pb.StringValue.toObject(includeInstance, f),
    companySize: (f = msg.getCompanySize()) && google_protobuf_wrappers_pb.StringValue.toObject(includeInstance, f),
    trialLengthWeeks: (f = msg.getTrialLengthWeeks()) && google_protobuf_wrappers_pb.Int32Value.toObject(includeInstance, f),
    subscribeToNewsletters: (f = msg.getSubscribeToNewsletters()) && google_protobuf_wrappers_pb.BoolValue.toObject(includeInstance, f)
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
 * @return {!proto.roadmunk.SignupAccountRequest}
 */
proto.roadmunk.SignupAccountRequest.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.roadmunk.SignupAccountRequest;
  return proto.roadmunk.SignupAccountRequest.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.roadmunk.SignupAccountRequest} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.roadmunk.SignupAccountRequest}
 */
proto.roadmunk.SignupAccountRequest.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {string} */ (reader.readString());
      msg.setEmail(value);
      break;
    case 2:
      var value = /** @type {string} */ (reader.readString());
      msg.setUserId(value);
      break;
    case 3:
      var value = /** @type {string} */ (reader.readString());
      msg.setAccountId(value);
      break;
    case 4:
      var value = /** @type {string} */ (reader.readString());
      msg.setDeployment(value);
      break;
    case 5:
      var value = /** @type {string} */ (reader.readString());
      msg.setAccountRole(value);
      break;
    case 6:
      var value = /** @type {string} */ (reader.readString());
      msg.setSource(value);
      break;
    case 7:
      var value = /** @type {string} */ (reader.readString());
      msg.setHash(value);
      break;
    case 8:
      var value = /** @type {string} */ (reader.readString());
      msg.setGoogleId(value);
      break;
    case 9:
      var value = /** @type {string} */ (reader.readString());
      msg.setHubspotutk(value);
      break;
    case 10:
      var value = /** @type {string} */ (reader.readString());
      msg.setIp(value);
      break;
    case 11:
      var value = /** @type {string} */ (reader.readString());
      msg.setPageUrl(value);
      break;
    case 12:
      var value = /** @type {string} */ (reader.readString());
      msg.setFirstName(value);
      break;
    case 13:
      var value = /** @type {string} */ (reader.readString());
      msg.setLastName(value);
      break;
    case 16:
      var value = new google_protobuf_wrappers_pb.StringValue;
      reader.readMessage(value,google_protobuf_wrappers_pb.StringValue.deserializeBinaryFromReader);
      msg.setCompanyName(value);
      break;
    case 17:
      var value = new google_protobuf_wrappers_pb.StringValue;
      reader.readMessage(value,google_protobuf_wrappers_pb.StringValue.deserializeBinaryFromReader);
      msg.setCompanySize(value);
      break;
    case 18:
      var value = new google_protobuf_wrappers_pb.Int32Value;
      reader.readMessage(value,google_protobuf_wrappers_pb.Int32Value.deserializeBinaryFromReader);
      msg.setTrialLengthWeeks(value);
      break;
    case 19:
      var value = new google_protobuf_wrappers_pb.BoolValue;
      reader.readMessage(value,google_protobuf_wrappers_pb.BoolValue.deserializeBinaryFromReader);
      msg.setSubscribeToNewsletters(value);
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
proto.roadmunk.SignupAccountRequest.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.roadmunk.SignupAccountRequest.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.roadmunk.SignupAccountRequest} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.roadmunk.SignupAccountRequest.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getEmail();
  if (f.length > 0) {
    writer.writeString(
      1,
      f
    );
  }
  f = message.getUserId();
  if (f.length > 0) {
    writer.writeString(
      2,
      f
    );
  }
  f = message.getAccountId();
  if (f.length > 0) {
    writer.writeString(
      3,
      f
    );
  }
  f = message.getDeployment();
  if (f.length > 0) {
    writer.writeString(
      4,
      f
    );
  }
  f = message.getAccountRole();
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
  f = message.getHash();
  if (f.length > 0) {
    writer.writeString(
      7,
      f
    );
  }
  f = message.getGoogleId();
  if (f.length > 0) {
    writer.writeString(
      8,
      f
    );
  }
  f = message.getHubspotutk();
  if (f.length > 0) {
    writer.writeString(
      9,
      f
    );
  }
  f = message.getIp();
  if (f.length > 0) {
    writer.writeString(
      10,
      f
    );
  }
  f = message.getPageUrl();
  if (f.length > 0) {
    writer.writeString(
      11,
      f
    );
  }
  f = message.getFirstName();
  if (f.length > 0) {
    writer.writeString(
      12,
      f
    );
  }
  f = message.getLastName();
  if (f.length > 0) {
    writer.writeString(
      13,
      f
    );
  }
  f = message.getCompanyName();
  if (f != null) {
    writer.writeMessage(
      16,
      f,
      google_protobuf_wrappers_pb.StringValue.serializeBinaryToWriter
    );
  }
  f = message.getCompanySize();
  if (f != null) {
    writer.writeMessage(
      17,
      f,
      google_protobuf_wrappers_pb.StringValue.serializeBinaryToWriter
    );
  }
  f = message.getTrialLengthWeeks();
  if (f != null) {
    writer.writeMessage(
      18,
      f,
      google_protobuf_wrappers_pb.Int32Value.serializeBinaryToWriter
    );
  }
  f = message.getSubscribeToNewsletters();
  if (f != null) {
    writer.writeMessage(
      19,
      f,
      google_protobuf_wrappers_pb.BoolValue.serializeBinaryToWriter
    );
  }
};


/**
 * optional string email = 1;
 * @return {string}
 */
proto.roadmunk.SignupAccountRequest.prototype.getEmail = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/** @param {string} value */
proto.roadmunk.SignupAccountRequest.prototype.setEmail = function(value) {
  jspb.Message.setField(this, 1, value);
};


/**
 * optional string user_id = 2;
 * @return {string}
 */
proto.roadmunk.SignupAccountRequest.prototype.getUserId = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 2, ""));
};


/** @param {string} value */
proto.roadmunk.SignupAccountRequest.prototype.setUserId = function(value) {
  jspb.Message.setField(this, 2, value);
};


/**
 * optional string account_id = 3;
 * @return {string}
 */
proto.roadmunk.SignupAccountRequest.prototype.getAccountId = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 3, ""));
};


/** @param {string} value */
proto.roadmunk.SignupAccountRequest.prototype.setAccountId = function(value) {
  jspb.Message.setField(this, 3, value);
};


/**
 * optional string deployment = 4;
 * @return {string}
 */
proto.roadmunk.SignupAccountRequest.prototype.getDeployment = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 4, ""));
};


/** @param {string} value */
proto.roadmunk.SignupAccountRequest.prototype.setDeployment = function(value) {
  jspb.Message.setField(this, 4, value);
};


/**
 * optional string account_role = 5;
 * @return {string}
 */
proto.roadmunk.SignupAccountRequest.prototype.getAccountRole = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 5, ""));
};


/** @param {string} value */
proto.roadmunk.SignupAccountRequest.prototype.setAccountRole = function(value) {
  jspb.Message.setField(this, 5, value);
};


/**
 * optional string source = 6;
 * @return {string}
 */
proto.roadmunk.SignupAccountRequest.prototype.getSource = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 6, ""));
};


/** @param {string} value */
proto.roadmunk.SignupAccountRequest.prototype.setSource = function(value) {
  jspb.Message.setField(this, 6, value);
};


/**
 * optional string hash = 7;
 * @return {string}
 */
proto.roadmunk.SignupAccountRequest.prototype.getHash = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 7, ""));
};


/** @param {string} value */
proto.roadmunk.SignupAccountRequest.prototype.setHash = function(value) {
  jspb.Message.setField(this, 7, value);
};


/**
 * optional string google_id = 8;
 * @return {string}
 */
proto.roadmunk.SignupAccountRequest.prototype.getGoogleId = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 8, ""));
};


/** @param {string} value */
proto.roadmunk.SignupAccountRequest.prototype.setGoogleId = function(value) {
  jspb.Message.setField(this, 8, value);
};


/**
 * optional string hubspotutk = 9;
 * @return {string}
 */
proto.roadmunk.SignupAccountRequest.prototype.getHubspotutk = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 9, ""));
};


/** @param {string} value */
proto.roadmunk.SignupAccountRequest.prototype.setHubspotutk = function(value) {
  jspb.Message.setField(this, 9, value);
};


/**
 * optional string ip = 10;
 * @return {string}
 */
proto.roadmunk.SignupAccountRequest.prototype.getIp = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 10, ""));
};


/** @param {string} value */
proto.roadmunk.SignupAccountRequest.prototype.setIp = function(value) {
  jspb.Message.setField(this, 10, value);
};


/**
 * optional string page_url = 11;
 * @return {string}
 */
proto.roadmunk.SignupAccountRequest.prototype.getPageUrl = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 11, ""));
};


/** @param {string} value */
proto.roadmunk.SignupAccountRequest.prototype.setPageUrl = function(value) {
  jspb.Message.setField(this, 11, value);
};


/**
 * optional string first_name = 12;
 * @return {string}
 */
proto.roadmunk.SignupAccountRequest.prototype.getFirstName = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 12, ""));
};


/** @param {string} value */
proto.roadmunk.SignupAccountRequest.prototype.setFirstName = function(value) {
  jspb.Message.setField(this, 12, value);
};


/**
 * optional string last_name = 13;
 * @return {string}
 */
proto.roadmunk.SignupAccountRequest.prototype.getLastName = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 13, ""));
};


/** @param {string} value */
proto.roadmunk.SignupAccountRequest.prototype.setLastName = function(value) {
  jspb.Message.setField(this, 13, value);
};


/**
 * optional google.protobuf.StringValue company_name = 16;
 * @return {?proto.google.protobuf.StringValue}
 */
proto.roadmunk.SignupAccountRequest.prototype.getCompanyName = function() {
  return /** @type{?proto.google.protobuf.StringValue} */ (
    jspb.Message.getWrapperField(this, google_protobuf_wrappers_pb.StringValue, 16));
};


/** @param {?proto.google.protobuf.StringValue|undefined} value */
proto.roadmunk.SignupAccountRequest.prototype.setCompanyName = function(value) {
  jspb.Message.setWrapperField(this, 16, value);
};


proto.roadmunk.SignupAccountRequest.prototype.clearCompanyName = function() {
  this.setCompanyName(undefined);
};


/**
 * Returns whether this field is set.
 * @return {!boolean}
 */
proto.roadmunk.SignupAccountRequest.prototype.hasCompanyName = function() {
  return jspb.Message.getField(this, 16) != null;
};


/**
 * optional google.protobuf.StringValue company_size = 17;
 * @return {?proto.google.protobuf.StringValue}
 */
proto.roadmunk.SignupAccountRequest.prototype.getCompanySize = function() {
  return /** @type{?proto.google.protobuf.StringValue} */ (
    jspb.Message.getWrapperField(this, google_protobuf_wrappers_pb.StringValue, 17));
};


/** @param {?proto.google.protobuf.StringValue|undefined} value */
proto.roadmunk.SignupAccountRequest.prototype.setCompanySize = function(value) {
  jspb.Message.setWrapperField(this, 17, value);
};


proto.roadmunk.SignupAccountRequest.prototype.clearCompanySize = function() {
  this.setCompanySize(undefined);
};


/**
 * Returns whether this field is set.
 * @return {!boolean}
 */
proto.roadmunk.SignupAccountRequest.prototype.hasCompanySize = function() {
  return jspb.Message.getField(this, 17) != null;
};


/**
 * optional google.protobuf.Int32Value trial_length_weeks = 18;
 * @return {?proto.google.protobuf.Int32Value}
 */
proto.roadmunk.SignupAccountRequest.prototype.getTrialLengthWeeks = function() {
  return /** @type{?proto.google.protobuf.Int32Value} */ (
    jspb.Message.getWrapperField(this, google_protobuf_wrappers_pb.Int32Value, 18));
};


/** @param {?proto.google.protobuf.Int32Value|undefined} value */
proto.roadmunk.SignupAccountRequest.prototype.setTrialLengthWeeks = function(value) {
  jspb.Message.setWrapperField(this, 18, value);
};


proto.roadmunk.SignupAccountRequest.prototype.clearTrialLengthWeeks = function() {
  this.setTrialLengthWeeks(undefined);
};


/**
 * Returns whether this field is set.
 * @return {!boolean}
 */
proto.roadmunk.SignupAccountRequest.prototype.hasTrialLengthWeeks = function() {
  return jspb.Message.getField(this, 18) != null;
};


/**
 * optional google.protobuf.BoolValue subscribe_to_newsletters = 19;
 * @return {?proto.google.protobuf.BoolValue}
 */
proto.roadmunk.SignupAccountRequest.prototype.getSubscribeToNewsletters = function() {
  return /** @type{?proto.google.protobuf.BoolValue} */ (
    jspb.Message.getWrapperField(this, google_protobuf_wrappers_pb.BoolValue, 19));
};


/** @param {?proto.google.protobuf.BoolValue|undefined} value */
proto.roadmunk.SignupAccountRequest.prototype.setSubscribeToNewsletters = function(value) {
  jspb.Message.setWrapperField(this, 19, value);
};


proto.roadmunk.SignupAccountRequest.prototype.clearSubscribeToNewsletters = function() {
  this.setSubscribeToNewsletters(undefined);
};


/**
 * Returns whether this field is set.
 * @return {!boolean}
 */
proto.roadmunk.SignupAccountRequest.prototype.hasSubscribeToNewsletters = function() {
  return jspb.Message.getField(this, 19) != null;
};


goog.object.extend(exports, proto.roadmunk);
