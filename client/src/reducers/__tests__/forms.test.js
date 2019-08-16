import * as types from "types";
import formReducer, { initialState } from "reducers/Forms";
import * as mocks from "reducers/__mocks__/reducers.mocks";

const formsData = {
	forms: mocks.formData,
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
		});
	});
});
