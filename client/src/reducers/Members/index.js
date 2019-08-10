import * as types from "types";

export const initialState = {
	data: [],
	tokens: [],
	editToken: {},
	isLoading: true,
	viewMember: {},
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
		case types.MEMBERS_FETCH_TOKEN:
		case types.MEMBERS_FETCH_TOKENS:
			return initialState;
		case types.MEMBERS_SET:
			return { ...state, data: payload.members, isLoading: false };
		case types.MEMBERS_SET_TOKENS:
			return { ...state, tokens: payload.tokens, isLoading: false };
		case types.MEMBERS_SET_TOKEN:
			return { ...state, editToken: payload, isLoading: false };
		case types.MEMBERS_SET_REVIEW:
			return { ...state, viewMember: payload.member, isLoading: false };
		default:
			return state;
	}
};

export default memberReducer;
