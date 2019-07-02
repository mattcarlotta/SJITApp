import app from "utils/axiosConfig";
import * as types from "types";
import { setServerMessage } from "actions/messages";

export const authenticateUser = () => async dispatch => {
	try {
		const signedinUser = await app.get("signedin");
		dispatch({
			type: types.SIGNIN,
			payload: signedinUser.data ? signedinUser.data : { email: false },
		});
	} catch (err) {
		dispatch(setServerMessage({ type: "error", message: err.toString() }));
	}
};

export const resetPassword = props => async dispatch => {
	try {
		const res = await app.put("email/reset-password", {
			...props,
		});
		dispatch(setServerMessage({ type: "alert", message: res.data.message }));
	} catch (err) {
		dispatch(setServerMessage({ type: "error", message: err.toString() }));
	}
};

export const signinUser = props => async dispatch => {
	try {
		const signedinUser = await app.post("signin", {
			...props,
		});
		dispatch({
			type: types.SIGNIN,
			payload: signedinUser.data ? signedinUser.data : {},
		});
	} catch (err) {
		dispatch(setServerMessage({ type: "error", message: err.toString() }));
	}
};

export const signoutUser = () => async dispatch => {
	try {
		await app.get("signout");
		dispatch({ type: types.SIGNOUT });
	} catch (err) {
		dispatch(setServerMessage({ type: "error", message: err.toString() }));
	}
};

export const signupUser = (props, history) => async dispatch => {
	try {
		const res = await app.post("signup", {
			...props,
		});
		dispatch(setServerMessage({ type: "alert", message: res.data.message }));
		history.push("/");
	} catch (err) {
		dispatch(setServerMessage({ type: "error", message: err.toString() }));
	}
};
