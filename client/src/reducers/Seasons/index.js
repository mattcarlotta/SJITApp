import * as types from "types";

export const initialState = {
	data: [],
	editSeason: {},
	isLoading: true,
};

/**
 * @function seasonReducer
 * @param {object} state - an object containing data and isLoading state.
 * @param {object} action - type and payload to be reduced.
 * @returns {object} - seasons state.
 */
const seasonReducer = (state = initialState, { payload, type }) => {
	switch (type) {
		case types.SEASONS_EDIT:
		case types.SEASONS_FETCH:
			return initialState;
		case types.SEASONS_SET:
			return { ...state, data: payload.seasons, isLoading: false };
		case types.SEASONS_SET_EDIT:
			return { ...state, editSeason: payload.season, isLoading: false };
		default:
			return state;
	}
};

export default seasonReducer;
