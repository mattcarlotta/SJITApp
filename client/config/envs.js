// =============================================================== //
// ENVS                                                            //
// =============================================================== //

const { APIPORT, NODE_ENV, NODE_ENV_DEV, PORT } = process.env;

const inDevelopment = NODE_ENV === "development";
const inStaging = NODE_ENV_DEV === "staging";
const baseURL =
	inDevelopment || inStaging
		? `http://localhost:${APIPORT}/api/`
		: "https://sjsiceteam.com/api/";

module.exports = {
	APIPORT,
	baseURL,
	currentDirectory: process.cwd(), // current working directory
	inDevelopment, // current environment
	localIdentName: "[local]___[hash:base64:5]", // how class names will be defined in the DOM
	NODE_ENV,
	PORT, // application's current port
};
