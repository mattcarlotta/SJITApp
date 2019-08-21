import * as types from "types";

export const initialState = {
	data: [],
	editForm: {},
	events: [],
	eventResponses: [],
	viewForm: {},
};

/**
 * @function formReducer
 * @param {object} state - an object containing data and isLoading state.
 * @param {object} action - type and payload to be reduced.
 * @returns {object} - forms state.
 */
const formReducer = (state = initialState, { payload, type }) => {
	switch (type) {
		case types.FORMS_EDIT:
		case types.FORMS_FETCH:
			return initialState;
		case types.FORMS_SET:
			return { ...state, data: payload.forms };
		case types.FORMS_SET_AP:
			return {
				...state,
				viewForm: payload.form,
				events: payload.events,
				eventResponses: payload.eventResponses,
			};
		case types.FORMS_SET_EDIT:
			return { ...state, editForm: payload };
		default:
			return state;
	}
};

export default formReducer;
