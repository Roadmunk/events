const { UserUpdatedMessage } = require('./dist/user_updated_pb');
const { AccountUpdatedMessage } = require('./dist/account_updated_pb');
const { SignupAccountRequest } = require('./dist/signup_account_pb');
const { AccountSignupCompleted } = require('./dist/account_signup_pb');

module.exports = {
  AccountUpdatedMessage,
  UserUpdatedMessage,
  SignupAccountRequest,
  AccountSignupCompleted,
};
