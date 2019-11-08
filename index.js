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
const { FeedbackUpdatedMessage } = require('./dist/feedback_updated_pb');
const { FeedbackCommentedMessage } = require('./dist/feedback_commented_pb');
const { IdeaCommentedMessage } = require('./dist/idea_commented_pb');
const { ProductAreaCollaboratorsAttachedMessage } = require('./dist/product_area_collaborators_attached_pb');
const { ProductAreaCollaboratorsDetachedMessage } = require('./dist/product_area_collaborators_detached_pb');
const { AnalysisCreatedMessage } = require('./dist/analysis_created_pb');

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

  // Feedback updated
  FEEDBACK_UPDATED: 'feedback-updated',
  FEEDBACK_UPDATED_SUCCESS: 'feedback-updated-success',
  FEEDBACK_UPDATED_FAILURE: 'feedback-updated-failure',
  FeedbackUpdatedMessage,

  // New comment on feedback
  FEEDBACK_COMMENTED: 'feedback-commented',
  FEEDBACK_COMMENTED_SUCCESS: 'feedback-commented-success',
  FEEDBACK_COMMENTED_FAILURE: 'feedback-commented-failure',
  FeedbackCommentedMessage,

  // New comment on idea
  IDEA_COMMENTED: 'idea-commented',
  IDEA_COMMENTED_SUCCESS: 'idea-commented-success',
  IDEA_COMMENTED_FAILURE: 'idea-commented-failure',
  IdeaCommentedMessage,

  // New collaborators attached to product area
  PRODUCT_AREA_COLLABORATORS_ATTACHED: 'product-area-collaborators-attached',
  PRODUCT_AREA_COLLABORATORS_ATTACHED_SUCCESS: 'product-area-collaborators-attached-success',
  PRODUCT_AREA_COLLABORATORS_ATTACHED_FAILURE: 'product-area-collaborators-attached-failure',
  ProductAreaCollaboratorsAttachedMessage,

  // Collaborators detached from product area
  PRODUCT_AREA_COLLABORATORS_DETACHED: 'product-area-collaborators-detached',
  PRODUCT_AREA_COLLABORATORS_DETACHED_SUCCESS: 'product-area-collaborators-detached-success',
  PRODUCT_AREA_COLLABORATORS_DETACHED_FAILURE: 'product-area-collaborators-detached-failure',
  ProductAreaCollaboratorsDetachedMessage,

  // New analysis (aka idea board) is created
  ANALYSIS_CREATED: 'analysis-created',
  ANALYSIS_CREATED_SUCCESS: 'analysis-created-success',
  ANALYSIS_CREATED_FAILURE: 'analysis-created-failure',
  AnalysisCreatedMessage,
};
