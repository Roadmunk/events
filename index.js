const events        = require('./src/event-map');
const createOn      = require('./src/on');
const createPublish = require('./src/publish');

const eventNameMappings = Array.from(Object.keys(events))
	.reduce((map, key) => {
		map[key.replace(new RegExp('-', 'g'), '_').toUpperCase()] = key;
		return map;
	}, {});

const eventTypeMappings = Object.keys(events)
	.reduce((results, key) => {
		const newKey = key.split('-')
			.map(el => el[0].toUpperCase() + el.slice(1))
			.join('');

		results[newKey] = events[key];
		return results;
	}, {});

module.exports = {
	...eventNameMappings,
	...eventTypeMappings,
	createOn,
	createPublish,
};
