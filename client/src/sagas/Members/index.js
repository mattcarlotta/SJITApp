import { push } from "connected-react-router";
import { all, put, call, takeLatest } from "redux-saga/effects";
import { app } from "utils";
import { hideServerMessage, setServerMessage } from "actions/Messages";
import {
	fetchMember,
	setMemberToReview,
	setMembers,
	setToken,
	setTokens,
} from "actions/Members";
import { parseData, parseMessage } from "utils/parseResponse";
import * as types from "types";

/**
 * Attempts to create a new member.
 *
 * @generator
 * @function createMember
 * @param {object} props - props contain seasonId, role and authorized email fields.
 * @yields {object} - A response from a call to the API.
 * @function parseMessage - Returns a parsed res.data.message.
 * @yields {action} - A redux action to display a server message by type.
 * @yields {action} - A redux action to push to a URL.
 * @throws {action} - A redux action to display a server message by type.
 */

export function* createMember({ props }) {
	try {
		yield put(hideServerMessage());

		const res = yield call(app.post, "token/create", { ...props });
		const message = yield call(parseMessage, res);

		yield put(
			setServerMessage({
				type: "success",
				message,
			}),
		);

		yield put(push("/employee/members/authorizations/viewall"));
	} catch (e) {
		yield put(setServerMessage({ type: "error", message: e.toString() }));
	}
}

/**
 * Attempts to delete a member.
 *
 * @generator
 * @function deleteMember
 * @param {object} memberId
 * @yields {object} - A response from a call to the API.
 * @function parseMessage - Returns a parsed res.data.message.
 * @yields {action} - A redux action to display a server message by type.
 * @yields {action} - A redux action to fetch members data again.
 * @throws {action} - A redux action to display a server message by type.
 */

export function* deleteMember({ memberId }) {
	try {
		yield put(hideServerMessage());

		const res = yield call(app.delete, `member/delete/${memberId}`);
		const message = yield call(parseMessage, res);

		yield put(
			setServerMessage({
				type: "success",
				message,
			}),
		);

		yield put({ type: types.MEMBERS_FETCH });
	} catch (e) {
		yield put(setServerMessage({ type: "error", message: e.toString() }));
	}
}

/**
 * Attempts to delete a token.
 *
 * @generator
 * @function deleteToken
 * @param {object} tokenId
 * @yields {object} - A response from a call to the API.
 * @function parseMessage - Returns a parsed res.data.message.
 * @yields {action} - A redux action to display a server message by type.
 * @yields {action} - A redux action to fetch tokens data again.
 * @throws {action} - A redux action to display a server message by type.
 */

export function* deleteToken({ tokenId }) {
	try {
		yield put(hideServerMessage());

		const res = yield call(app.delete, `token/delete/${tokenId}`);
		const message = yield call(parseMessage, res);

		yield put(
			setServerMessage({
				type: "success",
				message,
			}),
		);

		yield put({ type: types.MEMBERS_FETCH_TOKENS });
	} catch (e) {
		yield put(setServerMessage({ type: "error", message: e.toString() }));
	}
}

/**
 * Attempts to get a single member profile for review/editing.
 *
 * @generator
 * @function fetchProfile
 * @param {object} tokenId
 * @yields {object} - A response from a call to the API.
 * @function parseData - Returns a parsed res.data.
 * @yields {action} - A redux action to set member data to redux state.
 * @throws {action} - A redux action to display a server message by type.
 */

export function* fetchProfile({ memberId }) {
	try {
		const res = yield call(app.get, `member/review/${memberId}`);
		const data = yield call(parseData, res);

		yield put(setMemberToReview(data));
	} catch (e) {
		yield put(push("/employee/members/viewall"));
		yield put(setServerMessage({ type: "error", message: e.toString() }));
	}
}

/**
 * Attempts to get all members.
 *
 * @generator
 * @function fetchMembers
 * @yields {object} - A response from a call to the API.
 * @function parseData - Returns a parsed res.data.
 * @yields {action} - A redux action to set members data to redux state.
 * @throws {action} - A redux action to display a server message by type.
 */

export function* fetchMembers() {
	try {
		const res = yield call(app.get, "members/all");
		const data = yield call(parseData, res);

		yield put(setMembers(data));
	} catch (e) {
		yield put(setServerMessage({ type: "error", message: e.toString() }));
	}
}

/**
 * Attempts to fetch a token for editing.
 *
 * @generator
 * @function fetchToken
 * @yields {object} - A response from a call to the API.
 * @function parseData - Returns a parsed res.data.
 * @yields {action} - A redux action to set token data to redux state.
 * @throws {action} - A redux action to display a server message by type.
 */

