const path = require('path');

module.exports = (env) => {
	return {
		resolve: {
			extensions: ['.ts', '.tsx', '.js', '.json'],
			modules: [path.join(__dirname, '..', 'src'), path.join(__dirname, '..', 'node_modules')]
		},
		entry: path.join(__dirname, '..', 'src', 'index.tsx'),
		output: {
			path: path.join(__dirname, '..', '..', 'wwwroot', 'dist'),
			filename: '[name].js',
			clean: true
		},
		module: {
			rules: [
				{
					test: /\.js$/,
					enforce: 'pre',
					use: ['source-map-loader'],
					exclude: /(node-modules)/
				},
				{
					test: /\.tsx?$/,
					exclude: /(node_modules)/,
					loader: 'ts-loader'
				},
				{ test: /\.(png|jpe?g|gif|svg)$/i, type: 'asset/inline' },
				{ test: /\.(woff|woff2|eot|ttf|otf)$/i, type: 'asset/resource' }
			]
		},
		stats: {
			hash: false,
			entrypoints: false,
			modules: false
		},
		optimization: {
			runtimeChunk: 'single',
			splitChunks: {
				cacheGroups: {
					vendors: {
						name: 'vendors',
						test: /[\\/]node_modules[\\/]/,
						chunks: 'all',
						minChunks: 2,
						priority: 1
					},
					react: {
						name: 'react',
						test: /[\\/]node_modules[\\/]react.*?[\\/]/,
						chunks: 'all',
						minChunks: 1,
						priority: 2
					},
					material: {
						name: 'material',
						test: /[\\/]node_modules[\\/]@mui.*?[\\/]/,
						chunks: 'all',
						minChunks: 1,
						priority: 3
					}
				}
			}
		}
	};
};
