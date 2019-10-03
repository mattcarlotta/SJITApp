import { push } from "connected-react-router";
import { all, put, call, takeLatest } from "redux-saga/effects";
import { app } from "utils";
import { hideServerMessage, setServerMessage } from "actions/Messages";
import { setMails, setMailToEdit } from "actions/Mail";
import { parseData, parseMessage } from "utils/parseResponse";
import * as types from "types";

/**
 * Attempts to create a new email.
 *
 * @generator
 * @function createMail
 * @param {object} props -contains mail data ([id, sendTo, sendFrom, sendDate, message, subject]).
 * @yields {object} - A response from a call to the API.
 * @function parseMessage - Returns a parsed res.data.message.
 * @yields {action} - A redux action to display a server message by type.
 * @yields {action} - A redux action to push to a URL.
 * @throws {action} - A redux action to display a server message by type.
 */

export function* createMail({ props }) {
	try {
		yield put(hideServerMessage());

		const res = yield call(app.post, "mail/create", { ...props });
		const message = yield call(parseMessage, res);

		yield put(
			setServerMessage({
				type: "success",
				message,
			}),
		);

		yield put(push("/employee/mail/viewall"));
	} catch (e) {
		yield put(setServerMessage({ type: "error", message: e.toString() }));
	}
}

/**
 * Attempts to delete an email.
 *
 * @generator
 * @function deleteMail
 * @param {string} mailId
 * @yields {object} - A response from a call to the API.
 * @function parseMessage - Returns a parsed res.data.message.
 * @yields {action} - A redux action to display a server message by type.
 * @yields {action} - A redux action to push to a URL.
 * @throws {action} - A redux action to display a server message by type.
 */

export function* deleteMail({ mailId }) {
	try {
		yield put(hideServerMessage());

		const res = yield call(app.delete, `mail/delete/${mailId}`);
		const message = yield call(parseMessage, res);

		yield put(
			setServerMessage({
				type: "success",
				message,
			}),
		);

		yield put({ type: types.MAIL_FETCH });
	} catch (e) {
		yield put(setServerMessage({ type: "error", message: e.toString() }));
	}
}

/**
 * Attempts to get a single mail for editing.
 *
 * @generator
 * @function fetchMail
 * @yields {object} - A response from a call to the API.
 * @function parseData - Returns a parsed res.data.
 * @yields {action} - A redux action to set mail data to redux state.
 * @throws {action} - A redux action to display a server message by type.
 */

export function* fetchMail({ mailId }) {
	try {
		yield put(hideServerMessage());

		let res = yield call(app.get, "members/names");
		const membersData = yield call(parseData, res);

		res = yield call(app.get, `mail/edit/${mailId}`);
		const emailData = yield call(parseData, res);

		yield put(
			setMailToEdit({ ...emailData.email, dataSource: membersData.members }),
		);
	} catch (e) {
		yield put(setServerMessage({ type: "error", message: e.toString() }));
	}
}

/**
 * Attempts to get all mails.
 *
 * @generator
 * @function fetchMails
 * @yields {object} - A response from a call to the API.
 * @function parseData - Returns a parsed res.data.
 * @yields {action} - A redux action to set mail data to redux state.
 * @throws {action} - A redux action to display a server message by type.
 */

export function* fetchMails() {
	try {
		const res = yield call(app.get, "mail/all");
		const data = yield call(parseData, res);

		yield put(setMails(data));
	} catch (e) {
		yield put(setServerMessage({ type: "error", message: e.toString() }));
	}
}

/**
 * Attempts to delete an email.
 *
 * @generator
 * @function resendMail
 * @param {string} mailId
 * @yields {object} - A response from a call to the API.
 * @function parseMessage - Returns a parsed res.data.message.
 * @yields {action} - A redux action to display a server message by type.
 * @yields {action} - A redux action to push to a URL.
 * @throws {action} - A redux action to display a server message by type.
 */

export function* resendMail({ mailId }) {
	try {
		yield put(hideServerMessage());

		const res = yield call(app.put, `mail/resend/${mailId}`);
		const message = yield call(parseMessage, res);

		yield put(
			setServerMessage({
				type: "success",
				message,
			}),
		);

		yield put({ type: types.MAIL_FETCH });
	} catch (e) {
		yield put(setServerMessage({ type: "error", message: e.toString() }));
	}
}

/**
 * Attempts to update an existing mail.
 *
 * @generator
 * @function updateMail
 * @param {object} props - props contain mailID and mail fields.
 * @yields {object} - A response from a call to the API.
 * @function parseMessage - Returns a parsed res.data.message.
 * @yields {action} - A redux action to display a server message by type.
 * @yields {action} - A redux action to push to a URL.
 * @throws {action} - A redux action to display a server message by type.
 */

export function* updateMail({ props }) {
	try {
		yield put(hideServerMessage());

		const res = yield call(app.put, "mail/update", { ...props });
		const message = yield call(parseMessage, res);

		yield put(
			setServerMessage({
				type: "success",
				message,
			}),
		);

		yield put(push("/employee/mail/viewall"));
	} catch (e) {
		yield put(setServerMessage({ type: "error", message: e.toString() }));
	}
}

/**
 * Creates watchers for all generators.
 *
 * @generator
 * @function mailsSagas
 * @yields {watchers}
 */
export default function* mailsSagas() {
	yield all([
		takeLatest(types.MAIL_EDIT, fetchMail),
		takeLatest(types.MAIL_CREATE, createMail),
		takeLatest(types.MAIL_DELETE, deleteMail),
		takeLatest(types.MAIL_FETCH, fetchMails),
		takeLatest(types.MAIL_RESEND, resendMail),
		takeLatest(types.MAIL_UPDATE_EDIT, updateMail),
	]);
}
