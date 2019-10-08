import { push } from "connected-react-router";
import { all, put, call, takeLatest } from "redux-saga/effects";
import { app } from "utils";
import { hideServerMessage, setServerMessage } from "actions/Messages";
import {
	setEventForScheduling,
	setEvents,
	setEventToEdit,
	setNewEvent,
	setScheduleEvents,
} from "actions/Events";
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

export function* createEvent({ props }) {
	try {
		yield put(hideServerMessage());

		const res = yield call(app.post, "event/create", { ...props });
		const message = yield call(parseMessage, res);

		yield put(
			setServerMessage({
				type: "success",
				message,
			}),
		);

		yield put(push("/employee/events/viewall"));
	} catch (e) {
		yield put(setServerMessage({ type: "error", message: e.toString() }));
	}
}

/**
 * Attempts to delete a token.
 *
 * @generator
 * @function deleteEvent
 * @param {object} eventId
 * @yields {object} - A response from a call to the API.
 * @function parseMessage - Returns a parsed res.data.message.
 * @yields {action} - A redux action to display a server message by type.
 * @yields {action} - A redux action to fetch tokens data again.
 * @throws {action} - A redux action to display a server message by type.
 */

export function* deleteEvent({ eventId }) {
	try {
		yield put(hideServerMessage());

		const res = yield call(app.delete, `event/delete/${eventId}`);
		const message = yield call(parseMessage, res);

		yield put(
			setServerMessage({
				type: "success",
				message,
			}),
		);

		yield put({ type: types.EVENTS_FETCH });
	} catch (e) {
		yield put(setServerMessage({ type: "error", message: e.toString() }));
	}
}

/**
 * Attempts to get event for editing.
 *
 * @generator
 * @function fetchEvent
 * @param {string} eventId
 * @yields {object} - A response from a call to the API.
 * @function parseData - Returns a parsed res.data.
 * @yields {action} - A redux action to set event data to redux state.
 * @throws {action} - A redux action to display a server message by type.
 */

export function* fetchEvent({ eventId }) {
	try {
		yield put(hideServerMessage());

		let res = yield call(app.get, `event/edit/${eventId}`);
		const events = yield call(parseData, res);

		res = yield call(app.get, "seasons/all/ids");
		const seasons = yield call(parseData, res);

		res = yield call(app.get, "teams/all/names");
		const teams = yield call(parseData, res);

		yield put(
			setEventToEdit({
				...events.event,
				seasonIds: seasons.seasonIds,
				teams: teams.names,
			}),
		);
	} catch (e) {
		yield put(setServerMessage({ type: "error", message: e.toString() }));
	}
}

/**
 * Attempts to get event for scheduling.
 *
 * @generator
 * @function fetchEventForScheduling
 * @param {string} eventId
 * @yields {object} - A response from a call to the API.
 * @function parseData - Returns a parsed res.data.
 * @yields {action} - A redux action to set event data to redux state.
 * @throws {action} - A redux action to display a server message by type.
 */

export function* fetchEventForScheduling({ eventId }) {
	try {
		yield put(hideServerMessage());

		let res = yield call(app.get, `event/review/${eventId}`);
		const scheduleData = yield call(parseData, res);

		res = yield call(app.get, `members/eventcounts`, { params: { eventId } });
		const memberCountData = yield call(parseData, res);

		yield put(setEventForScheduling({ ...scheduleData, ...memberCountData }));
	} catch (e) {
		yield put(setServerMessage({ type: "error", message: e.toString() }));
	}
}

/**
 * Attempts to get all events.
 *
 * @generator
 * @function fetchEvents
 * @yields {object} - A response from a call to the API.
 * @function parseData - Returns a parsed res.data.
 * @yields {action} - A redux action to set events data to redux state.
 * @throws {action} - A redux action to display a server message by type.
 */

export function* fetchEvents() {
	try {
		const res = yield call(app.get, "events/all");
		const data = yield call(parseData, res);

		yield put(setEvents(data));
	} catch (e) {
		yield put(setServerMessage({ type: "error", message: e.toString() }));
	}
}

/**
 * Attempts to get a single member profile for review/editing.
 *
 * @generator
 * @function fetchScheduleEvents
 * @param {object} params
 * @yields {object} - A response from a call to the API.
 * @function parseData - Returns a parsed res.data.
 * @yields {action} - A redux action to set member data to redux state.
 * @throws {action} - A redux action to display a server message by type.
 */

export function* fetchScheduleEvents({ params }) {
	try {
		const res = yield call(app.get, "events/schedule", { params });
		const data = yield call(parseData, res);

		yield put(setScheduleEvents(data));
	} catch (e) {
		yield put(setServerMessage({ type: "error", message: e.toString() }));
	}
}

