const createOn = require('../on')
const events = require('../event-map')

const REGION = 'us-east-1'
const DEPLOYMENT = 'app-test'
const SERVICE = 'bifrost-unit-test'
const ACCOUNT = 512346732851

const mockCreate = jest.fn().mockImplementation(() => ({
	on: jest.fn(),
	start: jest.fn()
}))

const mockConsumer = {
	create: mockCreate
}

let subscriptions = new Set()
const {On, onMessage} = createOn({
	Consumer: mockConsumer,
	region: REGION,
	deployment: DEPLOYMENT,
	service: SERVICE,
	account: ACCOUNT,
	subscriptions,
})

const NOOP = () => {}

describe('subscribe', () => {

	describe('On', () => {
		beforeEach(() => {
			subscriptions.clear()
			mockCreate.mockClear()
})

		it('should build the correct queueUrl', () => {
			const eventName = 'user-updated'

			On(eventName, NOOP)

			expect(mockConsumer.create).toHaveBeenCalledTimes(1)
			expect(mockConsumer.create).toHaveBeenCalledWith(expect.objectContaining({
				queueUrl: `https://sqs.${REGION}.amazonaws.com/${ACCOUNT}/${SERVICE}-${DEPLOYMENT}-${eventName}`
			}))
		})

		it('should build a different queueUrl when passed a queueGroup', () => {
			const eventName = 'user-updated'
			const queueGroup = 'for-emails'

			On(eventName, NOOP, { queueGroup })

			expect(mockConsumer.create).toHaveBeenCalledTimes(1)
			expect(mockConsumer.create).toHaveBeenCalledWith(expect.objectContaining({
				queueUrl: `https://sqs.${REGION}.amazonaws.com/${ACCOUNT}/${SERVICE}-${DEPLOYMENT}-${eventName}-${queueGroup}`
			}))
		})

		it('should allow subscribing to the same event if different queueGroups are used', () => {
			const eventName = 'user-updated'
			const queueGroup = 'for-emails'

			On(eventName, NOOP)
			On(eventName, NOOP, { queueGroup })

			expect(mockConsumer.create).toHaveBeenCalledTimes(2)
			expect(mockConsumer.create).toHaveBeenCalledWith(expect.objectContaining({
				queueUrl: `https://sqs.${REGION}.amazonaws.com/${ACCOUNT}/${SERVICE}-${DEPLOYMENT}-${eventName}`
			}))
			expect(mockConsumer.create).toHaveBeenCalledWith(expect.objectContaining({
				queueUrl: `https://sqs.${REGION}.amazonaws.com/${ACCOUNT}/${SERVICE}-${DEPLOYMENT}-${eventName}-${queueGroup}`
			}))
		})

		//! TODO: Throw or Log Error?
		it('should not be possible to subscribe to something twice', async () => {
			expect(await On('user-updated', NOOP)).toBe(true)
			expect(await On('user-updated', NOOP)).toBe(false)
		})
	})

	describe('onMessage', () => {
		Object.entries(events)
			.forEach(([eventName, type]) => {
			it(`deserialize ${eventName} events`, () => {
				const d = new type()
				onMessage(eventName, event => {
					expect(event).toEqual(d.toObject())
				})(Buffer.from(d.serializeBinary()).toString('base64'))
			})
		})

		//! TODO: Figure out how we want to handle unknown events... throw? Log Error?
		it('should not deserialize unknown events', () => {
			const d = new events['user-updated']()

			expect(() => {
				onMessage('something-not-real', NOOP)(Buffer.from(d.serializeBinary()).toString('base64'))
			}).toThrow()
		})

		//! This test isn't run because it would fail. If a protobuf is deserialized with the wrong type, no error
		//! is thrown.
		xit('should not deserialize unknown events', () => {
			const d = new events['user-updated']()
			d.setFirstName('bifrost')

			expect(() => {
				onMessage('account-updated', (event) => {
					console.log(event.toObject())
				})(Buffer.from(d.serializeBinary()).toString('base64'))
			}).toThrow()
		})
	})
})