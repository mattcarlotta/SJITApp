import app from "utils/axiosConfig";
import * as types from "types";
import { setServerMessage } from "actions/messages";

export const authenticateUser = () => async dispatch => {
	try {
		const signedinUser = await app.get("loggedin");
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
		const signedinUser = await app.post("login", {
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