/**
 * Attempts to get event for editing.
 *
 * @generator
 * @function initializeNewEvent
 * @param {object}
 * @yields {object} - A response from a call to the API (season ids).
 * @function parseData - Returns a parsed res.data.
 * @yields {object} - A response from a call to the API (team names).
 * @function parseData - Returns a parsed res.data.
 * @yields {action} - A redux action to set event data to redux state.
 * @throws {action} - A redux action to display a server message by type.
 */

export function* initializeNewEvent() {
	try {
		yield put(hideServerMessage());

		let res = yield call(app.get, "seasons/all/ids");
		const seasons = yield call(parseData, res);

		res = yield call(app.get, "teams/all/names");
		const teams = yield call(parseData, res);

		yield put(
			setNewEvent({
				seasonIds: seasons.seasonIds,
				teams: teams.names,
			}),
		);
	} catch (e) {
		yield put(setServerMessage({ type: "error", message: e.toString() }));
	}
}

/**
 * Attempts to resend form emails.
 *
 * @generator
 * @function resendEventEmails
 * @yields {object} - A response from a call to the API.
 * @function parseData - Returns a parsed res.data.
 * @yields {action} - A redux action to set forms data to redux state.
 * @throws {action} - A redux action to display a server message by type.
 */

export function* resendEventEmails({ formId }) {
	try {
		yield put(hideServerMessage());

		const res = yield call(app.put, `event/resend-email/${formId}`);
		const message = yield call(parseMessage, res);

		yield put(
			setServerMessage({
				type: "info",
				message,
			}),
		);

		yield put({ type: types.EVENTS_FETCH });
	} catch (e) {
		yield put(setServerMessage({ type: "error", message: e.toString() }));
	}
}

/**
 * Attempts to update an existing event.
 *
 * @generator
 * @function updateEvent
 * @param {object} props - props contain league, eventType, location, timeSlots, uniform, start/end dates and times, and seasonId.
 * @yields {object} - A response from a call to the API.
 * @function parseMessage - Returns a parsed res.data.message.
 * @yields {action} - A redux action to display a server message by type.
 * @yields {action} - A redux action to push to a URL.
 * @throws {action} - A redux action to display a server message by type.
 */

export function* updateEvent({ props }) {
	try {
		yield put(hideServerMessage());

		const res = yield call(app.put, "event/update", { ...props });
		const message = yield call(parseMessage, res);

		yield put(
			setServerMessage({
				type: "success",
				message,
			}),
		);

		yield put(push("/employee/events/viewall"));
	} catch (e) {
		yield put(setServerMessage({ type: "error", message: e.toString() }));
	}
}

/**
 * Attempts to update an existing event.
 *
 * @generator
 * @function updateEventSchedule
 * @param {object} props - contains event schedule data ([{ callTime, userIds }]).
 * @yields {object} - A response from a call to the API.
 * @function parseMessage - Returns a parsed res.data.message.
 * @yields {action} - A redux action to display a server message by type.
 * @yields {action} - A redux action to push to a URL.
 * @throws {action} - A redux action to display a server message by type.
 */

export function* updateEventSchedule({ props }) {
	try {
		yield put(hideServerMessage());

		const res = yield call(app.put, "event/update/schedule", { ...props });
		const message = yield call(parseMessage, res);

		yield put(
			setServerMessage({
				type: "success",
				message,
			}),
		);

		yield put(push("/employee/events/viewall"));
	} catch (e) {
		yield put(setServerMessage({ type: "error", message: e.toString() }));
	}
}

/**
 * Creates watchers for all generators.
 *
 * @generator
 * @function eventsSagas
 * @yields {watchers}
 */
export default function* eventsSagas() {
	yield all([
		takeLatest(types.EVENTS_CREATE, createEvent),
		takeLatest(types.EVENTS_DELETE, deleteEvent),
		takeLatest(types.EVENTS_EDIT, fetchEvent),
		takeLatest(types.EVENTS_FETCH, fetchEvents),
		takeLatest(types.EVENTS_FETCH_SCHEDULE, fetchEventForScheduling),
		takeLatest(types.EVENTS_FETCH_SCHEDULE_EVENTS, fetchScheduleEvents),
		takeLatest(types.EVENTS_INIT_NEW_EVENT, initializeNewEvent),
		takeLatest(types.EVENTS_RESEND_MAIL, resendEventEmails),
		takeLatest(types.EVENTS_UPDATE, updateEvent),
		takeLatest(types.EVENTS_UPDATE_SCHEDULE, updateEventSchedule),
	]);
}
