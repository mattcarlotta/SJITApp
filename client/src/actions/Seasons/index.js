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