export function* fetchToken({ tokenId }) {
	try {
		yield put(hideServerMessage());

		const res = yield call(app.get, `token/edit/${tokenId}`);
		const data = yield call(parseData, res);

		const res2 = yield call(app.get, "seasons/all/ids");
		const data2 = yield call(parseData, res2);

		yield put(setToken({ ...data.token, seasonIds: data2.seasonIds }));
	} catch (e) {
		yield put(setServerMessage({ type: "error", message: e.toString() }));
	}
}

/**
 * Attempts to fetch a token for editing.
 *
 * @generator
 * @function fetchTokens
 * @yields {object} - A response from a call to the API.
 * @function parseData - Returns a parsed res.data.
 * @yields {action} - A redux action to set tokens data to redux state.
 * @throws {action} - A redux action to display a server message by type.
 */

export function* fetchTokens() {
	try {
		const res = yield call(app.get, "tokens/all");
		const data = yield call(parseData, res);

		yield put(setTokens(data));
	} catch (e) {
		yield put(setServerMessage({ type: "error", message: e.toString() }));
	}
}

/**
 * Attempts to update an existing member.
 *
 * @generator
 * @function updateMember
 * @param {object} props - props contain id, email, firstName, lastName and role.
 * @yields {object} - A response from a call to the API.
 * @function parseMessage - Returns a parsed res.data.message.
 * @yields {action} - A redux action to display a server message by type.
 * @yields {action} - A redux action to fetch member by id to update data..
 * @throws {action} - A redux action to display a server message by type.
 */

export function* updateMember({ props }) {
	try {
		yield put(hideServerMessage());

		const res = yield call(app.put, "member/update", { ...props });
		const message = yield call(parseMessage, res);

		yield put(
			setServerMessage({
				type: "info",
				message,
			}),
		);

		yield put(fetchMember(props._id));
	} catch (e) {
		yield put(setServerMessage({ type: "error", message: e.toString() }));
	}
}

/**
 * Attempts to update an existing member.
 *
 * @generator
 * @function updateMemberStatus
 * @param {object} props - props contain id and status.
 * @yields {object} - A response from a call to the API.
 * @function parseMessage - Returns a parsed res.data.message.
 * @yields {action} - A redux action to display a server message by type.
 * @yields {action} - A redux action to fetch member by id to update data.
 * @throws {action} - A redux action to display a server message by type.
 */

export function* updateMemberStatus({ props }) {
	try {
		yield put(hideServerMessage());

		const res = yield call(app.put, "member/updatestatus", { ...props });
		const message = yield call(parseMessage, res);

		yield put(
			setServerMessage({
				type: "info",
				message,
			}),
		);

		yield put(fetchMember(props._id));
	} catch (e) {
		yield put(setServerMessage({ type: "error", message: e.toString() }));
	}
}

/**
 * Attempts to update an existing member token.
 *
 * @generator
 * @function updateMemberToken
 * @param {object} props - props contain id, seasonId, role and authorizedEmail.
 * @yields {object} - A response from a call to the API.
 * @function parseMessage - Returns a parsed res.data.message.
 * @yields {action} - A redux action to display a server message by type.
 * @yields {action} - A redux action to push to a URL.
 * @throws {action} - A redux action to display a server message by type.
 */

export function* updateMemberToken({ props }) {
	try {
		yield put(hideServerMessage());

		const res = yield call(app.put, "token/update", { ...props });
		const message = yield call(parseMessage, res);

		yield put(
			setServerMessage({
				type: "info",
				message,
			}),
		);

		yield put(push("/employee/members/authorizations/viewall"));
	} catch (e) {
		yield put(setServerMessage({ type: "error", message: e.toString() }));
	}
}

/**
 * Creates watchers for all generators.
 *
 * @generator
 * @function membersSagas
 * @yields {watchers}
 */
export default function* membersSagas() {
	yield all([
		takeLatest(types.MEMBERS_CREATE, createMember),
		takeLatest(types.MEMBERS_DELETE, deleteMember),
		takeLatest(types.MEMBERS_DELETE_TOKEN, deleteToken),
		takeLatest(types.MEMBERS_REVIEW, fetchProfile),
		takeLatest(types.MEMBERS_FETCH, fetchMembers),
		takeLatest(types.MEMBERS_FETCH_TOKEN, fetchToken),
		takeLatest(types.MEMBERS_FETCH_TOKENS, fetchTokens),
		takeLatest(types.MEMBERS_UPDATE, updateMember),
		takeLatest(types.MEMBERS_UPDATE_STATUS, updateMemberStatus),
		takeLatest(types.MEMBERS_UPDATE_TOKEN, updateMemberToken),
	]);
}
