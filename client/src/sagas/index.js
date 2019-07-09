import { put, call, takeEvery, takeLatest } from "redux-saga/effects";
import { app } from "utils";
import * as types from "types";

function isValidResponse(res) {
	return res.data && res.data.message;
}

function* setMessage({ message, type }) {
	yield put({
		type: types.MESSAGE_SET,
		payload: { type, message },
	});
}

function* signin({ data }) {
	yield put({
		type: types.USER_SIGNIN,
		payload: data ? data : {},
	});
}

function* authenticateUser() {
	try {
		const res = yield call(app.get, "signedin");

		yield signin({ ...res });
	} catch (e) {
		yield call(setMessage({ type: "error", message: e.toString() }));
	}
}

function* resetPassword({ payload: { props, history } }) {
	try {
		const res = yield call(app.put, "reset-password", { ...props });
		const containsMessage = isValidResponse(res);
		const messageType = containsMessage ? "info" : "error";
		const message = containsMessage
			? res.data.message
			: "Unable to complete a password reset. Please try again in a few minutes.";

		yield setMessage({ type: messageType, message });

		if (containsMessage) history.push("/employee/login");
	} catch (e) {
		yield setMessage({ type: "error", message: e.toString() });
	}
}

function* signinUser({ payload: { props } }) {
	try {
		const res = yield call(app.post, "signin", { ...props });
		yield signin({ ...res });
	} catch (e) {
		yield setMessage({ type: "error", message: e.toString() });
	}
}

function* signoutUser() {
	try {
		yield call(app.get, "signout");
		yield put({ type: types.USER_SIGNOUT });
	} catch (err) {
		yield setMessage({ type: "error", message: e.toString() });
	}
}

function* signupUser({ payload: { props, history } }) {
	try {
		const res = yield call(app.post, "signup", { ...props });
		const containsMessage = isValidResponse(res);
		const messageType = containsMessage ? "success" : "error";
		const message = containsMessage
			? res.data.message
			: "Unable to complete a signup request. Please try again in a few minutes.";

		yield setMessage({ type: messageType, message });
		if (containsMessage) history.push("/");
	} catch (e) {
		yield setMessage({ type: "error", message: e.toString() });
	}
}

function* updateUserPassword({ payload: { props, history } }) {
	try {
		const res = yield call(app.put, "new-password", { ...props });
		const containsMessage = isValidResponse(res);
		const messageType = containsMessage ? "success" : "error";
		const message = containsMessage
			? res.data.message
			: "Unable to complete a signup request. Please try again in a few minutes.";

		yield setMessage({ type: messageType, message });
		if (containsMessage) history.push("/employee/login");
	} catch (e) {
		yield setMessage({ type: "error", message: e.toString() });
	}
}

export default function* rootSaga() {
	yield takeLatest(types.USER_SIGNIN_SESSION, authenticateUser);
	yield takeLatest(types.USER_PASSWORD_RESET, resetPassword);
	yield takeLatest(types.USER_SIGNIN_ATTEMPT, signinUser);
	yield takeLatest(types.USER_SIGNOUT_SESSION, signoutUser);
	yield takeLatest(types.USER_SIGNUP, signupUser);
	yield takeLatest(types.USER_PASSWORD_UPDATE, updateUserPassword);
}
