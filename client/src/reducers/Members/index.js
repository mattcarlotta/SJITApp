import * as types from "types";

export const initialState = {
	data: [],
	tokens: [],
	editToken: {},
	viewMember: {},
	eventResponses: [],
	memberAvailability: {},
};

/**
 * @function memberReducer
 * @param {object} state - an object containing data and isLoading state.
 * @param {object} action - type and payload to be reduced.
 * @returns {object} - members state.
 */
const memberReducer = (state = initialState, { payload, type }) => {
	switch (type) {
		case types.MEMBERS_REVIEW:
		case types.MEMBERS_FETCH:
		case types.MEMBERS_FETCH_NAMES:
		case types.MEMBERS_FETCH_TOKEN:
		case types.MEMBERS_FETCH_TOKENS: {
			return initialState;
		}
		case types.MEMBERS_SET: {
			return { ...state, data: payload.members };
		}
		case types.MEMBERS_SET_AVAILABILITY: {
			return {
				...state,
				memberAvailability: payload,
			};
		}
		case types.MEMBERS_SET_EVENTS: {
			return { ...state, eventResponses: payload.eventResponses };
		}
		case types.MEMBERS_SET_NAMES: {
			return { ...state, names: payload.members };
		}
		case types.MEMBERS_SET_TOKENS: {
			return { ...state, tokens: payload.tokens };
		}
		case types.MEMBERS_SET_TOKEN: {
			return { ...state, editToken: payload };
		}
		case types.MEMBERS_SET_REVIEW: {
			return {
				...state,
				viewMember: payload.member,
				eventResponses: payload.eventResponses,
				memberAvailability: payload.memberAvailability,
			};
		}
		default: {
			return state;
		}
	}
};

export default memberReducer;
