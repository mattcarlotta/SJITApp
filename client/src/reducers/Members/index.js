import * as types from "types";

export const initialState = {
	data: [],
	isLoading: true,
	viewMember: [],
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
			return initialState;
		case types.MEMBERS_SET:
			return { ...state, data: payload.members, isLoading: false };
		case types.MEMBERS_SET_REVIEW:
			return { ...state, viewMember: payload.member, isLoading: false };
		default:
			return state;
	}
};

export default memberReducer;
