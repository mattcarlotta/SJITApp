const MiniCssExtractPlugin = require("mini-css-extract-plugin").loader;
const { imagesFolder, fontsFolder, localCSS } = require("./paths");
const { inDevelopment, localIdentName } = require("./envs");

// =============================================================== //
// WEBPACK RULES                                                   //
// =============================================================== //

/* defines a javascript rule */
const jsRule = ({ enforce, loader, options }) => ({
	enforce: enforce || "post",
	test: /\.(js|jsx)$/,
	loader,
	exclude: /(node_modules)/,
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

/* webpack module rules */
const rules = [
	/* lints JS files on compilation */
	jsRule({
		enforce: "pre",
		loader: "eslint-loader",
		options: {
			emitWarning: inDevelopment,
		},
	}),
	/* handle React JS files */
	jsRule({
		loader: "babel-loader",
		options: {
			cacheDirectory: inDevelopment,
			cacheCompression: false,
		},
	}),
	/* handle image assets */
	mediaRule({
		test: /\.(png|jpg|gif|svg)$/,
		outputPath: imagesFolder,
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
