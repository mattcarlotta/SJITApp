import { goBack, push } from "connected-react-router";
import { all, put, call, takeLatest } from "redux-saga/effects";
import { app } from "utils";
import { hideServerMessage, setServerMessage } from "actions/Messages";
import * as actions from "actions/Seasons";
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
		yield put(hideServerMessage());

		const res = yield call(app.post, "season/create", { ...props });
		const message = yield call(parseMessage, res);

		yield put(
			setServerMessage({
				type: "success",
				message,
			}),
		);

		yield put(push("/employee/seasons/viewall?page=1"));
	} catch (e) {
		yield put(setServerMessage({ type: "error", message: e.toString() }));
	}
}

/**
 * Attempts to create a new season.
 *
 * @generator
 * @function deleteSeason
 * @param {object} - seasonId and query
 * @yields {object} - A response from a call to the API.
 * @function parseMessage - Returns a parsed res.data.message.
 * @yields {action} - A redux action to display a server message by type.
 * @yields {action} - A redux action to push to a URL.
 * @throws {action} - A redux action to display a server message by type.
 */

export function* deleteSeason({ seasonId, query }) {
	try {
		yield put(hideServerMessage());

		const res = yield call(app.delete, `season/delete/${seasonId}`);
		const message = yield call(parseMessage, res);

		yield put(
			setServerMessage({
				type: "success",
				message,
			}),
		);

		yield put(actions.fetchSeasons(query));
	} catch (e) {
		yield put(setServerMessage({ type: "error", message: e.toString() }));
	}
}

/**
 * Attempts to get a single season for editing.
 *
 * @generator
 * @function fetchSeason
 * @yields {object} - A response from a call to the API.
 * @function parseData - Returns a parsed res.data.
 * @yields {action} - A redux action to set season data to redux state.
 * @throws {action} - A redux action to display a server message by type.
 */

export function* fetchSeason({ seasonId }) {
	try {
		yield put(hideServerMessage());

		const res = yield call(app.get, `season/edit/${seasonId}`);
		const data = yield call(parseData, res);

		yield put(actions.setSeasonToEdit(data));
	} catch (e) {
		yield put(setServerMessage({ type: "error", message: e.toString() }));
	}
}

/**
 * Attempts to get all seasons.
 *
 * @generator
 * @function fetchSeasons
 * @param {string} query
 * @yields {object} - A response from a call to the API.
 * @function parseData - Returns a parsed res.data.
 * @yields {action} - A redux action to set season data to redux state.
 * @throws {action} - A redux action to display a server message by type.
 */

export function* fetchSeasons({ query }) {
	try {
		const res = yield call(app.get, `seasons/all?${query}`);
		const data = yield call(parseData, res);

		yield put(actions.setSeasons(data));
	} catch (e) {
		yield put(setServerMessage({ type: "error", message: e.toString() }));
	}
}

/**
 * Attempts to get all seasons ids.
 *
 * @generator
 * @function fetchSeasonsIds
 * @yields {object} - A response from a call to the API.
 * @function parseData - Returns a parsed res.data.
 * @yields {action} - A redux action to set season data to redux state.
 * @throws {action} - A redux action to display a server message by type.
 */

export function* fetchSeasonsIds() {
	try {
		yield put(hideServerMessage());

		const res = yield call(app.get, "seasons/all/ids");
		const data = yield call(parseData, res);

		yield put(actions.setSeasonsIds(data));
	} catch (e) {
		yield put(setServerMessage({ type: "error", message: e.toString() }));
	}
}

/**
 * Attempts to update an existing season.
 *
 * @generator
 * @function updateSeason
 * @param {object} props - props contain seasonID and season fields.
 * @yields {object} - A response from a call to the API.
 * @function parseMessage - Returns a parsed res.data.message.
 * @yields {action} - A redux action to display a server message by type.
 * @yields {action} - A redux action to push to a URL.
 * @throws {action} - A redux action to display a server message by type.
 */

export function* updateSeason({ props }) {
	try {
		yield put(hideServerMessage());

		const res = yield call(app.put, "season/update", { ...props });
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
 * @function seasonsSagas
 * @yields {watchers}
 */
export default function* seasonsSagas() {
	yield all([
		takeLatest(types.SEASONS_EDIT, fetchSeason),
		takeLatest(types.SEASONS_CREATE, createSeason),
		takeLatest(types.SEASONS_DELETE, deleteSeason),
		takeLatest(types.SEASONS_FETCH, fetchSeasons),
		takeLatest(types.SEASONS_FETCH_IDS, fetchSeasonsIds),
		takeLatest(types.SEASONS_UPDATE_EDIT, updateSeason),
	]);
}
