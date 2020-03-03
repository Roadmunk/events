const { UserUpdatedMessage } = require('./dist/user_updated_pb');
const { AccountUpdatedMessage } = require('./dist/account_updated_pb');
const { SignupAccountRequest } = require('./dist/signup_account_pb');
const { ResetPasswordRequest } = require('./dist/reset_password_pb');
const { AccountSignupCompleted } = require('./dist/account_signup_pb');
const { SendEmailRequest } = require('./dist/send_email_pb');
const { IdeaRoadmapItemAttachMessage } = require('./dist/idea_roadmap_item_attach_pb');
const { IdeaRoadmapItemDetachMessage } = require('./dist/idea_roadmap_item_detach_pb');
const { InviteUserRequest } = require('./dist/invite_user_pb');
const { CustomersCSVIngestionMessage } = require('./dist/customers_csv_ingestion_pb');
const { MoveUserRequest } = require('./dist/move_user_pb');
const { MergeAccountRequest } = require('./dist/merge_account_pb');
const { SegmentEvent } = require('./dist/segment_event_pb');
const { FeedbackUpdatedMessage } = require('./dist/feedback_updated_pb');
const { FeedbackCommentedMessage } = require('./dist/feedback_commented_pb');
const { ProductAreaCollaboratorsAttachedMessage } = require('./dist/product_area_collaborators_attached_pb');
const { ProductAreaCollaboratorsDetachedMessage } = require('./dist/product_area_collaborators_detached_pb');
const { ProductAreaOwnersAttachedMessage } = require('./dist/product_area_owners_attached_pb');
const { ProductAreaOwnersDetachedMessage } = require('./dist/product_area_owners_detached_pb');
const { UserAuthUpdatedRequest } = require('./dist/user_auth_updated_pb');
const { UserEmailUpdatedMessage } = require('./dist/user_email_updated_pb');
const { UserLogout } = require('./dist/user_logout_pb');
const { TopologyRegionUpdatedMessage } = require('./dist/topology_region_updated_pb');
const { TopologyDeploymentUpdatedMessage } = require('./dist/topology_deployment_updated_pb');
const { ConfigureSAML } = require('./dist/configure_saml_pb');
const { UserLoginMessage } = require('./dist/user_login_pb');

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

  // Reset Password
  RESET_PASSWORD: 'reset-password',
  RESET_PASSWORD_SUCCESS: 'reset-password-success',
  RESET_PASSWORD_FAILURE: 'reset-password-failure',
  ResetPasswordRequest,

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

  // New owners attached to product area
  PRODUCT_AREA_OWNERS_ATTACHED: 'product-area-owners-attached',
  PRODUCT_AREA_OWNERS_ATTACHED_SUCCESS: 'product-area-owners-attached-success',
  PRODUCT_AREA_OWNERS_ATTACHED_FAILURE: 'product-area-owners-attached-failure',
  ProductAreaOwnersAttachedMessage,

    // New owners detached to product area
  PRODUCT_AREA_OWNERS_DETACHED: 'product-area-owners-detached',
  PRODUCT_AREA_OWNERS_DETACHED_SUCCESS: 'product-area-owners-detached-success',
  PRODUCT_AREA_OWNERS_DETACHED_FAILURE: 'product-area-owners-detached-failure',
  ProductAreaOwnersDetachedMessage,

  // User Auth methods updated
  USER_AUTH_UPDATED: 'user-auth-updated',
  USER_AUTH_UPDATED_SUCCESS: 'user-auth-updated-success',
  USER_AUTH_UPDATED_FAILURE: 'user-auth-updated-failure',
  UserAuthUpdatedRequest,

  // User email verified/changed
  USER_EMAIL_UPDATED: 'user-email-updated',
  USER_EMAIL_UPDATED_SUCCESS: 'user-email-updated-success',
  USER_EMAIL_UPDATED_FAILURE: 'user-email-updated-failure',
  UserEmailUpdatedMessage,

	// User Logging out
	USER_LOGOUT: 'user-logout',
	UserLogout,

	// User Logging in
	USER_LOGIN: 'user-login',
	UserLoginMessage,

	// Topology region updated
	TOPOLOGY_REGION_UPDATED : 'topology-region-upated',
	TOPOLOGY_REGION_UPDATED_SUCCESS : 'topology-region-upated-success',
	TOPOLOGY_REGION_UPDATED_FAILURE : 'topology-region-upated-failure',
	TopologyRegionUpdatedMessage,

	// topology deployment updated
	TOPOLOGY_DEPLOYMENT_UPDATED : 'topology-deployment-upated',
	TOPOLOGY_DEPLOYMENT_UPDATED_SUCCESS : 'topology-deployment-upated-success',
	TOPOLOGY_DEPLOYMENT_UPDATED_FAILURE : 'topology-deployment-upated-failure',
	TopologyDeploymentUpdatedMessage,

	// configure saml
	CONFIGURE_SAML : 'configure-saml',
	CONFIGURE_SAML_SUCCESS : 'configure-saml-success',
	CONFIGURE_SAML_FAILURE : 'configure-saml-failure',
	ConfigureSAML,
};
