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
			antdVendor: {
				test: /[\\/]node_modules[\\/](antd|@ant-design|rc-calendar|rc-select|rc-trigger|rc-time-picker|rc-drawer|rc-tabs|rc-pagination|rc-table|rc-animate|rc-resize-observer|rc-tooltip|rc-form|rc-checkbox|rc-dropdown|rc-menu|rc-align|rc-collpase|rc-util)[\\/]/,
				name: "antd",
			},
			// 	rcVendor: {
			// 		test: /[\\/]node_modules[\\/]()[\\/]/,
			// 		name: "rc",
			// 	},
			reactVendor: {
				test: /[\\/]node_modules[\\/](react|react-dom|connected-react-router|react-router-dom|react-helmet|react-redux|redux|@redux-saga|redux-state-sync|react-router)[\\/]/,
				name: "react",
			},
			// 	reactDNDVendor: {
			// 		test: /[\\/]node_modules[\\/](react-beautiful-dnd)[\\/]/,
			// 		name: "reactDND",
			// 	},
			froalaVendor: {
				test: /[\\/]node_modules[\\/](react-froala-wysiwyg|froala-editor)[\\/]/,
				name: "froala",
			},
			chartingVendor: {
				test: /[\\/]node_modules[\\/](@nivo|d3-color|d3-time-format|d3-scale|d3-time|d3-scale-chromatic|d3-format|d3-hierarchy|d3-array|d3-interpolate|d3-shape)[\\/]/,
				name: "charting",
			},
			// 	lodashVendor: {
			// 		test: /[\\/]node_modules[\\/](lodash|lodash.get|lodash.throttle|lodash.debounce)[\\/]/,
			// 		name: "lodash",
			// 	},
			momentVendor: {
				test: /[\\/]node_modules[\\/](moment|moment-timezone)[\\/]/,
				name: "moment",
			},
			// 	reactMotionVendor: {
			// 		test: /[\\/]node_modules[\\/](react-motion)[\\/]/,
			// 		name: "animation",
			// 	},
			// 	vendor: {
			// 		test: /[\\/]node_modules[\\/](!lodash)(!moment)(!moment-timezone)[\\/]/,
			// 		name: "vendor",
			// 	},
		},
	},
};

module.exports = optimization;
