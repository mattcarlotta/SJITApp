import isEmpty from "lodash/isEmpty";
import { app } from "utils";
import * as types from "types";

/**
 * Sign in user via a session.
 *
 * @function authenticateUser
 * @returns {object}
 */
export const authenticateUser = () => ({
	type: types.USER_SIGNIN_SESSION,
});

/**
 * Creates a user password request via passwordreset form.
 *
 * @function resetPassword
 * @param {object} props - props just contain an email field.
 * @param {object} history
 * @returns {object}
 */
export const resetPassword = (props, history) => ({
	type: types.USER_PASSWORD_RESET,
	props,
	history,
});

/**
 * Sets current signed in user (can be guest) to redux state
 *
 * @function signin
 * @param {object} data - contains user session data (id, email, first/last name, and role).
 * @returns {object}
 */
export const signin = data => ({
	type: types.USER_SIGNIN,
	payload: !isEmpty(data) ? data : { role: "guest" },
});

/**
 * Attempts to sign user into a new session via login form.
 *
 * @function signinUser
 * @param {object} props - contains user session data (id, email, first/last name, and role).
 * @returns {object}
 */
export const signinUser = props => ({
	type: types.USER_SIGNIN_ATTEMPT,
	props,
});

/**
 * Attempts to signs user out of current session.
 *
 * @function signoutUser
 * @returns {object}
 */
export const signoutUser = () => ({
	type: types.USER_SIGNOUT_SESSION,
});

/**
 * Signs user out of current session.
 *
 * @function signout
 * @returns {object}
 */
export const signout = () => ({
	type: types.USER_SIGNOUT,
});

/**
 * Sign up user via signup form.
 *
 * @function authSagas
 * @param {object} props - contains a token, an email, first/last name, and a password.
 * @param {object} history
 * @returns {object}
 */
export const signupUser = (props, history) => ({
	type: types.USER_SIGNUP,
	props,
	history,
});

/**
 * Updates user password via newpassword form.
 *
 * @function authSagas
 * @param {object} props - contains a token and new password fields.
 * @param {object} history
 * @returns {object}
 */
export const updateUserPassword = (props, history) => ({
	type: types.USER_PASSWORD_UPDATE,
	props,
	history,
});
