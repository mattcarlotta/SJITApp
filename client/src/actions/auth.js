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

export const signinUser = props => async dispatch => {
	try {
		const signedinUser = await app.post("sigin", {
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
