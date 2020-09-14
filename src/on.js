const AWS          = require('aws-sdk');
const { Consumer } = require('sqs-consumer');
const eventMap     = require('./event-map');

/**
 * Creates all actions for the on function
 */
function createActions() {

	/**
     * Deserializes event data
     *
     * @param {String} eventName The name of the event being fired
     * @param {String} data Base64 encoded binary for the event protobuf
     */
	function deserialize(eventName, data) {
		const bytes = Buffer.from(data || '==', 'base64');
		return eventMap[eventName].deserializeBinary(bytes);
	}

	/**
     * Builds an SQS Queue url
     *
     * @param {Object} config Holds base data required to create an SQS Queue url
     * @param {String} config.eventName The name of the event you are listening to
     * @param {String} config.region The region you are listening in
     * @param {String} config.account The AWS account id
     * @param {String} config.service The name of the service that is listening to the event
     * @param {String} config.deployment The deployment you are listening to
     * @param {String?} queueGroup Optional: If a service is listening to the same event in multiple places, this
     * field is required so we can handle retries if something fails
     */
	function buildQueueUrl({
		eventName,
		region,
		account,
		service,
		deployment,
		topology,
	}) {
		return `https://sqs.${region}.amazonaws.com/${account}/${service}-${topology}-${deployment}-${eventName}`;
	}
	return {
		deserialize,
		buildQueueUrl,
	};
}

/**
 * Creates all handlers with injected dependencies for the on function
 *
 * @param {Object} config The injected dependencies
 * @param {Function} config.deserialize A function that will deserialize any known event based on the eventName
 */
function createHandlers({ deserialize }) {

	/**
     * Builds the error handler that is called if an error is thrown from an event handler
     *
     * @param {String} eventName The name of the event that had an error
     */
	function onError(eventName) {
		return function(error) {
			console.error(`Error handling '${eventName}': `, { error });
		};
	}

	/**
     * Builds the processing error handler that is called if a processing error is thrown from an event handler
     *
     * @param {String} eventName The name of the event that had a processing error
     */
	function onProcessingError(eventName) {
		return function(error) {
			console.error(`Error processing '${eventName}': `, { error });
		};
	}

	/**
     * Builds the onMessage handler that will be fired when an event occurs
     *
     * @param {String} eventName The name of the event that had a processing error
     * @param {Function} cb The callback function that will be called when the event occurs
     */
	function onMessage(eventName, cb) {
		return function(message) {
			const data = deserialize(eventName, message.Body);
			cb(data.toObject());
		};
	}

	return {
		onError,
		onProcessingError,
		onMessage,
	};
}

/**
 * Assembles the dependencies into the `On` function that is used for listening to events from PubSub
 *
 * @param {Object} config The injected dependencies
 *
 * @returns {Object} A reference to On and onMessage.
 */
function createOn({ awsCredentials, region, service, account, deployment, topology, subscriptions = new Set() }, consumer = Consumer) {
	if (!awsCredentials) {
		throw new Error('Missing expected arguments: awsCredentials');
	}

	if (!region) {
		throw new Error('Missing expected arguments: region');
	}

	const {
		deserialize,
		buildQueueUrl,
	} = createActions();

	const {
		onError,
		onProcessingError,
		onMessage,
	} = createHandlers({ deserialize });

	const sqs = new AWS.SQS({
		credentials : awsCredentials,
		region,
	});

	/**
     * On will take an event name and setup a listener for that event. It will automagically figure out the event type
     * and deserialize it into a plain old object. On handles retry automatically via thrown errors. If something
     * occurs in your callback and you'd like to try again, simply throw an uncaught error. The event will be retried
     * after a configurable amount of time. If the event fails too many times, it can be sent to a dead letter queue
     * for additional analysis.
     *
     * Check out the {@tutorial on-tutorial}
     *
     * @module On
     * @param {String} eventName The name of the event to listen for
     * @param {Function} callback The function to call when the event is received
     * @param {Object} config Optional configuration
     * @param {String} config.queueGroup Allows listening to the same event from multiple spots
     *
     * @return {Promise<boolean>} true if the listener is setup, false if the listener failed to listen
     */
	async function on(eventName, callback, { queueGroup } = {}) {
		const key = queueGroup
			? `${eventName}-${queueGroup}`
			: eventName;

		if (subscriptions.has(key)) {
			console.error('Can only listen to an event once. Create a new SQS queue to listen to the same event.');
			throw Error('Cannot subscribe to the same event multiple times. Check out how to add a queueGroup in the docs.');
		}

		const queueUrl = buildQueueUrl({ eventName : key, region, account, service, deployment, topology });

		console.log(`Listener setup for ${queueUrl}`);

		const app = consumer.create({
			queueUrl,
			handleMessage : onMessage(eventName, callback),
			sqs,
		});

		app.on('error', onError(eventName));
		app.on('processing_error', onProcessingError(eventName));

		subscriptions.add(key);
		app.start();
		return true;
	}

	return {
		on,
		onMessage,
	};
}

module.exports = createOn;
