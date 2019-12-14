const MiniCssExtractPlugin = require("mini-css-extract-plugin").loader;
const { fontsFolder, localCSS } = require("./paths");
const {
	inDevelopment,
	inProduction,
	inStaging,
	localIdentName,
} = require("./envs");

// =============================================================== //
// WEBPACK RULES                                                   //
// =============================================================== //

/* defines a javascript rule */
const jsRule = ({ enforce, exclude, loader, options }) => ({
	enforce: enforce || "post",
	test: /\.(js|jsx)$/,
	loader,
	exclude,
	options: options || {},
});

/* defines a media (font/image) rule */
const mediaRule = ({ test, outputPath }) => ({
	test,
	use: [
		{
			loader: "file-loader",
			options: {
				outputPath,
			},
		},
	],
});

/* defines a SCSS rule */
const cssRule = ({ include, exclude, modules, sourceMap, test }) => ({
	test,
	include,
	exclude,
	use: [
		inDevelopment ? "style-loader" : MiniCssExtractPlugin,
		{
			loader: "css-loader",
			options: {
				sourceMap: sourceMap || !inDevelopment,
				modules: {
					mode: modules ? "local" : "global",
					localIdentName,
				},
				localsConvention: "camelCase",
			},
		},
		"sass-loader",
	],
});

const cssRegex = /\.css$/;
const cssModuleRegex = /\.module\.css$/;
const sassRegex = /\.(scss|sass)$/;
const sassModuleRegex = /\.module\.(scss|sass)$/;

/*
/node_modules\/(?!(@nivo|d3-color|d3-time-format|d3-scale|d3-time|d3-scale-chromatic|d3-format|d3-hierarchy|d3-array|d3-interpolate|d3-shape))/
*/

/* webpack module rules */
const rules = [
	/* lints JS files on compilation */
	jsRule({
		enforce: "pre",
		loader: "eslint-loader",
		exclude: /(node_modules)/,
		options: {
			emitWarning: inDevelopment,
		},
	}),
	/* handle React JS files */
	jsRule({
		loader: "babel-loader",
		exclude:
			inProduction || inStaging
				? /node_modules\/(?!(d3-scale))/
				: /(node_modules)/,
		options: {
			cacheDirectory: inDevelopment,
			cacheCompression: false,
		},
	}),
	/* handle font assets */
	mediaRule({
		test: /\.(woff2|ttf|woff|eot)$/,
		outputPath: fontsFolder,
	}),
	cssRule({
		test: cssRegex,
		exclude: cssModuleRegex,
	}),
	cssRule({
		test: cssModuleRegex,
		include: [localCSS],
		modules: true,
	}),
	cssRule({
		test: sassRegex,
		exclude: sassModuleRegex,
	}),
	cssRule({
		test: sassModuleRegex,
		include: [localCSS],
		modules: true,
	}),
];

module.exports = rules;
