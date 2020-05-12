function createHandlers() {

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

    async function handleMessage(message) {
        
    }
    return {
        onError,
        onProcessingError,
    }
}

let subscriptions = new Set()

function createOn({Consumer, eventMap, region, account, service, deployment}) {
    const {
        onError,
        onProcessingError,
    } = createHandlers()

    function On(event, callback) {
        if( subscriptions.has(event) ) {
            console.error(`Can only listen to an event once. Create a new SQS queue to listen to the same event.`)
            return false;
        }

        const queueUrl = `https://sqs.${region}.amazonaws.com/${account}/${service}-${deployment}-${event}`
        const app = Consumer.create({
            queueUrl
        })
    }
}