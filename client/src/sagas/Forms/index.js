import { goBack, push } from "connected-react-router";
import { all, put, call, select, takeLatest } from "redux-saga/effects";
import { app } from "utils";
import { hideServerMessage, setServerMessage } from "actions/Messages";
import * as actions from "actions/Forms";
import { parseData, parseMessage } from "utils/parseResponse";
import { selectQuery } from "utils/selectors";
import * as types from "types";

/**
 * Attempts to create a new member.
 *
 * @generator
 * @function createForm
 * @param {object} props - props contain league, formType, location, timeSlots, uniform, start/end dates and times, and seasonId.
 * @yields {object} - A response from a call to the API.
 * @function parseMessage - Returns a parsed res.data.message.
 * @yields {action} - A redux action to display a server message by type.
 * @yields {action} - A redux action to push to a URL.
 * @throws {action} - A redux action to display a server message by type.
 */

export function* createForm({ props }) {
	try {
		yield put(hideServerMessage());

		const res = yield call(app.post, "form/create", { ...props });
		const message = yield call(parseMessage, res);

		yield put(
			setServerMessage({
				type: "success",
				message,
			}),
		);

		yield put(push("/employee/forms/viewall?page=1"));
	} catch (e) {
		yield put(setServerMessage({ type: "error", message: e.toString() }));
	}
}

/**
 * Attempts to delete a form.
 *
 * @generator
 * @function deleteForm
 * @params {object} - formId
 * @yields {object} - A response from a call to the API.
 * @function parseMessage - Returns a parsed res.data.message.
 * @yields {action} - A redux action to display a server message by type.
 * @yields {action} - A redux action to fetch forms data again.
 * @throws {action} - A redux action to display a server message by type.
 */

export function* deleteForm({ formId }) {
	try {
		yield put(hideServerMessage());

		const res = yield call(app.delete, `form/delete/${formId}`);
		const message = yield call(parseMessage, res);

		yield put(
			setServerMessage({
				type: "success",
				message,
			}),
		);

		yield put(actions.fetchForms());
	} catch (e) {
		yield put(setServerMessage({ type: "error", message: e.toString() }));
	}
}

/**
 * Attempts to get form for editing.
 *
 * @generator
 * @function fetchForm
 * @param {object} formId
 * @yields {object} - A response from a call to the API.
 * @function parseData - Returns a parsed res.data (form data).
 * @yields {object} - A response from a call to the API.
 * @function parseData - Returns a parsed res.data (seasonIds data).
 * @yields {action} - A redux action to set form data to redux state.
 * @throws {action} - A redux action to display a server message by type.
 */

export function* fetchForm({ formId }) {
	try {
		yield put(hideServerMessage());

		let res = yield call(app.get, `form/edit/${formId}`);
		const forms = yield call(parseData, res);

		res = yield call(app.get, "seasons/all/ids");
		const seasons = yield call(parseData, res);

		yield put(
			actions.setFormToEdit({
				...forms.form,
				seasonIds: seasons.seasonIds,
			}),
		);
	} catch (e) {
		yield put(setServerMessage({ type: "error", message: e.toString() }));
	}
}

/**
 * Attempts to get form for viewing/updating.
 *
 * @generator
 * @function fetchFormAp
 * @param {object} formId
 * @yields {object} - A response from a call to the API.
 * @function parseData - Returns a parsed res.data (form and forms data).
 * @yields {action} - A redux action to set form data to redux state.
 * @throws {action} - A redux action to display a server message by type.
 */

export function* fetchFormAp({ formId }) {
	try {
		yield put(hideServerMessage());

		const res = yield call(app.get, `form/view/${formId}`);
		const data = yield call(parseData, res);

		yield put(
			actions.setFormAp({
				...data,
			}),
		);
	} catch (e) {
		yield put(goBack());
		yield put(setServerMessage({ type: "error", message: e.toString() }));
	}
}

