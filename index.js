const { UserUpdatedMessage } = require('./dist/user_updated_pb');
const { AccountUpdatedMessage } = require('./dist/account_updated_pb');
const { SignupAccountRequest } = require('./dist/signup_account_pb');
const { AccountSignupCompleted } = require('./dist/account_signup_pb');
const { SendEmailRequest } = require('./dist/send_email_pb');
const { IdeaRoadmapItemAttachMessage } = require('./dist/idea_roadmap_item_attach_pb');
const { IdeaRoadmapItemDetachMessage } = require('./dist/idea_roadmap_item_detach_pb');
const { InviteUserRequest } = require('./dist/invite_user_pb');
const { CustomersCSVIngestionMessage } = require('./dist/customers_csv_ingestion_pb');
const { MoveUserRequest } = require('./dist/move_user_pb');
const { MergeAccountRequest } = require('./dist/merge_account_pb');
const { SegmentEvent } = require('./dist/segment_event_pv');

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

  // Detach an idea from a roadmap item
  IDEA_ROADMAP_ITEM_DETACH: 'idea-roadmap-item-detach',
  IDEA_ROADMAP_ITEM_DETACH_SUCCESS: 'idea-roadmap-item-detach-success',
  IDEA_ROADMAP_ITEM_DETACH_FAILURE: 'idea-roadmap-item-detach-failure',
  IdeaRoadmapItemDetachMessage,

  // Invite a user
  INVITE_USER: 'invite-user',
  INVITE_USER_SUCCESS: 'invite-user-success',
  INVITE_USER_FAILURE: 'invite-user-failure',
  InviteUserRequest,
  
  // Ingesting a CSV for new customers
  CUSTOMERS_CSV_INGESTION: 'customers-csv-ingestion',
  CUSTOMERS_CSV_INGESTION_SUCCESS: 'customers-csv-ingestion-success',
  CUSTOMERS_CSV_INGESTION_FAILURE: 'customers-csv-ingestion-failure',
  CustomersCSVIngestionMessage,

  // Moving a user to a new account
  MOVE_USER: 'move-user',
  MOVE_USER_SUCCESS: 'move-user-success',
  MOVE_USER_FAILURE: 'move-user-failure',
  MoveUserRequest,

  // Merge two accounts
  MERGE_ACCOUNT: 'merge-account',
  MERGE_ACCOUNT_SUCCESS: 'merge-account-success',
  MERGE_ACCOUNT_FAILURE: 'merge-account-failure',
  MergeAccountRequest,

  // Sync with segment event
  SEGMENT_EVENT: 'segment-event',
  SEGMENT_EVENT_SUCCESS: 'segment-event-success',
  SEGMENT_EVENT_FAILURE: 'segment-event-failure',
  SegmentEvent,
};
