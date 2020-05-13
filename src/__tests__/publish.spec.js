const events = require('../event-map')

const mockInvoke = jest.fn().mockImplementation(() => ({ promise : () => new Promise(resolve => resolve()) }));
const createPublish = require('../publish')

const mockDate = {
	now : () => 1000
}

const LAMBDA_TO_CALL = 'us-east-1-event-bus'
const REGION = 'us-east-1'
const DEPLOYMENT = 'app-test'
const SERVICE = 'bifrost-unit-test'

const {Publish} = createPublish({
	lambda: {
		invoke: mockInvoke
	},
	functionName: LAMBDA_TO_CALL,
	date: mockDate,
	service: SERVICE,
	deployment: DEPLOYMENT,
	region: REGION
})

describe('publish', () => {

	beforeEach(() => {
		mockInvoke.mockClear()
	})
	Object.entries(events)
	.map( ([eventName, type]) => {
		it(`properly work with ${eventName}`, async () => {
			const data = new type()

			await Publish(data)

			expect(mockInvoke).toHaveBeenCalledTimes(1)
			expect(mockInvoke).toHaveBeenCalledWith({
				FunctionName: LAMBDA_TO_CALL,
				InvocationType: 'RequestResponse',
				Payload: {
					Data : Buffer.from(data.serializeBinary()).toString('base64'),
					DateTime : '1',
					Deployment: DEPLOYMENT,
					EventName: eventName,
					EventTypeVersion: "v1",
					Region: REGION,
					Service: SERVICE,
				}
			})
		})
	})
})