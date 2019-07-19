import { push } from "connected-react-router";
import { all, put, call, takeLatest } from "redux-saga/effects";
import { app } from "utils";
import { setServerMessage } from "actions/Messages";
import { setSeasons } from "actions/Seasons";
import { parseData, parseMessage } from "utils/parseResponse";
import * as types from "types";

/**
 * Attempts to create a new season.
 *
 * @generator
 * @function createSeason
 * @param {object} props - props contain seasonID and season fields.
 * @yields {object} - A response from a call to the API.
 * @function parseMessage - Returns a parsed res.data.message.
 * @yields {action} - A redux action to display a server message by type.
 * @yields {action} - A redux action to push to a URL.
 * @throws {action} - A redux action to display a server message by type.
 */

export function* createSeason({ props }) {
	try {
		const res = yield call(app.post, "season/create", { ...props });
		const message = yield call(parseMessage, res);

		yield put(
			setServerMessage({
				type: "success",
				message,
			}),
		);

		yield put(push("/employee/seasons/viewall"));
	} catch (e) {
		yield put(setServerMessage({ type: "error", message: e.toString() }));
	}
}

/**
 * Attempts to get all seasons.
 *
 * @generator
 * @function getSeasons
 * @yields {object} - A response from a call to the API.
 * @function parseData - Returns a parsed res.data.
 * @yields {action} - A redux action to set season data to redux state.
 * @throws {action} - A redux action to display a server message by type.
 */

export function* getSeasons() {
	try {
		const res = yield call(app.get, "seasons/all");
		const data = yield call(parseData, res);

		yield put(setSeasons(data));
	} catch (e) {
		yield put(setServerMessage({ type: "error", message: e.toString() }));
	}
}

/**
 * Creates watchers for all generators.
 *
 * @generator
 * @function seasonsSagas
 * @yields {watchers}
 */
export default function* seasonsSagas() {
	yield all([
		takeLatest(types.SEASONS_CREATE, createSeason),
		takeLatest(types.SEASONS_GET, getSeasons),
	]);
}
