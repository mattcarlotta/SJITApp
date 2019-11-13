import { goBack, push } from "connected-react-router";
import { all, put, call, select, takeLatest } from "redux-saga/effects";
import { app } from "utils";
import { hideServerMessage, setServerMessage } from "actions/Messages";
import * as actions from "actions/Mail";
import { parseData, parseMessage } from "utils/parseResponse";
import { selectQuery } from "utils/selectors";
import * as types from "types";

/**
 * Attempts to send a new email to admin or staff.
 *
 * @generator
 * @function contactUs
 * @param {object} props -contains mail data ([sendTo, message, subject]).
 * @yields {object} - A response from a call to the API.
 * @function parseMessage - Returns a parsed res.data.message.
 * @yields {action} - A redux action to display a server message by type.
 * @yields {action} - A redux action to push to a URL.
 * @throws {action} - A redux action to display a server message by type.
 */

export function* contactUs({ props }) {
	try {
		yield put(hideServerMessage());

		const res = yield call(app.post, "mail/contact", { ...props });
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

		yield put(push("/employee/mail/viewall?page=1"));
	} catch (e) {
		yield put(setServerMessage({ type: "error", message: e.toString() }));
	}
}

/**
 * Attempts to delete an email.
 *
 * @generator
 * @function deleteMail
 * @params {obect} - mailId
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

		yield put(actions.fetchMails());
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
		const membersNamesData = yield call(parseData, res);

		res = yield call(app.get, `mail/edit/${mailId}`);
		const emailData = yield call(parseData, res);

		yield put(
			actions.setMailToEdit({
				...emailData.email,
				dataSource: membersNamesData.members,
			}),
		);
	} catch (e) {
		yield put(goBack());
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
		const query = yield select(selectQuery);

		const res = yield call(app.get, `mail/all${query}`);
		const data = yield call(parseData, res);

		yield put(actions.setMails(data));
	} catch (e) {
		yield put(setServerMessage({ type: "error", message: e.toString() }));
	}
}

/**
 * Attempts to resend form emails.
 *
 * @generator
 * @function resendMail
 * @params {object} - mailId
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
				type: "info",
				message,
			}),
		);

		yield put(actions.fetchMails());
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

		yield put(goBack());
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
		takeLatest(types.MAIL_CONTACT_US, contactUs),
		takeLatest(types.MAIL_CREATE, createMail),
		takeLatest(types.MAIL_DELETE, deleteMail),
		takeLatest(types.MAIL_EDIT, fetchMail),
		takeLatest(types.MAIL_FETCH, fetchMails),
		takeLatest(types.MAIL_RESEND, resendMail),
		takeLatest(types.MAIL_UPDATE_EDIT, updateMail),
	]);
}
