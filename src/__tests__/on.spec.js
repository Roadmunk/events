const createOn = require('../on')
const events = require('../event-map')

const REGION = 'us-east-1'
const DEPLOYMENT = 'app-test'
const SERVICE = 'bifrost-unit-test'
const ACCOUNT = 512346732851

const mockConsumer = {
	create: jest.fn().mockImplementation(() => ({
		on: jest.fn(),
		start: jest.fn()
	}))
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

describe('subscribe', () => {

	describe('On', () => {
		it('should build the correct queueUrl', () => {
			On('user-updated')

			expect(mockConsumer.create).toHaveBeenCalledTimes(1)
			expect(mockConsumer.create).toHaveBeenCalledWith(expect.objectContaining({
				queueUrl: `https://sqs.${REGION}.amazonaws.com/${ACCOUNT}/${SERVICE}-${DEPLOYMENT}-${'user-updated'}`
			}))
		})

		//! TODO: Throw or Log Error?
		it('should not be possible to subscribe to something twice', async () => {
			subscriptions.clear()
			expect(await On('user-updated', () => {})).toBe(true)
			expect(await On('user-updated', () => {})).toBe(false)
		})
	})

	describe('onMessage', () => {
		Object.entries(events)
			.forEach(([eventName, type]) => {
			it(`deserialize ${eventName} events`, () => {
				const d = new type()
				
				onMessage(eventName, event => {
					expect(event).toBeInstanceOf(type)
				})(Buffer.from(d.serializeBinary()).toString('base64'))
			})
		})

		//! TODO: Figure out how we want to handle unknown events... throw? Log Error?
		it('should not deserialize unknown events', () => {
			const d = new events['user-updated']()

			onMessage('something-not-real', event => {
				expect(event).toBe('asd')
			})(Buffer.from(d.serializeBinary()).toString('base64'))
		})
	})
})