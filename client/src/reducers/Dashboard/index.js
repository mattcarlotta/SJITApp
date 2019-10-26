import * as types from "types";

const availability = {
	data: [],
	isLoading: true,
};

const events = {
	data: [],
	isLoading: true,
};

const eventCounts = {
	data: [],
	isLoading: true,
};

const form = {
	data: [],
	isLoading: true,
};

export const initialState = {
	availability,
	events,
	eventCounts,
	form,
};

/**
 * @function dashboardReducer
 * @param {object} state - an object containing data and isLoading state.
 * @param {object} action - type and payload to be reduced.
 * @returns {object} - dashboard state.
 */
const dashboardReducer = (state = initialState, { payload, type }) => {
	switch (type) {
		case types.DASHBOARD_FETCH_EVENTS: {
			return { ...state, events };
		}
		case types.DASHBOARD_FETCH_EVENT_DISTRIBUTION: {
			return { ...state, eventCounts };
		}
		case types.DASHBOARD_SET_EVENTS: {
			return { ...state, events: { data: payload.events, isLoading: false } };
		}
		case types.DASHBOARD_SET_EVENT_DISTRIBUTION: {
			return {
				...state,
				eventCounts: { data: payload.members, isLoading: false },
			};
		}
		default: {
			return state;
		}
	}
};

export default dashboardReducer;
