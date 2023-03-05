/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');

module.exports = {
	entry: './src/index.ts',
	mode: 'production',
	module: {
		rules: [
			{
				test: /\.tsx?$/,
				use: 'ts-loader',
				exclude: /node_modules/,
			},
		],
	},
	resolve: {
		extensions: ['.tsx', '.ts', '.js'],
	},
	output: {
		filename: 'type-math.js',
		path: path.resolve(__dirname, 'lib'),
		library: 'TypeMath',
		libraryTarget: 'umd',
	},
};