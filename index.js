const AWS           = require('aws-sdk');
const events        = require('./src/event-map');
const env           = require('./src/config');
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

AWS.config.update({ region : env.region });

const { On }      = createOn({ ...env });
const { Publish } = createPublish({ ...env });
module.exports    = {
	...eventNameMappings,
	...eventTypeMappings,
	On,
	Publish,
	createOn,
	createPublish,
};
