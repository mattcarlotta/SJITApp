import * as types from "types";

export const initialState = {
	data: [],
	editEvent: {},
	newEvent: {},
	schedule: {},
	scheduleEvents: [],
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
		case types.EVENTS_FETCH_SCHEDULE:
		case types.EVENTS_FETCH_SCHEDULE_EVENTS: {
			return initialState;
		}
		case types.EVENTS_SET: {
			return { ...state, data: payload.events };
		}
		case types.EVENTS_SET_EDIT: {
			return { ...state, editEvent: payload };
		}
		case types.EVENTS_SET_NEW_EVENT: {
			return { ...state, newEvent: payload };
		}
		case types.EVENTS_SET_SCHEDULE: {
			return { ...state, schedule: payload.schedule };
		}
		case types.EVENTS_SET_SCHEDULE_EVENTS: {
			return { ...state, scheduleEvents: payload.events };
		}
		default: {
			return state;
		}
	}
};

export default eventReducer;
