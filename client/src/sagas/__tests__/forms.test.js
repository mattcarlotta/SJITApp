import { push } from "connected-react-router";
import { expectSaga, testSaga } from "redux-saga-test-plan";
import { app } from "utils";
import * as types from "types";
import * as actions from "actions/Forms";
import { hideServerMessage, setServerMessage } from "actions/Messages";
import * as sagas from "sagas/Forms";
import * as mocks from "sagas/__mocks__/sagas.mocks";
import messageReducer from "reducers/Messages";
import formReducer from "reducers/Forms";
import { parseData, parseMessage } from "utils/parseResponse";

const formId = "0123456789";

describe("Form Sagas", () => {
	afterEach(() => {
		mockApp.reset();
	});

	afterAll(() => {
		mockApp.restore();
	});

	describe("Create Member", () => {
		let message;
		let props;
		beforeEach(() => {
			message = "Successfully created a new form!";
			props = mocks.formData;
		});

		it("logical flow matches pattern for a create form request", () => {
			const res = { data: { message } };

			testSaga(sagas.createForm, { props })
				.next()
				.put(hideServerMessage())
				.next()
				.call(app.post, "form/create", { ...props })
				.next(res)
				.call(parseMessage, res)
				.next(res.data.message)
				.put(setServerMessage({ type: "success", message: res.data.message }))
				.next()
				.put(push("/employee/forms/viewall"))
				.next()
				.isDone();
		});

		it("successfully creates a new form", async () => {
			mockApp.onPost("form/create").reply(200, { message });

			return expectSaga(sagas.createForm, { props })
				.dispatch(actions.createForm)
				.withReducer(messageReducer)
				.hasFinalState({
					message,
					show: true,
					type: "success",
				})
				.run();
		});

		it("if API call fails, it displays a message", async () => {
			const err = "Unable to create a new form.";
			mockApp.onPost("form/create").reply(404, { err });

			return expectSaga(sagas.createForm, { props })
				.dispatch(actions.createForm)
				.withReducer(messageReducer)
				.hasFinalState({
					message: err,
					show: true,
					type: "error",
				})
				.run();
		});
	});

	describe("Delete Form", () => {
		it("logical flow matches pattern for delete form requests", () => {
			const message = "Successfully deleted form.";
			const res = { data: { message } };

			testSaga(sagas.deleteForm, { formId })
				.next()
				.put(hideServerMessage())
				.next()
				.call(app.delete, `form/delete/${formId}`)
				.next(res)
				.call(parseMessage, res)
				.next(res.data.message)
				.put(setServerMessage({ type: "success", message: res.data.message }))
				.next()
				.put({ type: types.FORMS_FETCH })
				.next()
				.isDone();
		});

		it("successfully deletes a form", async () => {
			const message = "Successfully deleted the form.";
			mockApp.onDelete(`form/delete/${formId}`).reply(200, { message });

			return expectSaga(sagas.deleteForm, { formId })
				.dispatch(actions.deleteForm)
				.withReducer(messageReducer)
				.hasFinalState({
					message,
					show: true,
					type: "success",
				})
				.run();
		});

		it("if API call fails, it displays a message", async () => {
			const err = "Unable to delete the form.";
			mockApp.onDelete(`form/delete/${formId}`).reply(404, { err });

			return expectSaga(sagas.deleteForm, { formId })
				.dispatch(actions.deleteForm)
				.withReducer(messageReducer)
				.hasFinalState({
					message: err,
					show: true,
					type: "error",
				})
				.run();
		});
	});

	describe("Fetch Form", () => {
		let data;
		let data2;
		beforeEach(() => {
			data = { form: mocks.formsData };
			data2 = { seasonIds: mocks.seasonIdsData };
		});

		it("logical flow matches pattern for fetch form requests", () => {
			const res = { data };
			const res2 = { data2 };

			testSaga(sagas.fetchForm, { formId })
				.next()
				.put(hideServerMessage())
				.next()
				.call(app.get, `form/edit/${formId}`)
				.next(res)
				.call(parseData, res)
				.next(res.data)
				.call(app.get, "seasons/all/ids")
				.next(res2)
				.call(parseData, res2)
				.next(res2.data2)
				.put(
					actions.setFormToEdit({
						...res.data.form,
						seasonIds: res2.data2.seasonIds,
					}),
				)
				.next()
				.isDone();
		});

		it("successfully fetches a fetch form for editing", async () => {
			mockApp.onGet(`form/edit/${formId}`).reply(200, data);

			mockApp
				.onGet("seasons/all/ids")
				.reply(200, { seasonIds: mocks.seasonIdsData });

			return expectSaga(sagas.fetchForm, { formId })
				.dispatch(actions.fetchForm)
				.withReducer(formReducer)
				.hasFinalState({
					data: [],
					editForm: {
						...mocks.formsData,
						seasonIds: mocks.seasonIdsData,
					},
					events: [],
					viewForm: {},
				})
				.run();
		});

		it("if API call fails, it displays a message", async () => {
			const err = "Unable to fetch that form.";
			mockApp.onGet(`form/edit/${formId}`).reply(404, { err });

			return expectSaga(sagas.fetchForm, { formId })
				.dispatch(actions.fetchForm)
				.withReducer(messageReducer)
				.hasFinalState({
					message: err,
					show: true,
					type: "error",
				})
				.run();
		});
	});

	describe("Fetch Form AP", () => {
		let data;
		beforeEach(() => {
			data = {
				form: mocks.formsData,
				events: mocks.eventsData,
			};
		});

		it("logical flow matches pattern for fetch form AP requests", () => {
			const res = { data };

			testSaga(sagas.fetchFormAp, { formId })
				.next()
				.put(hideServerMessage())
				.next()
				.call(app.get, `form/view/${formId}`)
				.next(res)
				.call(parseData, res)
				.next(res.data)
				.put(
					actions.setFormAp({
						...res.data,
					}),
				)
				.next()
				.isDone();
		});

		it("successfully fetches a fetch AP form for editing", async () => {
			mockApp.onGet(`form/view/${formId}`).reply(200, data);

			return expectSaga(sagas.fetchFormAp, { formId })
				.dispatch(actions.fetchFormAp)
				.withReducer(formReducer)
				.hasFinalState({
					data: [],
					editForm: {},
					events: mocks.eventsData,
					viewForm: mocks.formsData,
				})
				.run();
		});

		it("if API call fails, it displays a message", async () => {
			const err = "Unable to fetch that AP form.";
			mockApp.onGet(`form/view/${formId}`).reply(404, { err });

			return expectSaga(sagas.fetchFormAp, { formId })
				.dispatch(actions.fetchFormAp)
				.withReducer(messageReducer)
				.hasFinalState({
					message: err,
					show: true,
					type: "error",
				})
				.run();
		});
	});

	describe("Fetch Forms", () => {
		let data;
		beforeEach(() => {
			data = { forms: mocks.formsData };
		});

		it("logical flow matches pattern for fetch forms requests", () => {
			const res = { data };

			testSaga(sagas.fetchForms)
				.next()
				.call(app.get, "forms/all")
				.next(res)
				.call(parseData, res)
				.next(res.data)
				.put(actions.setForms(res.data))
				.next()
				.isDone();
		});

		it("successfully fetches all forms", async () => {
			mockApp.onGet("forms/all").reply(200, data);

			return expectSaga(sagas.fetchForms)
				.dispatch(actions.fetchForms)
				.withReducer(formReducer)
				.hasFinalState({
					data: mocks.formsData,
					editForm: {},
					events: [],
					viewForm: {},
				})
				.run();
		});

		it("if API call fails, it displays a message", async () => {
			const err = "Unable to fetch forms.";
			mockApp.onGet("forms/all").reply(404, { err });

			return expectSaga(sagas.fetchForms)
				.dispatch(actions.fetchForms)
				.withReducer(messageReducer)
				.hasFinalState({
					message: err,
					show: true,
					type: "error",
				})
				.run();
		});
	});

	describe("Update Form", () => {
		let message;
		let props;
		beforeEach(() => {
			message = "Successfully updated the form!";
			props = mocks.formsData;
		});

		it("logical flow matches pattern for update form requests", () => {
			const res = { data: { message } };

			testSaga(sagas.updateForm, { props })
				.next()
				.put(hideServerMessage())
				.next()
				.call(app.put, "form/update", { ...props })
				.next(res)
				.call(parseMessage, res)
				.next(res.data.message)
				.put(setServerMessage({ type: "success", message: res.data.message }))
				.next()
				.put(push("/employee/forms/viewall"))
				.next()
				.isDone();
		});

		it("successfully updates an form", async () => {
			mockApp.onPut("form/update").reply(200, { message });

			return expectSaga(sagas.updateForm, { props })
				.dispatch(actions.updateForm)
				.withReducer(messageReducer)
				.hasFinalState({
					message,
					show: true,
					type: "success",
				})
				.run();
		});

		it("if API call fails, it displays a message", async () => {
			const err = "Unable to update the form.";
			mockApp.onPut("form/update").reply(404, { err });

			return expectSaga(sagas.updateForm, { props })
				.dispatch(actions.updateForm)
				.withReducer(messageReducer)
				.hasFinalState({
					message: err,
					show: true,
					type: "error",
				})
				.run();
		});
	});

	describe("Update Form AP", () => {
		let message;
		let props;
		beforeEach(() => {
			message = "Successfully updated the AP form!";
			props = mocks.formsData;
		});

		it("logical flow matches pattern for update AP form requests", () => {
			const res = { data: { message } };

			testSaga(sagas.updateFormAp, { props })
				.next()
				.put(hideServerMessage())
				.next()
				.call(app.put, "form/update/ap", { ...props })
				.next(res)
				.call(parseMessage, res)
				.next(res.data.message)
				.put(setServerMessage({ type: "success", message: res.data.message }))
				.next()
				.put(push("/employee/forms/viewall"))
				.next()
				.isDone();
		});

		it("successfully updates an AP form", async () => {
			mockApp.onPut("form/update/ap").reply(200, { message });

			return expectSaga(sagas.updateFormAp, { props })
				.dispatch(actions.updateFormAp)
				.withReducer(messageReducer)
				.hasFinalState({
					message,
					show: true,
					type: "success",
				})
				.run();
		});

		it("if API call fails, it displays a message", async () => {
			const err = "Unable to update the AP form.";
			mockApp.onPut("form/update/ap").reply(404, { err });

			return expectSaga(sagas.updateFormAp, { props })
				.dispatch(actions.updateFormAp)
				.withReducer(messageReducer)
				.hasFinalState({
					message: err,
					show: true,
					type: "error",
				})
				.run();
		});
	});
});
