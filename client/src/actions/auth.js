import app from "utils/axiosConfig";
import * as types from "types";

export const authenticateUser = () => async dispatch => {
	try {
		const signedinUser = await app.get("loggedin");
		dispatch({
			type: types.SIGNIN,
			payload: signedinUser.data ? signedinUser.data : { email: false },
		});
	} catch (err) {
		console.log(err.toString());
		dispatch({ type: types.SERVER_ERROR, payload: err.toString() });
	}
};

export const signinUser = props => async dispatch => {
	try {
		const signedinUser = await app.post("login", {
			...props,
		});
		console.log("signedinUser", signedinUser);
		dispatch({
			type: types.SIGNIN,
			payload: signedinUser.data ? signedinUser.data : {},
		});
	} catch (err) {
		console.log(err.toString());
		dispatch({ type: types.SERVER_ERROR, payload: err.toString() });
	}
};
