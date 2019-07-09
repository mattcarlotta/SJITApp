import get from "lodash/get";
import { all, put, call, takeLatest } from "redux-saga/effects";
import { app } from "utils";
import { signin } from "actions/auth";
import { setServerMessage } from "actions/messages";
import { parseData, parseMessage } from "utils/parseResponse";
import * as types from "types";

/**
 * Attempts to automatically sign user in via a session.
 *
 * @generator
 * @function authenticateUser
 * @yields {object} - A response from a call to the API.
 * @function parseData - Returns a parsed res.data.
 * @yields {action} - A redux action to set the current user.
 * @throws {action} - A redux action to display a server message by type.
 */
export function* authenticateUser() {
	try {
		const res = yield call(app.get, "signedin");
		const data = parseData(res);

		yield put(signin(data));
	} catch (e) {
		yield put(setServerMessage({ type: "error", message: e.toString() }));
	}
}

/**
 * Attempts to create a reset password request.
 *
 * @generator
 * @function resetPassword
 * @param {object} props - props just contain an email field.
 * @param {object} history
 * @yields {object} - A response from a call to the API.
 * @function parseMessage - Returns a parsed res.data.message.
 * @yields {action} - A redux action to display a server message by type.
 * @throws {action} - A redux action to display a server message by type.
 */
export function* resetPassword({ props, history }) {
	try {
		const res = yield call(app.put, "reset-password", { ...props });
		const message = parseMessage(res);
		const messageType = message ? "info" : "error";
		const error =
			"Unable to complete a password reset. Please try again in a few minutes.";

		yield put(
			setServerMessage({ type: messageType, message: message || error }),
		);

		if (message) history.push("/employee/login");
	} catch (e) {
		yield put(setServerMessage({ type: "error", message: e.toString() }));
	}
}

/**
 * Attempts to sign user in to a new session.
 *
 * @generator
 * @function signinUser
 * @param {object} props - contains user session data (id, email, first/last name, and role).
 * @yields {object} - A response from a call to the API.
 * @function parseData - Returns a parsed res.data.
 * @yields {action} -  A redux action to set the current user.
 * @throws {action} - A redux action to display a server message by type.
 */
export function* signinUser({ props }) {
	try {
		const res = yield call(app.post, "signin", { ...props });
		const data = parseData(res);

		yield put(signin(data));
	} catch (e) {
		yield put(setServerMessage({ type: "error", message: e.toString() }));
	}
}

/**
 * Removes the current user from a session.
 *
 * @generator
 * @function signoutUser
 * @yields {object} - A redux action to remove the current user from state.
 * @throws {action} - A redux action to display a server message by type.
 */
export function* signoutUser() {
	try {
		yield call(app.get, "signout");
		yield put({ type: types.USER_SIGNOUT });
	} catch (err) {
		yield put(setServerMessage({ type: "error", message: e.toString() }));
	}
}

/**
 * Attempts to sign up a new user.
 *
 * @generator
 * @function signupUser
 * @param {object} props - props contain a token, an email, first/last name, and a password.
 * @param {object} history
 * @yields {object} - A response from a call to the API.
 * @function parseMessage - Returns a parsed res.data.message.
 * @yields {action} - A redux action to display a server message by type.
 * @throws {action} - A redux action to display a server message by type.
 */
export function* signupUser({ props, history }) {
	try {
		const res = yield call(app.post, "signup", { ...props });
		const message = parseMessage(res);
		const messageType = message ? "success" : "error";
		const error =
			"Unable to complete a signup request. Please try again in a few minutes.";

		yield put(
			setServerMessage({ type: messageType, message: message || error }),
		);
		if (message) history.push("/");
	} catch (e) {
		yield put(setServerMessage({ type: "error", message: e.toString() }));
	}
}

/**
 * Attempts to create a new new user password.
 *
 * @generator
 * @function updateUserPassword
 * @params {object} props - props contain a token and (new) password fields.
 * @param {object} history
 * @yields {object} - A response from a call to the API.
 * @function parseMessage - Returns a parsed res.data.message.
 * @yields {action} - A redux action to display a server message by type.
 * @throws {action} - A redux action to display a server message by type.
 */
export function* updateUserPassword({ props, history }) {
	try {
		const res = yield call(app.put, "new-password", { ...props });
		const message = parseMessage(res);
		const messageType = message ? "success" : "error";
		const error =
			"Unable to complete a signup request. Please try again in a few minutes.";

		yield put(
			setServerMessage({ type: messageType, message: message || error }),
		);
		if (message) history.push("/employee/login");
	} catch (e) {
		yield put(setServerMessage({ type: "error", message: e.toString() }));
	}
}

/**
 * Creates watchers for all generators.
 *
 * @generator
 * @function authSagas
 * @yields {generators}
 */
export default function* authSagas() {
	yield all([
		takeLatest(types.USER_SIGNIN_SESSION, authenticateUser),
		takeLatest(types.USER_PASSWORD_RESET, resetPassword),
		takeLatest(types.USER_SIGNIN_ATTEMPT, signinUser),
		takeLatest(types.USER_SIGNOUT_SESSION, signoutUser),
		takeLatest(types.USER_SIGNUP, signupUser),
		takeLatest(types.USER_PASSWORD_UPDATE, updateUserPassword),
	]);
}
