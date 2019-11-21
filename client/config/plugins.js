const { DefinePlugin, HotModuleReplacementPlugin } = require("webpack");
const { GenerateSW } = require("workbox-webpack-plugin");
const InlineChunkHtmlPlugin = require("react-dev-utils/InlineChunkHtmlPlugin");
const ErrorOverlayPlugin = require("error-overlay-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const FriendlyErrorsWebpackPlugin = require("friendly-errors-webpack-plugin");
const WebpackBar = require("webpackbar");
const ManifestPlugin = require("webpack-manifest-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const GitRevisionPlugin = require("git-revision-webpack-plugin");
const { cssFolder, faviconPath, publicPath, templatePath } = require("./paths");
const {
	APIPORT,
	baseURL,
	buildTimeStamp,
	buildVersion,
	inDevelopment,
	NODE_ENV,
	PORT,
} = require("./envs");

const gitStatsPlugin = new GitRevisionPlugin({
	commithashCommand: "rev-parse --short HEAD",
	versionCommand: "rev-list HEAD --count",
});

// =============================================================== //
// WEBPACK PLUGINS                                                 //
// =============================================================== //

/* friendly errors console notes */
const notes = inDevelopment
	? [`Note that the development build is not optimized.`]
	: [
			`Note that this mode is for development and staging purposes only.`,
			`Please use a suitable server-side solution to serve the build folder.`,
	  ];

notes.push(
	`To create a production build, use \x1b[1m\x1b[32myarn build\x1b[0m.\n`,
);

module.exports = () => {
	/* common webpack plugins */
	const plugins = [
		/* shows current build stats */
		gitStatsPlugin,
		/* shows a compilation bar instead of the default compile message */
		new WebpackBar({
			color: "#268bd2",
			minimal: false,
			compiledIn: false,
		}),
		/* simplifies creation of HTML files to serve your webpack bundles */
		new HtmlWebpackPlugin({
			template: templatePath,
			favicon: faviconPath,
		}),
		/* in console error */
		new FriendlyErrorsWebpackPlugin({
			compilationSuccessInfo: {
				messages: [
					`Your application is running on \x1b[1mhttp://localhost:${PORT}\x1b[0m`,
				],
				notes,
			},
			clearConsole: true,
		}),
		new DefinePlugin({
			"process.env": {
				APIPORT: JSON.stringify(APIPORT),
				NODE_ENV: JSON.stringify(NODE_ENV),
				PORT: JSON.stringify(PORT),
				baseURL: JSON.stringify(baseURL),
				buildTimeStamp: JSON.stringify(buildTimeStamp),
				buildVersion: JSON.stringify(buildVersion),
				commitCount: JSON.stringify(gitStatsPlugin.version()),
				commitHash: JSON.stringify(gitStatsPlugin.commithash()),
			},
		}),
		/* generates an manifest for all assets */
		new ManifestPlugin({
			fileName: "asset-manifest.json",
			publicPath,
			generate: (seed, files) => {
				const manifestFiles = files.reduce(function(manifest, file) {
					manifest[file.name] = file.path;
					return manifest;
				}, seed);

				return {
					files: manifestFiles,
				};
			},
		}),
	];

	/* development webpack plugins */
	if (inDevelopment) {
		plugins.push(
			/* in browser error overlay */
			new ErrorOverlayPlugin(),
			/* hot-module plugin to update files without refreshing the page */
			new HotModuleReplacementPlugin(),
		);
	} else {
		/* production webpack plugins */
		plugins.push(
			/* compiles SCSS to a single CSS file */
			new InlineChunkHtmlPlugin(HtmlWebpackPlugin, [/runtime/]),
			new GenerateSW({
				swDest: "sw.js",
				clientsClaim: true,
				exclude: [
					/\.map$/,
					/\.js$/,
					/asset-manifest\.json$/,
					/\.(?:png|jpg|jpeg|svg)$/,
				],
				runtimeCaching: [
					{
						urlPattern: /\.(?:png|jpg|jpeg|svg|tff)$/,
						handler: "CacheFirst",
						options: {
							cacheName: "media",
							expiration: {
								maxEntries: 65,
							},
						},
					},
				],
				importWorkboxFrom: "cdn",
				navigateFallback: "/index.html",
				navigateFallbackBlacklist: [
					// Exclude URLs starting with /_, as they're likely an API call
					new RegExp("^/_"),
					// Exclude any URLs whose last part seems to be a file extension
					// as they're likely a resource and not a SPA route.
					// URLs containing a "?" character won't be blacklisted as they're likely
					// a route with query params (e.g. auth callbacks).
					new RegExp("/[^/?]+\\.[^/]+$"),
				],
			}),
			new MiniCssExtractPlugin({
				filename: `${cssFolder}/[name].[contenthash:8].css`,
				chunkFilename: `${cssFolder}/[id].[contenthash:8].css`,
			}),
			new CopyWebpackPlugin([{ from: "public/robots.txt" }]),
		);
	}

	return plugins;
};
