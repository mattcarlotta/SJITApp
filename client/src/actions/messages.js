import * as types from "../types";

export const hideServerMessage = () => ({
	type: types.HIDE_MESSAGE,
});

export const setServerMessage = ({ message, type }) => ({
	type: types.SET_MESSAGE,
	payload: { message, type },
});

export const resetServerMessage = () => ({
	type: types.RESET_MESSAGE,
});
