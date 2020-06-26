const events = require('../event-map');

const mockInvoke    = jest.fn().mockImplementation(() => ({ promise : () => new Promise(resolve => resolve()) }));
const createPublish = require('../publish');

const mockDate = {
	now : () => 1000,
};

const REGION         = 'us-east-1';
const LAMBDA_TO_CALL = `event-bus-filter_${REGION}`;
const DEPLOYMENT     = 'app-test';
const SERVICE        = 'bifrost-unit-test';

const { publish } = createPublish({
	date       : mockDate,
	service    : SERVICE,
	deployment : DEPLOYMENT,
	region     : REGION,
}, {
	invoke : mockInvoke,
});

describe('publish', () => {

	beforeEach(() => {
		mockInvoke.mockClear();
	});

	Object.entries(events)
		.map(([ eventName, type ]) => {
			it(`properly work with ${eventName}`, async () => {
				const data = new type();

				await publish(data);

				expect(mockInvoke).toHaveBeenCalledTimes(1);
				expect(mockInvoke).toHaveBeenCalledWith({
					FunctionName   : LAMBDA_TO_CALL,
					InvocationType : 'Event',
					Payload        : JSON.stringify({
						EventName        : eventName,
						EventTypeVersion : 'v1',
						Data             : Buffer.from(data.serializeBinary()).toString('base64'),
						DateTime         : '1',
						Deployment       : DEPLOYMENT,
						Region           : REGION,
						Service          : SERVICE,
					}),
				});
			});
		});
});
