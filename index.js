const { UserUpdatedMessage } = require('./dist/user_updated_pb');
const { AccountUpdatedMessage } = require('./dist/account_updated_pb');
const { SignupAccountRequest } = require('./dist/signup_account_pb');
const { AccountSignupCompleted } = require('./dist/account_signup_pb');

module.exports = {
  // Account Updated
  ACCOUNT_UPDATED: 'account-updated',
  ACCOUNT_UPDATED_SUCCESS: 'account-updated-success',
  ACCOUNT_UPDATED_FAILURE: 'account-updated-failure',
  AccountUpdatedMessage,

  // User Updated
  USER_UPDATED: 'user-updated',
  USER_UPDATED_SUCCESS: 'user-updated-success',
  USER_UPDATED_FAILURE: 'user-updated-failure',
  UserUpdatedMessage,

  // Signup Account
  SIGNUP_ACCOUNT: 'signup-account',
  SIGNUP_ACCOUNT_SUCCESS: 'signup-account-success',
  SIGNUP_ACCOUNT_FAILURE: 'signup-account-failure',
  SignupAccountRequest,
  AccountSignupCompleted,
};