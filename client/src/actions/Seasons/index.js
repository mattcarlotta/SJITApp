import isEmpty from "lodash/isEmpty";
import * as types from "types";

/**
 * Creates a new season.
 *
 * @function createSeason
 * @param {object} props - props just contain an seasonID and season duration fields.
 * @returns {object}
 */
export const createSeason = props => ({
	type: types.SEASONS_CREATE,
	props,
});

/**
 * Fetches all seasons.
 *
 * @function fetchSeasons
 * @returns {object}
 */
export const fetchSeasons = () => ({
	type: types.SEASONS_FETCH,
});

/**
 * Resets any seasons from redux state.
 *
 * @function resetSeasons
 * @returns {object}
 */
export const resetSeasons = () => ({
	type: types.SEASONS_RESET,
});

/**
 * Sets any seasons from API to redux state
 *
 * @function setSeasons
 * @param {object} data - contains season data ([id, seasonId, members, startDate, endDate]).
 * @returns {object}
 */
export const setSeasons = data => ({
	type: types.SEASONS_SET,
	payload: !isEmpty(data) ? data : [],
});
