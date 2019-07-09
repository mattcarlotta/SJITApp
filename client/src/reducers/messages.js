import * as types from "../types";

const initialState = {
	message: "",
	show: false,
	type: "",
};

const serverMessageReducer = (state = initialState, { payload, type }) => {
	switch (type) {
		case types.MESSAGE_HIDE:
			return { ...state, show: false };
		case types.MESSAGE_RESET:
			return { ...state, message: "", type: "" };
		case types.MESSAGE_SET:
			return { message: payload.message, show: true, type: payload.type };
		default:
			return state;
	}
};

export default serverMessageReducer;
