module.exports = {
	plugins: [
			"plugins/markdown"
	],
	recurseDepth: 10,
	source: {
			include: ["src", "tutorials"],
			exclude: ["__tests__", "node_modules"]
	},
	sourceType: module,
	tags: {
			allowUnknownTags: true,
			dictionaries: ["jsdoc","closure"]
	},
	templates: {
			cleverLinks: false,
			monospaceLinks: false
	},
	opts: {
			template: "./node_modules/better-docs",
			tutorials: './tutorials',
			readme: './README.md',
			destination: './docs'
	}
}
