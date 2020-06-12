require('dotenv').config();

module.exports = {
	region     : process.env.REGION,
	deployment : process.env.DEPLOYMENT,
	account    : {
		production  : '',
		development : '133556070500',
	},
	service : process.env.SERVICE,
};
