const eventMap = require('./event-map')

/**
 * Creates all actions for the On function
 */
function createActions() {

    /**
     * Deserializes event data
     * 
     * @param {String} eventName The name of the event being fired
     * @param {String} data Base64 encoded binary for the event protobuf
     */
    function deserialize(eventName, data) {
        console.log(eventName);
        
        const bytes = Buffer.from(data || '==', 'base64')
        return eventMap[eventName].deserializeBinary(bytes)
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
    }) {
        // return `https://sqs.${region}.amazonaws.com/${account}/${service}-${deployment}-${eventName}`
        return `https://sqs.us-east-1.amazonaws.com/133556070500/test-consumer-queue-jared`
    }
    return {
        deserialize,
        buildQueueUrl
    }
}

/**
 * Creates all handlers with injected dependencies for the On function
 * 
 * @param {Object} config The injected dependencies
 * @param {Function} config.deserialize A function that will deserialize any known event based on the eventName 
 */
function createHandlers({deserialize}) {

    /**
     * Builds the error handler that is called if an error is thrown from an event handler
     * 
     * @param {String} eventName The name of the event that had an error
     */
    function onError(eventName) {
        return function (error) {
            console.error(`Error handling '${eventName}': `, { error })
        }
    }

    /**
     * Builds the processing error handler that is called if a processing error is thrown from an event handler
     * 
     * @param {String} eventName The name of the event that had a processing error
     */
    function onProcessingError(eventName) {
        return function (error) {
            console.error(`Error processing '${eventName}': `, { error })
        }
    }

    /**
     * Builds the onMessage handler that will be fired when an event occurs
     * 
     * @param {String} eventName The name of the event that had a processing error
     * @param {Function} cb The callback function that will be called when the event occurs
     */
    function onMessage(eventName, cb) {
        return function (message) {
            const data = deserialize(eventName, message.Body)
            cb(data.toObject())
        }
    }

    return {
        onError,
        onProcessingError,
        onMessage
    }
}

/**
 * Assembles the dependencies into the `On` function that is used for listening to events from PubSub
 * 
 * @param {Object} config The injected dependencies
 * 
 * @returns {Object} A reference to On and onMessage. 
 */
function createOn({Consumer, region, account, service, deployment, subscriptions = new Set()}) {
    const {
        deserialize,
        buildQueueUrl
    } = createActions()

    const {
        onError,
        onProcessingError,
        onMessage,
    } = createHandlers({deserialize})

    /**
     * On will take an event name and setup a listener for that event. It will automagically figure out the event type
     * and deserialize it into a plain old object. On handles retry automatically via thrown errors. If something 
     * occurs in your callback and you'd like to try again, simply throw an uncaught error. The event will be retried
     * after a configurable amount of time. If the event fails too many times, it can be sent to a dead letter queue
     * for additional analysis. 
     * 
     * Check out the {@tutorial on-tutorial}
     * 
     * ### Required Environment Variables
     * - REGION - This is the AWS region our service is operating in
     * - ACCOUNT - The AWS account number we are using
     * - DEPLOYMENT - The deployment we are part of
     * - SERVICE - The name of our service
     * 
     * @module On
     * @param {String} eventName The name of the event to listen for
     * @param {Function} callback The function to call when the event is received
     * @param {Object} config Optional configuration
     * @param {String} config.queueGroup Allows listening to the same event from multiple spots
     * 
     * @return {Promise<boolean>} true if the listener is setup, false if the listener failed to listen
     */
    async function On(eventName, callback, {queueGroup} = {}) {
        const key = queueGroup
            ? `${eventName}-${queueGroup}`
            : eventName

        if( subscriptions.has(key) ) {
            console.error(`Can only listen to an event once. Create a new SQS queue to listen to the same event.`)
            return false;
        }

        const queueUrl = buildQueueUrl({eventName: key, region, account, service, deployment})

        const app = Consumer.create({
            queueUrl,
            handleMessage: onMessage(eventName, callback)
        })

        app.on('error', onError(eventName))
        app.on('processing_error', onProcessingError(eventName))

        subscriptions.add(key)
        app.start()
        return true;
    }

    return {
        On,
        onMessage,
    }
}

module.exports = createOn