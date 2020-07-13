const AWS      = require('aws-sdk');
const eventMap = require('./event-map');

/**
 * Creates all actions for the publish function
 */
function createActions() {
	/**
	 * Accepts a protobuf and figures out which event name to fire with it
	 *
	 * @param {Object} data A protobuf
	 *
	 * @returns {String} The name of the event
	 */
	function getEventName(data) {
		const [ name ] = Object.entries(eventMap)
			.find(([ , type ]) => data instanceof type);

		return name;
	}

	/**
	 * Accepts a protobuf and serializes into binary. Then it Base64 encodes it
	 *
	 * @param {data} data A protobuf
	 *
	 * @returns {String} A base64 encoded protobuf
	 */
	function serialize(data) {
		const serialized = data.serializeBinary();
		return Buffer.from(serialized).toString('base64');
	}

	return {
		getEventName,
		serialize,
	};
}

/**
 * Assembles the dependencies into the `Publish` function that is used for listening to events from PubSub
 *
 * @param {Object} config The injected dependencies
 *
 * @returns {Object} A reference to Publish and getEventNAme
 */
function createPublish({ awsCredentials, deployment, region, service, date = Date }) {
	if (!awsCredentials) {
		throw new Error('Missing expected arguments: awsCredentials');
	}

	if (!region) {
		throw new Error('Missing expected arguments: region');
	}

	const lambda = new AWS.Lambda({
		apiVersion  : '2015-03-31',
		credentials : awsCredentials,
		region,
	});

	const { getEventName, serialize } = createActions();

	/**
	 * Fires the event into the PubSub. `publish` will use type inference to figure out what event name to use.
	 * These line up with the events that can be imported. E.g calling `publish(userUpdatedMessage)` will be
	 * fired with `user-updated` event name. [The On function](/module-On.html) will listen for `user-updated` which will deserialize
	 * `userUpdatedMessage` in the callback.
	 *
   * Check out the {@tutorial publish-tutorial}
	 *
	 * @module Publish
	 * @param {Object} event An instance of a protobuf
	 *
	 * @returns {Promise<Object>} The results of a lambda call
	 */
	function publish(event) {
		const eventName = getEventName(event);

		const params = {
			FunctionName   : `event-bus-filter_${region}`,
			InvocationType : 'Event',
			Payload        : JSON.stringify({
				EventName        : eventName,
				EventTypeVersion : 'v1',
				Data             : serialize(event),
				DateTime         : Math.floor(date.now() / 1000).toString(),
				Deployment       : deployment,
				Region           : region,
				Service          : service,
			}),
		};

		return lambda.invoke(params).promise();
	}

	return {
		publish,
		getEventName,
	};
}

module.exports = createPublish;
