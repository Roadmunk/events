const eventMap = require('./event-map')

function createActions() {
	function getEventName(data) {
		const [name] = Object.entries(eventMap)
			.find(([name, type]) => data instanceof type)

		return name
	}

	function serialize(data) {
		const serialized = data.serializeBinary();
		return Buffer.from(serialized).toString('base64')
	}

	return {
		getEventName,
		serialize
	}
}

function createPublish({lambda, functionName, deployment, region, service, date = Date}) {
	const {getEventName, serialize} = createActions()

	async function Publish(event) {
		const eventName = getEventName(event)

		const params = {
			FunctionName: functionName,
			InvocationType: 'RequestResponse',
			Payload: {
				EventName: eventName,
				EventTypeVersion: 'v1',
				Data : serialize(event),
				DateTime : Math.floor(date.now() / 1000).toString(),
				Deployment : deployment,
				Region : region,
				Service : service,
			}
		}

		await lambda.invoke(params).promise()
	}

	return {
		Publish,
		getEventName
	}
}

module.exports = createPublish