import { push } from "connected-react-router";
import { all, put, call, takeLatest } from "redux-saga/effects";
import { app } from "utils";
import { hideServerMessage, setServerMessage } from "actions/Messages";
// import { setEvents, setEventToEdit } from "actions/Events";
import { parseData, parseMessage } from "utils/parseResponse";
import * as types from "types";

/**
 * Attempts to create a new member.
 *
 * @generator
 * @function createEvent
 * @param {object} props - props contain league, eventType, location, timeSlots, uniform, start/end dates and times, and seasonId.
 * @yields {object} - A response from a call to the API.
 * @function parseMessage - Returns a parsed res.data.message.
 * @yields {action} - A redux action to display a server message by type.
 * @yields {action} - A redux action to push to a URL.
 * @throws {action} - A redux action to display a server message by type.
 */

export function* createForm({ props }) {
	try {
		const res = yield call(app.post, "form/create", { ...props });
		const message = yield call(parseMessage, res);

		yield put(
			setServerMessage({
				type: "success",
				message,
			}),
		);

		yield put(push("/employee/forms/viewall"));
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
		// takeLatest(types.EVENTS_DELETE, deleteEvent),
		// takeLatest(types.EVENTS_EDIT, fetchEvent),
		// takeLatest(types.EVENTS_FETCH, fetchEvents),
		// takeLatest(types.EVENTS_UPDATE, updateEvent),
	]);
}
