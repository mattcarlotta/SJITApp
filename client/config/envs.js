const moment = require("moment-timezone");
const { version } = require("../package.json");

const { ANALZYER, APIPORT, NODE_ENV, NODE_ENV_DEV, PORT } = process.env;

const inDevelopment = NODE_ENV === "development";
const inStaging = NODE_ENV_DEV === "staging";
const baseURL =
	inDevelopment || inStaging
		? `http://localhost:${APIPORT}/api/`
		: "https://sjsiceteam.com/api/";

const buildTimeStamp = moment()
	.tz("America/Los_Angeles")
	.format();

module.exports = {
	analzye: ANALZYER,
	APIPORT, // current API port
	baseURL, // current API url
	buildTimeStamp, // current build
	buildVersion: version, // current version
	currentDirectory: process.cwd(), // current working directory
	inDevelopment, // current environment
	inStaging,
	localIdentName: "[local]___[hash:base64:5]", // how class names will be defined in the DOM
	NODE_ENV,
	PORT, // application's current port
};
