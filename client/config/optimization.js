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
let optimization = {};
if (!inDevelopment) {
	optimization = {
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
		splitChunks: {
			chunks: "all",
		},
		runtimeChunk: true,
	};
}

module.exports = optimization;
