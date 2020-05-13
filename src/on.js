const eventMap = require('./event-map')

function createActions() {
    function deserialize(eventName, data) {
        const bytes = Buffer.from(data || '==', 'base64')
        return eventMap[eventName].deserializeBinary(bytes)
    }

    return {
        deserialize,    
    }
}

function createHandlers({deserialize}) {

    function onError(eventName) {
        return function (error) {
            console.error(`Error handling '${eventName}': `, { error })
        }
    }

    function onProcessingError(eventName) {
        return function (error) {
            console.error(`Error processing '${eventName}': `, { error })
        }
    }

    function onMessage(eventName, cb) {
        return function (message) {
            const data = deserialize(eventName, message.Body)
            cb(data)
        }
    }

    return {
        onError,
        onProcessingError,
        onMessage
    }
}

function createOn({Consumer, region, account, service, deployment, subscriptions = new Set()}) {
    const {
        deserialize
    } = createActions()

    const {
        onError,
        onProcessingError,
        onMessage,
    } = createHandlers({deserialize})

    async function On(eventName, callback) {
        if( subscriptions.has(eventName) ) {
            console.error(`Can only listen to an event once. Create a new SQS queue to listen to the same event.`)
            return false;
        }

        const queueUrl = `https://sqs.${region}.amazonaws.com/${account}/${service}-${deployment}-${eventName}`
        const app = Consumer.create({
            queueUrl,
            handleMessage: onMessage(eventName, callback)
        })

        app.on('error', onError(eventName))
        app.on('processing_error', onProcessingError(eventName))

        subscriptions.add(eventName)
        app.start()
        return true;
    }

    return {
        On,
        onMessage,
    }
}

module.exports = createOn