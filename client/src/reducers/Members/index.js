import * as types from "types";

export const initialState = {
	data: [],
	editMember: [],
	isLoading: true,
};

/**
 * @function memberReducer
 * @param {object} state - an object containing data and isLoading state.
 * @param {object} action - type and payload to be reduced.
 * @returns {object} - members state.
 */
const memberReducer = (state = initialState, { payload, type }) => {
	switch (type) {
		case types.MEMBERS_EDIT:
		case types.MEMBERS_FETCH:
			return initialState;
		case types.MEMBERS_SET:
			return { ...state, data: payload.members, isLoading: false };
		case types.MEMBERS_SET_EDIT:
			return { ...state, editMember: payload.member, isLoading: false };
		default:
			return state;
	}
};

export default memberReducer;
