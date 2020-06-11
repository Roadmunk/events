module.exports = {
	extends : [
		'./node_modules/@roadmunk/eslint-config-roadmunk/index.js',
	],
	parserOptions : {
		ecmaVersion : 2018, // Allows for the parsing of modern ECMAScript features
		sourceType  : 'module', // Allows for the use of imports
	},
	env : {
		node : true,
		jest : true,
	},
};
