import { all, put, call, takeLatest } from "redux-saga/effects";
import { app } from "utils";
import { setServerMessage } from "actions/Messages";
import {
	setAPForm,
	setAvailability,
	setEventDistribution,
	setEvents,
} from "actions/Dashboard";
import { parseData } from "utils/parseResponse";
import * as types from "types";

/**
 * Attempts to get AP form for dashboard viewing.
 *
 * @generator
 * @function fetchAPForm
 * @yields {object} - A response from a call to the API.
 * @function parseData - Returns a parsed res.data.
 * @yields {action} - A redux action to set event data to redux state.
 * @throws {action} - A redux action to display a server message by type.
 */

export function* fetchAPForm() {
	try {
		const res = yield call(app.get, `dashboard/ap-form`);
		const data = yield call(parseData, res);

		yield put(setAPForm(data));
	} catch (e) {
		yield put(setServerMessage({ type: "error", message: e.toString() }));
	}
}

/**
 * Attempts to get event availability for dashboard viewing.
 *
 * @generator
 * @function fetchAvailability
 * @yields {object} - A response from a call to the API.
 * @function parseData - Returns a parsed res.data.
 * @yields {action} - A redux action to set event data to redux state.
 * @throws {action} - A redux action to display a server message by type.
 */

export function* fetchAvailability() {
	try {
		const res = yield call(app.get, `dashboard/availability`);
		const data = yield call(parseData, res);

		yield put(setAvailability(data));
	} catch (e) {
		yield put(setServerMessage({ type: "error", message: e.toString() }));
	}
}

/**
 * Attempts to get event distribution for dashboard viewing.
 *
 * @generator
 * @function fetchEventDistribution
 * @param {object} params - startDate and endDate
 * @yields {object} - A response from a call to the API.
 * @function parseData - Returns a parsed res.data.
 * @yields {action} - A redux action to set event data to redux state.
 * @throws {action} - A redux action to display a server message by type.
 */

export function* fetchEventDistribution({ params }) {
	try {
		const res = yield call(app.get, `dashboard/event-distribution`, {
			params: { ...params },
		});
		const data = yield call(parseData, res);

		yield put(setEventDistribution(data));
	} catch (e) {
		yield put(setServerMessage({ type: "error", message: e.toString() }));
	}
}

/**
 * Attempts to get event for dashboard viewing.
 *
 * @generator
 * @function fetchEvents
 * @param {string} eventId
 * @yields {object} - A response from a call to the API.
 * @function parseData - Returns a parsed res.data.
 * @yields {action} - A redux action to set event data to redux state.
 * @throws {action} - A redux action to display a server message by type.
 */

export function* fetchEvents({ selectedEvent }) {
	try {
		const res = yield call(app.get, `dashboard/events/${selectedEvent}`);
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
 * @function dashboardSagas
 * @yields {watchers}
 */
export default function* dashboardSagas() {
	yield all([
		takeLatest(types.DASHBOARD_FETCH_APFORM, fetchAPForm),
		takeLatest(types.DASHBOARD_FETCH_AVAILABILITY, fetchAvailability),
		takeLatest(types.DASHBOARD_FETCH_EVENTS, fetchEvents),
		takeLatest(
			types.DASHBOARD_FETCH_EVENT_DISTRIBUTION,
			fetchEventDistribution,
		),
	]);
}
