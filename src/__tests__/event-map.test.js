const fs       = require('fs');
const { join } = require('path');
const events   = require('../event-map');

describe('event-map', () => {
	it('should contain the correct number of events', () => {
		const protos = fs.readdirSync(join(__dirname, '..', '..', 'protos'));
		expect(Object.keys(events)).toHaveLength(protos.length);
	});

	it('should have compiled all protobufs', () => {
		const dist   = fs.readdirSync(join(__dirname, '..', '..', 'dist', 'protos'));
		const protos = fs.readdirSync(join(__dirname, '..', '..', 'protos'));
		expect(dist).toHaveLength(protos.length);
	});
});
