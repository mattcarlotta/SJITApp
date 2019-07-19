import * as types from "types";

export const initialState = {
	data: [],
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
		case types.SEASONS_RESET:
			return initialState;
		case types.SEASONS_SET:
			return { ...state, data: payload.seasons, isLoading: false };
		default:
			return state;
	}
};

export default seasonReducer;
