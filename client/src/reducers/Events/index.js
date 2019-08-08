import * as types from "types";

export const initialState = {
	data: [],
	editEvent: {},
	isLoading: true,
};

/**
 * @function eventReducer
 * @param {object} state - an object containing data and isLoading state.
 * @param {object} action - type and payload to be reduced.
 * @returns {object} - events state.
 */
const eventReducer = (state = initialState, { payload, type }) => {
	switch (type) {
		case types.EVENTS_EDIT:
		case types.EVENTS_FETCH:
			return initialState;
		case types.EVENTS_SET:
			return { ...state, data: payload.events, isLoading: false };
		case types.EVENTS_SET_EDIT:
			return { ...state, editEvent: payload.event, isLoading: false };
		default:
			return state;
	}
};

export default eventReducer;
