import { push } from "connected-react-router";
import { all, put, call, takeLatest } from "redux-saga/effects";
import { app } from "utils";
import { setServerMessage } from "actions/Messages";
import { setMemberToEdit, setMembers } from "actions/Members";
import { parseData, parseMessage } from "utils/parseResponse";
import * as types from "types";

/**
 * Attempts to create a new member.
 *
 * @generator
 * @function createMember
 * @param {object} props - props contain memberID and member fields.
 * @yields {object} - A response from a call to the API.
 * @function parseMessage - Returns a parsed res.data.message.
 * @yields {action} - A redux action to display a server message by type.
 * @yields {action} - A redux action to push to a URL.
 * @throws {action} - A redux action to display a server message by type.
 */

// export function* createMember({ props }) {
// 	try {
// 		const res = yield call(app.post, "member/create", { ...props });
// 		const message = yield call(parseMessage, res);

// 		yield put(
// 			setServerMessage({
// 				type: "success",
// 				message,
// 			}),
// 		);

// 		yield put(push("/employee/members/viewall"));
// 	} catch (e) {
// 		yield put(setServerMessage({ type: "error", message: e.toString() }));
// 	}
// }

/**
 * Attempts to create a new member.
 *
 * @generator
 * @function deletemember
 * @param {object} props - props contain memberID and member fields.
 * @yields {object} - A response from a call to the API.
 * @function parseMessage - Returns a parsed res.data.message.
 * @yields {action} - A redux action to display a server message by type.
 * @yields {action} - A redux action to push to a URL.
 * @throws {action} - A redux action to display a server message by type.
 */

// export function* deleteMember({ memberId }) {
// 	try {
// 		const res = yield call(app.delete, `member/delete/${memberId}`);
// 		const message = yield call(parseMessage, res);

// 		yield put(
// 			setServerMessage({
// 				type: "success",
// 				message,
// 			}),
// 		);

// 		yield put({ type: types.MEMBERS_FETCH });
// 	} catch (e) {
// 		yield put(setServerMessage({ type: "error", message: e.toString() }));
// 	}
// }

/**
 * Attempts to get a single member for editing.
 *
 * @generator
 * @function fetchMember
 * @yields {object} - A response from a call to the API.
 * @function parseData - Returns a parsed res.data.
 * @yields {action} - A redux action to set member data to redux state.
 * @throws {action} - A redux action to display a server message by type.
 */

// export function* fetchMember({ memberId }) {
// 	try {
// 		const res = yield call(app.get, `member/edit/${memberId}`);
// 		const data = yield call(parseData, res);

// 		yield put(setMemberToEdit(data));
// 	} catch (e) {
// 		yield put(setServerMessage({ type: "error", message: e.toString() }));
// 	}
// }

/**
 * Attempts to get all members.
 *
 * @generator
 * @function fetchMembers
 * @yields {object} - A response from a call to the API.
 * @function parseData - Returns a parsed res.data.
 * @yields {action} - A redux action to set member data to redux state.
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
 * Attempts to update an existing member.
 *
 * @generator
 * @function updateMember
 * @param {object} props - props contain memberID and member fields.
 * @yields {object} - A response from a call to the API.
 * @function parseMessage - Returns a parsed res.data.message.
 * @yields {action} - A redux action to display a server message by type.
 * @yields {action} - A redux action to push to a URL.
 * @throws {action} - A redux action to display a server message by type.
 */

// export function* updateMember({ props }) {
// 	try {
// 		const res = yield call(app.put, "member/update", { ...props });
// 		const message = yield call(parseMessage, res);

// 		yield put(
// 			setServerMessage({
// 				type: "success",
// 				message,
// 			}),
// 		);

// 		yield put(push("/employee/members/viewall"));
// 	} catch (e) {
// 		yield put(setServerMessage({ type: "error", message: e.toString() }));
// 	}
// }

/**
 * Creates watchers for all generators.
 *
 * @generator
 * @function membersSagas
 * @yields {watchers}
 */
export default function* membersSagas() {
	yield all([
		// takeLatest(types.MEMBERS_EDIT, fetchMember),
		// takeLatest(types.MEMBERS_CREATE, createMember),
		// takeLatest(types.MEMBERS_DELETE, deleteMember),
		takeLatest(types.MEMBERS_FETCH, fetchMembers),
		// takeLatest(types.MEMBERS_UPDATE_EDIT, updateMember),
	]);
}
