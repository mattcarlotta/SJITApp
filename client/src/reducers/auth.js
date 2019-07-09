import * as types from "types";

const authInitialState = {
	id: "",
	email: "",
	firstName: "",
	lastName: "",
	role: "",
};

/**
 * @function authReducer
 * @param {object} state - an object containing error or server messages.
 * @param {object} action - type and payload to be reduced.
 * @returns {object} - user session state.
 */
const authReducer = (state = authInitialState, { payload, type }) => {
	switch (type) {
		case types.USER_SIGNIN:
			return { ...state, ...payload };
		case types.USER_SIGNOUT:
			return { ...authInitialState, email: false };
		default:
			return state;
	}
};

export default authReducer;
