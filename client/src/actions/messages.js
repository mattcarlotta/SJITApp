import * as types from "../types";

export const hideServerMessage = () => ({
	type: types.MESSAGE_HIDE,
});

export const resetServerMessage = () => ({
	type: types.MESSAGE_RESET,
});

export const setServerMessage = ({ message, type }) => ({
	type: types.MESSAGE_SET,
	payload: { message, type },
});
