function createActions({eventMap}) {
    function deserialize(eventName, data) {
        const bytes = Buffer.from(data, 'base64')
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

    async function onMessage(cb) {
        return function (message) {
            console.log(`Message received: `, message)
            const data = deserialize(message.Body)
            cb(data)
        }
    }

    return {
        onError,
        onProcessingError,
        onMessage
    }
}

let subscriptions = new Set()

function createOn({Consumer, eventMap, region, account, service, deployment}) {
    const {
        deserialize
    } = createActions({eventMap})

    const {
        onError,
        onProcessingError,
        onMessage,
    } = createHandlers({deserialize})

    function On(eventName, callback) {
        if( subscriptions.has(eventName) ) {
            console.error(`Can only listen to an event once. Create a new SQS queue to listen to the same event.`)
            return false;
        }

        // const queueUrl = `https://sqs.${region}.amazonaws.com/${account}/${service}-${deployment}-${eventName}`
        const app = Consumer.create({
            queueUrl,
            handleMessage: onMessage(callback)
        })

        app.on('error', onError(eventName))
        app.on('processing_error', onProcessingError(eventName))

        subscriptions.add(eventName)
        app.start()
    }

    return {
        On
    }
}

module.exports = createOn