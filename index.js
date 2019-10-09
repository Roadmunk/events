const { UserUpdatedMessage } = require('./dist/user_updated_pb');
const { AccountUpdatedMessage } = require('./dist/account_updated_pb');
const { SignupAccountRequest } = require('./dist/signup_account_pb');
const { AccountSignupCompleted } = require('./dist/account_signup_pb');
const { SendEmailRequest } = require('./dist/send_email_pb');
const { IdeaRoadmapItemAttachMessage } = require('./dist/idea_roadmap_item_attach_pb');
const { InviteUserRequest } = require('./dist/invite_user_pb');

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

  // Send email
  SEND_EMAIL: 'send-email',
  SEND_EMAIL_SUCCESS: 'send-email-success',
  SEND_EMAIL_FAILURE: 'send-email-failure',
  SendEmailRequest,

  // Attach an idea to a roadmap item
  IDEA_ROADMAP_ITEM_ATTACH: 'idea-roadmap-item-attach',
  IDEA_ROADMAP_ITEM_ATTACH_SUCCESS: 'idea-roadmap-item-attach-success',
  IDEA_ROADMAP_ITEM_ATTACH_FAILURE: 'idea-roadmap-item-attach-failure',
  IdeaRoadmapItemAttachMessage,

  // Invite a user
  INVITE_USER: 'invite-user',
  INVITE_USER_SUCCESS: 'invite-user-success',
  INVITE_USER_FAILURE: 'invite-user-failure',
  InviteUserRequest,
};
