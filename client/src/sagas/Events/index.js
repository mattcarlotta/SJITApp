import { push } from "connected-react-router";
import { all, put, call, takeLatest } from "redux-saga/effects";
import { app } from "utils";
import { hideServerMessage, setServerMessage } from "actions/Messages";
import {
	// fetchMember,
	// setMemberToReview,
	setEvents,
	// setToken,
	// setTokens,
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
 * Creates watchers for all generators.
 *
 * @generator
 * @function eventsSagas
 * @yields {watchers}
 */
export default function* eventsSagas() {
	yield all([
		takeLatest(types.EVENTS_CREATE, createEvent),
		// takeLatest(types.MEMBERS_DELETE, deleteMember),
		// takeLatest(types.MEMBERS_DELETE_TOKEN, deleteToken),
		// takeLatest(types.MEMBERS_REVIEW, fetchProfile),
		takeLatest(types.EVENTS_FETCH, fetchEvents),
		// takeLatest(types.MEMBERS_FETCH_TOKEN, fetchToken),
		// takeLatest(types.MEMBERS_FETCH_TOKENS, fetchTokens),
		// takeLatest(types.MEMBERS_UPDATE, updateMember),
		// takeLatest(types.MEMBERS_UPDATE_STATUS, updateMemberStatus),
		// takeLatest(types.MEMBERS_UPDATE_TOKEN, updateMemberToken),
	]);
}
