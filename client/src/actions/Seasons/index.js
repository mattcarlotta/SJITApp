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
 * Gets all seasons.
 *
 * @function getSeasons
 * @returns {object}
 */
export const getSeasons = () => ({
	type: types.SEASONS_GET,
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
