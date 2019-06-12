import * as types from "types";

const authInitialState = {
	id: "",
	email: "",
	firstName: "",
	lastName: "",
};

/**
 * @function authReducer
 * @param {object} state - an object containing error or server messages.
 * @param {object} action - type and payload to be reduced.
 * @returns {object} - user session state.
 */
const authReducer = (state = authInitialState, { payload, type }) => {
	switch (type) {
		case types.SIGNIN:
			return { ...state, ...payload };
		case types.SIGNOUT:
			return authInitialState;
		default:
			return state;
	}
};

export default authReducer;
