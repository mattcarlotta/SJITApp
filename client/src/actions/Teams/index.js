import isEmpty from "lodash/isEmpty";
import * as types from "types";

/**
 * Fetches all team names for events.
 *
 * @function fetchTeamNames
 * @returns {object}
 */
export const fetchTeamNames = () => ({
	type: types.TEAMS_FETCH_NAMES,
});

/**
 * Sets scheduled events.
 *
 * @function setTeamNames
 * @param {object} data - contains team names data ([names]).
 * @returns {object}
 */
export const setTeamNames = data => ({
	type: types.TEAMS_SET_NAMES,
	payload: !isEmpty(data) ? data : [],
});
