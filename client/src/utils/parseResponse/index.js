import get from "lodash/get";

/**
 * Helper function to parse a message from an API response.
 *
 * @function
 * @param {array} res - an API response.
 * @returns {string} - a parsed message string from res.data.message.
 * @throws {error}
 */
export const parseMessage = res => get(res, ["data", "message"]);

/**
 * Helper function to parse data from an API response.
 *
 * @function
 * @param {array} res - an API response.
 * @returns {object} - a parsed data object from res.data.
 * @throws {error}
 */
export const parseData = res => get(res, ["data"]);
