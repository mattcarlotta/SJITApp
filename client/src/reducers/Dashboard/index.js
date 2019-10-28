import * as types from "types";

const apform = {
	data: {},
	isLoading: true,
};

const availability = {
	data: [],
	isLoading: true,
};

const events = {
	data: [],
	isLoading: true,
};

const eventCounts = [];

export const initialState = {
	apform,
	availability,
	events,
	eventCounts,
};

/**
 * @function dashboardReducer
 * @param {object} state - an object containing data and isLoading state.
 * @param {object} action - type and payload to be reduced.
 * @returns {object} - dashboard state.
 */
const dashboardReducer = (state = initialState, { payload, type }) => {
	switch (type) {
		case types.DASHBOARD_FETCH_APFORM: {
			return { ...state, apform };
		}
		case types.DASHBOARD_FETCH_EVENTS: {
			return { ...state, events };
		}
		case types.DASHBOARD_FETCH_EVENT_DISTRIBUTION: {
			return { ...state, eventCounts };
		}
		case types.DASHBOARD_SET_APFORM: {
			return { ...state, apform: { data: payload.apform, isLoading: false } };
		}
		case types.DASHBOARD_SET_EVENTS: {
			return { ...state, events: { data: payload.events, isLoading: false } };
		}
		case types.DASHBOARD_SET_EVENT_DISTRIBUTION: {
			return {
				...state,
				eventCounts: payload.members,
			};
		}
		default: {
			return state;
		}
	}
};

export default dashboardReducer;
