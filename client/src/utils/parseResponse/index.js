import get from "lodash/get";

/**
 * Helper function to parse a message from an API response.
 *
 * @function
 * @param {array} res - an API response.
 * @returns {string} - a parsed message string from res.data.message.
 */
export function parseMessage(res) {
	const message = get(res, ["data", "message"]);
	return message;
}

/**
 * Helper function to parse data from an API response.
 *
 * @function
 * @param {array} res - an API response.
 * @returns {object} - a parsed data object from res.data.
 */
export function parseData(res) {
	const data = get(res, ["data"]);
	return data;
}