/**
 * Attempts to get all forms.
 *
 * @generator
 * @function fetchForms
 * @yields {object} - A response from a call to the API.
 * @function parseData - Returns a parsed res.data.
 * @yields {action} - A redux action to set forms data to redux state.
 * @throws {action} - A redux action to display a server message by type.
 */

export function* fetchForms() {
	try {
		const query = yield select(selectQuery);

		const res = yield call(app.get, `forms/all${query}`);
		const data = yield call(parseData, res);

		yield put(actions.setForms(data));
	} catch (e) {
		yield put(setServerMessage({ type: "error", message: e.toString() }));
	}
}

/**
 * Attempts to resend form emails.
 *
 * @generator
 * @function resendFormEmails
 * @params {object} - eventId
 * @yields {object} - A response from a call to the API.
 * @function parseData - Returns a parsed res.data.
 * @yields {action} - A redux action to set forms data to redux state.
 * @throws {action} - A redux action to display a server message by type.
 */

export function* resendFormEmails({ formId }) {
	try {
		yield put(hideServerMessage());

		const res = yield call(app.put, `form/resend-email/${formId}`);
		const message = yield call(parseMessage, res);

		yield put(
			setServerMessage({
				type: "info",
				message,
			}),
		);

		yield put(actions.fetchForms());
	} catch (e) {
		yield put(setServerMessage({ type: "error", message: e.toString() }));
	}
}

/**
 * Attempts to update an existing form.
 *
 * @generator
 * @function updateForm
 * @param {object} props - contains form data ([_id, seasonId, startMonth, startDate, expirationDate]).
 * @yields {object} - A response from a call to the API.
 * @function parseMessage - Returns a parsed res.data.message.
 * @yields {action} - A redux action to display a server message by type.
 * @yields {action} - A redux action to push to a URL.
 * @throws {action} - A redux action to display a server message by type.
 */

export function* updateForm({ props }) {
	try {
		yield put(hideServerMessage());

		const res = yield call(app.put, "form/update", { ...props });
		const message = yield call(parseMessage, res);

		yield put(
			setServerMessage({
				type: "success",
				message,
			}),
		);

		yield put(goBack());
	} catch (e) {
		yield put(setServerMessage({ type: "error", message: e.toString() }));
	}
}

/**
 * Attempts to update the a/p month form.
 *
 * @generator
 * @function updateFormAp
 * @param {object} props - contains form data ({_id, responses, notes}).
 * @yields {object} - A response from a call to the API.
 * @function parseMessage - Returns a parsed res.data.message.
 * @yields {action} - A redux action to display a server message by type.
 * @yields {action} - A redux action to push to a URL.
 * @throws {action} - A redux action to display a server message by type.
 */

export function* updateFormAp({ props }) {
	try {
		yield put(hideServerMessage());

		const res = yield call(app.put, "form/update/ap", { ...props });
		const message = yield call(parseMessage, res);

		yield put(
			setServerMessage({
				type: "success",
				message,
			}),
		);

		yield put(push("/employee/dashboard"));
	} catch (e) {
		yield put(setServerMessage({ type: "error", message: e.toString() }));
	}
}

/**
 * Creates watchers for all generators.
 *
 * @generator
 * @function formsSagas
 * @yields {watchers}
 */
export default function* formsSagas() {
	yield all([
		takeLatest(types.FORMS_CREATE, createForm),
		takeLatest(types.FORMS_DELETE, deleteForm),
		takeLatest(types.FORMS_EDIT, fetchForm),
		takeLatest(types.FORMS_FETCH_AP, fetchFormAp),
		takeLatest(types.FORMS_FETCH, fetchForms),
		takeLatest(types.FORMS_RESEND_MAIL, resendFormEmails),
		takeLatest(types.FORMS_UPDATE, updateForm),
		takeLatest(types.FORMS_UPDATE_AP, updateFormAp),
	]);
}
