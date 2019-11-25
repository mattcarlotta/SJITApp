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
					// We want terser to parse ecma 8 code. However, we don't want it
					// to apply any minification steps that turns valid ecma 5 code
					// into invalid ecma 5 code. This is why the 'compress' and 'output'
					// sections only apply transformations that are ecma 5 safe
					// https://github.com/facebook/create-react-app/pull/4234
					ecma: 8,
				},
				compress: {
					ecma: 5,
					warnings: false,
					// Disabled because of an issue with Uglify breaking seemingly valid code:
					// https://github.com/facebook/create-react-app/issues/2376
					// Pending further investigation:
					// https://github.com/mishoo/UglifyJS2/issues/2011
					comparisons: false,
					// Disabled because of an issue with Terser breaking valid code:
					// https://github.com/facebook/create-react-app/issues/5250
					// Pending further investigation:
					// https://github.com/terser-js/terser/issues/120
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
			parallel: true,
			cache: true,
			sourceMap: false,
		}),
		/* compile and optimize SCSS to CSS */
		new OptimizeCSSAssetsPlugin(cssProcessorOptions),
	],
	/* keep run time chunk to a single chunk */
	runtimeChunk: "single",
	splitChunks: {
		/* split all chunks if possible */
		chunks: "all",
		maxInitialRequests: Infinity,
		minSize: 0,
		/* group chunks by vendor to reduce large chunking */
		cacheGroups: {
			antdVendor: {
				test: /[\\/]node_modules[\\/](antd|@ant-design|rc-calendar|rc-select|rc-trigger|rc-time-picker|rc-drawer|rc-tabs|rc-pagination|rc-table|rc-animate|rc-resize-observer|rc-tooltip|rc-form|rc-checkbox|rc-dropdown|rc-menu|rc-align|rc-collpase|rc-util)[\\/]/,
				name: "antd",
			},
			reactVendor: {
				test: /[\\/]node_modules[\\/](react|react-dom|connected-react-router|react-router-dom|react-helmet|react-redux|redux|@redux-saga|redux-state-sync|react-router)[\\/]/,
				name: "react",
			},
			lodash: {
				test: /[\\/]node_modules[\\/](lodash)[\\/]/,
				name: "lodash",
			},
			froalaVendor: {
				test: /[\\/]node_modules[\\/](react-quill)[\\/]/,
				name: "quill",
			},
			chartingVendor: {
				test: /[\\/]node_modules[\\/](@nivo|d3-color|d3-time-format|d3-scale|d3-time|d3-scale-chromatic|d3-format|d3-hierarchy|d3-array|d3-interpolate|d3-shape)[\\/]/,
				name: "charting",
			},
			momentVendor: {
				test: /[\\/]node_modules[\\/](moment|moment-timezone)[\\/]/,
				name: "moment",
			},
		},
	},
};

module.exports = optimization;
