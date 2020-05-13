const { UserUpdatedMessage } = require('../dist/protos/user_updated_pb');
const { AccountUpdatedMessage } = require('../dist/protos/account_updated_pb');
const { SignupAccountRequest } = require('../dist/protos/signup_account_pb');
const { ResetPasswordRequest } = require('../dist/protos/reset_password_pb');
const { AccountSignupCompleted } = require('../dist/protos/account_signup_pb');
const { SendEmailRequest } = require('../dist/protos/send_email_pb');
const { IdeaRoadmapItemAttachMessage } = require('../dist/protos/idea_roadmap_item_attach_pb');
const { IdeaRoadmapItemDetachMessage } = require('../dist/protos/idea_roadmap_item_detach_pb');
const { InviteUserRequest } = require('../dist/protos/invite_user_pb');
const { CustomersCSVIngestionMessage } = require('../dist/protos/customers_csv_ingestion_pb');
const { MoveUserRequest } = require('../dist/protos/move_user_pb');
const { MergeAccountRequest } = require('../dist/protos/merge_account_pb');
const { SegmentEvent } = require('../dist/protos/segment_event_pb');
const { FeedbackUpdatedMessage } = require('../dist/protos/feedback_updated_pb');
const { FeedbackCommentedMessage } = require('../dist/protos/feedback_commented_pb');
const { ProductAreaOwnersAttachedMessage } = require('../dist/protos/product_area_owners_attached_pb');
const { ProductAreaOwnersDetachedMessage } = require('../dist/protos/product_area_owners_detached_pb');
const { UserAuthUpdatedRequest } = require('../dist/protos/user_auth_updated_pb');
const { UserEmailUpdatedMessage } = require('../dist/protos/user_email_updated_pb');
const { UserLogout } = require('../dist/protos/user_logout_pb');
const { TopologyRegionUpdatedMessage } = require('../dist/protos/topology_region_updated_pb');
const { TopologyDeploymentUpdatedMessage } = require('../dist/protos/topology_deployment_updated_pb');
const { ConfigureSAML } = require('../dist/protos/configure_saml_pb');
const { UserLoginMessage } = require('../dist/protos/user_login_pb');
const { UserDeleted } = require('../dist/protos/user_deleted_pb');
const { AccountDeleted } = require('../dist/protos/account_deleted_pb');
const { IdeaCommentedMessage } = require('../dist/protos/idea_commented_pb');
const { AccountPackageUpdated } = require('../dist/protos/account_package_updated_pb')

module.exports = {
	'account-updated': AccountUpdatedMessage,
	'account-package-updated': AccountPackageUpdated,
	'user-updated': UserUpdatedMessage,
	'signup-account': SignupAccountRequest,
	'signup-account-success': AccountSignupCompleted,
	'reset-password': ResetPasswordRequest,
	'send-email': SendEmailRequest,
	'idea-roadmap-item-attach': IdeaRoadmapItemAttachMessage,
	'idea-roadmap-item-detach': IdeaRoadmapItemDetachMessage,
	'invite-user': InviteUserRequest,
	'customers-csv-ingestion': CustomersCSVIngestionMessage,
	'move-user': MoveUserRequest,
	'merge-account': MergeAccountRequest,
	'segment-event': SegmentEvent,
	'feedback-updated': FeedbackUpdatedMessage,
	'feedback-commented': FeedbackCommentedMessage,
	'product-area-owners-attached': ProductAreaOwnersAttachedMessage,
	'product-area-owners-detached': ProductAreaOwnersDetachedMessage,
	'user-auth-updated': UserAuthUpdatedRequest,
	'user-email-updated': UserEmailUpdatedMessage,
	'user-logout': UserLogout,
	'user-login': UserLoginMessage,
	'topology-region-upated': TopologyRegionUpdatedMessage,
	'topology-deployment-upated': TopologyDeploymentUpdatedMessage,
	'configure-saml': ConfigureSAML,
	'user-deleted': UserDeleted,
	'account-deleted': AccountDeleted,
	'idea-commented': IdeaCommentedMessage
}
