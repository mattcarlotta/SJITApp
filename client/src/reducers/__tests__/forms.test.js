import * as types from "types";
import formReducer, { initialState } from "reducers/Forms";
import * as mocks from "reducers/__mocks__/reducers.mocks";

const formsData = {
	forms: mocks.formData,
};

const apformData = {
	form: mocks.formData,
	eventResponses: mocks.eventResponseData,
	events: mocks.eventsApData,
};

describe("Form Reducer", () => {
	it("initially matches the initialState pattern", () => {
		expect(formReducer(undefined, { payload: {}, type: "" })).toEqual(
			initialState,
		);
	});

	it("sets forms data", () => {
		const state = formReducer(undefined, {
			type: types.FORMS_SET,
			payload: formsData,
		});

		expect(state).toEqual({
			data: mocks.formData,
			editForm: {},
			eventResponses: [],
			events: [],
			viewForm: {},
		});
	});

	it("sets forms AP data", () => {
		const state = formReducer(undefined, {
			type: types.FORMS_SET_AP,
			payload: apformData,
		});

		expect(state).toEqual({
			data: [],
			editForm: {},
			eventResponses: mocks.eventResponseData,
			events: mocks.eventsApData,
			viewForm: mocks.formData,
		});
	});

	it("when fetching all forms, resets to initialState", () => {
		let state = formReducer(undefined, {
			type: types.FORMS_SET,
			payload: formsData,
		});

		state = formReducer(state, {
			type: types.FORMS_FETCH,
		});

		expect(state).toEqual(initialState);
	});

	it("when fetching an event for editing, resets to initialState", () => {
		let state = formReducer(undefined, {
			type: types.FORMS_SET,
			payload: formsData,
		});

		state = formReducer(state, {
			type: types.FORMS_EDIT,
		});

		expect(state).toEqual(initialState);
	});

	it("sets event for editing", () => {
		const state = formReducer(undefined, {
			type: types.FORMS_SET_EDIT,
			payload: { ...mocks.formData },
		});

		expect(state).toEqual({
			data: [],
			editForm: { ...mocks.formData },
			eventResponses: [],
			events: [],
			viewForm: {},
		});
	});
});
