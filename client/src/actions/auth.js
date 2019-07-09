import { app } from "utils";
import * as types from "types";
// import { setServerMessage } from "actions/messages";

// export const authenticateUser = () => async dispatch => {
// 	try {
// 		const signedinUser = await app.get("signedin");
// 		dispatch({
// 			type: types.SIGNIN,
// 			payload: signedinUser.data ? signedinUser.data : {},
// 		});
// 	} catch (err) {
// 		dispatch(setServerMessage({ type: "error", message: err.toString() }));
// 	}
// };

export const authenticateUser = () => ({
	type: types.USER_SIGNIN_SESSION,
});

// export const resetPassword = (props, history) => async dispatch => {
// 	try {
// 		const res = await app.put("reset-password", {
// 			...props,
// 		});
// 		dispatch(setServerMessage({ type: "info", message: res.data.message }));
// 		history.push("/employee/login");
// 	} catch (err) {
// 		dispatch(setServerMessage({ type: "error", message: err.toString() }));
// 	}
// };

export const resetPassword = (props, history) => ({
	type: types.USER_PASSWORD_RESET,
	payload: { props, history },
});

// export const signinUser = props => async dispatch => {
// 	try {
// 		const signedinUser = await app.post("signin", {
// 			...props,
// 		});
// 		dispatch({
// 			type: types.SIGNIN,
// 			payload: signedinUser.data ? signedinUser.data : {},
// 		});
// 	} catch (err) {
// 		dispatch(setServerMessage({ type: "error", message: err.toString() }));
// 	}
// };

export const signinUser = props => ({
	type: types.USER_SIGNIN_ATTEMPT,
	payload: { props },
});

// export const signoutUser = () => async dispatch => {
// 	try {
// 		await app.get("signout");
// 		dispatch({ type: types.SIGNOUT });
// 	} catch (err) {
// 		dispatch(setServerMessage({ type: "error", message: err.toString() }));
// 	}
// };

export const signoutUser = () => ({
	type: types.USER_SIGNOUT_SESSION,
});

// export const signupUser = (props, history) => async dispatch => {
// 	try {
// 		const res = await app.post("signup", {
// 			...props,
// 		});
// 		dispatch(setServerMessage({ type: "success", message: res.data.message }));
// 		history.push("/");
// 	} catch (err) {
// 		dispatch(setServerMessage({ type: "error", message: err.toString() }));
// 	}
// };

export const signupUser = (props, history) => ({
	type: types.USER_SIGNUP,
	payload: { props, history },
});

// export const updateUserPassword = (props, history) => async dispatch => {
// 	try {
// 		const res = await app.put("new-password", {
// 			...props,
// 		});
// 		dispatch(setServerMessage({ type: "success", message: res.data.message }));
// 		history.push("/employee/login");
// 	} catch (err) {
// 		dispatch(setServerMessage({ type: "error", message: err.toString() }));
// 	}
// };

export const updateUserPassword = (props, history) => ({
	type: types.USER_PASSWORD_UPDATE,
	payload: { props, history },
});
