import { push } from "connected-react-router";
import { all, put, call, takeLatest } from "redux-saga/effects";
import { app } from "utils";
import { setServerMessage } from "actions/Messages";
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

		yield put(push("/employee/seasons/members"));
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
	yield all([takeLatest(types.SEASONS_CREATE, createSeason)]);
}
