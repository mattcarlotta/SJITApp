const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const { inDevelopment } = require("./envs");

// =============================================================== //
// WEBPACK OPTIMATIZATIONS                                         //
// =============================================================== //

const cssProcessorOptions = !inDevelopment
	? { cssProcessorOptions: { map: { inline: false, annotation: true } } }
	: {};

/* webpack compiler optimizations */
const optimization = {
	minimize: !inDevelopment,
	minimizer: [
		new TerserPlugin({
			terserOptions: {
				parse: {
					ecma: 8,
				},
				compress: {
					ecma: 5,
					warnings: false,
					comparisons: false,
					inline: 2,
				},
				mangle: {
					safari10: true,
				},
				output: {
					ecma: 5,
					comments: false,
					ascii_only: true,
				},
			},
			parallel: false,
			cache: true,
			sourceMap: false,
		}),
		/* compile and optimize SCSS to CSS */
		new OptimizeCSSAssetsPlugin(cssProcessorOptions),
	],
	runtimeChunk: "single",
	splitChunks: {
		chunks: "all",
		maxInitialRequests: Infinity,
		minSize: 0,
		cacheGroups: {
			reactVendor: {
				test: /[\\/]node_modules[\\/](react|react-dom|connected-react-router|react-router-dom|react-helmet|react-redux|redux|redux-saga|redux-state-sync)[\\/]/,
				name: "reactVendor",
			},
			reactDNDVendor: {
				test: /[\\/]node_modules[\\/](react-beautiful-dnd)[\\/]/,
				name: "reactDNDVendor",
			},
			reactFroalaVendor: {
				test: /[\\/]node_modules[\\/](react-froala-wysiwyg|froala-editor)[\\/]/,
				name: "reactFroalaVendor",
			},
			chartingVendor: {
				test: /[\\/]node_modules[\\/](@nivo)[\\/]/,
				name: "chartingVendor",
			},
			utilityVendor: {
				test: /[\\/]node_modules[\\/](lodash|moment|moment-timezone)[\\/]/,
				name: "utilityVendor",
			},
			antdVendor: {
				test: /[\\/]node_modules[\\/](antd|@ant-design)[\\/]/,
				name: "antdVendor",
			},
			vendor: {
				test: /[\\/]node_modules[\\/](!lodash)(!moment)(!moment-timezone)[\\/]/,
				name: "vendor",
			},
		},
	},
};

module.exports = optimization;
