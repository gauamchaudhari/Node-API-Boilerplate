module.exports = {
	'env': {
		'browser': true,
		'commonjs': true,
		'es2021': true,
		'node': true, // Add node environment globally
		'es6': true
	},
	'extends': 'eslint:recommended',
	'parserOptions': {
		'ecmaVersion': 'latest',
		'sourceType': 'script'
	},
	'rules': {
		'linebreak-style': [
			'error',
			'unix'
		]
	},
	'overrides': [
		{
			'files': ['*.js'], // Apply to all JS files
			'env': {
				'node': true, // Ensure Node.js is recognized in JS files
				'es6': true
			}
		}
	]
};
