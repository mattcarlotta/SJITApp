import { push } from "connected-react-router";
import { expectSaga, testSaga } from "redux-saga-test-plan";
import { app } from "utils";
import * as types from "types";
import * as actions from "actions/Members";
import { hideServerMessage, setServerMessage } from "actions/Messages";
import * as sagas from "sagas/Members";
import * as mocks from "sagas/__mocks__/sagas.mocks";
import messageReducer from "reducers/Messages";
import memberReducer from "reducers/Members";
import { parseData, parseMessage } from "utils/parseResponse";

const memberId = "124567890";
const tokenId = "0123456789";

describe("member Sagas", () => {
	afterEach(() => {
		mockApp.reset();
	});

	afterAll(() => {
		mockApp.restore();
	});

	describe("Create Member", () => {
		let message;
		let props;
		beforeEach(() => {
			message = "Successfully created a new member!";
			props = mocks.newMember;
		});

		it("logical flow matches pattern for a create member request", () => {
			const res = { data: { message } };

			testSaga(sagas.createMember, { props })
				.next()
				.call(app.post, "token/create", { ...props })
				.next(res)
				.call(parseMessage, res)
				.next(res.data.message)
				.put(setServerMessage({ type: "success", message: res.data.message }))
				.next()
				.put(push("/employee/members/authorizations/viewall"))
				.next()
				.isDone();
		});

		it("successfully creates a new member", async () => {
			mockApp.onPost("token/create").reply(200, { message });

			return expectSaga(sagas.createMember, { props })
				.dispatch(actions.createMember)
				.withReducer(messageReducer)
				.hasFinalState({
					message,
					show: true,
					type: "success",
				})
				.run();
		});

		it("if API call fails, it displays a message", async () => {
			const err = "Unable to create a new member authorization.";
			mockApp.onPost("token/create").reply(404, { err });

			return expectSaga(sagas.createMember, { props })
				.dispatch(actions.createMember)
				.withReducer(messageReducer)
				.hasFinalState({
					message: err,
					show: true,
					type: "error",
				})
				.run();
		});
	});

	describe("Delete Member", () => {
		it("logical flow matches pattern for delete member requests", () => {
			const message = "Successfully deleted member.";
			const res = { data: { message } };

			testSaga(sagas.deleteMember, { memberId })
				.next()
				.put(hideServerMessage())
				.next()
				.call(app.delete, `member/delete/${memberId}`)
				.next(res)
				.call(parseMessage, res)
				.next(res.data.message)
				.put(setServerMessage({ type: "success", message: res.data.message }))
				.next()
				.put({ type: types.MEMBERS_FETCH })
				.next()
				.isDone();
		});

		it("successfully deletes a member", async () => {
			const message = "Successfully deleted the member.";
			mockApp.onDelete(`member/delete/${memberId}`).reply(200, { message });

			return expectSaga(sagas.deleteMember, { memberId })
				.dispatch(actions.deleteMember)
				.withReducer(messageReducer)
				.hasFinalState({
					message,
					show: true,
					type: "success",
				})
				.run();
		});

		it("if API call fails, it displays a message", async () => {
			const err = "Unable to delete the member.";
			mockApp.onDelete(`member/delete/${memberId}`).reply(404, { err });

			return expectSaga(sagas.deleteMember, { memberId })
				.dispatch(actions.deleteMember)
				.withReducer(messageReducer)
				.hasFinalState({
					message: err,
					show: true,
					type: "error",
				})
				.run();
		});
	});

	describe("Delete Token", () => {
		it("logical flow matches pattern for delete member token requests", () => {
			const message = "Successfully deleted member authorization token.";
			const res = { data: { message } };

			testSaga(sagas.deleteToken, { tokenId })
				.next()
				.put(hideServerMessage())
				.next()
				.call(app.delete, `token/delete/${tokenId}`)
				.next(res)
				.call(parseMessage, res)
				.next(res.data.message)
				.put(setServerMessage({ type: "success", message: res.data.message }))
				.next()
				.put({ type: types.MEMBERS_FETCH_TOKENS })
				.next()
				.isDone();
		});

		it("successfully deletes a member token", async () => {
			const message = "Successfully deleted the member token.";
			mockApp.onDelete(`token/delete/${tokenId}`).reply(200, { message });

			return expectSaga(sagas.deleteToken, { tokenId })
				.dispatch(actions.deleteToken)
				.withReducer(messageReducer)
				.hasFinalState({
					message,
					show: true,
					type: "success",
				})
				.run();
		});

		it("if API call fails, it displays a message", async () => {
			const err = "Unable to delete the member.";
			mockApp.onDelete(`token/delete/${tokenId}`).reply(404, { err });

			return expectSaga(sagas.deleteToken, { tokenId })
				.dispatch(actions.deleteToken)
				.withReducer(messageReducer)
				.hasFinalState({
					message: err,
					show: true,
					type: "error",
				})
				.run();
		});
	});

	describe("Fetch Profile", () => {
		let data;
		beforeEach(() => {
			data = { member: mocks.membersData };
		});

		it("logical flow matches pattern for fetch member requests", () => {
			const res = { data };

			testSaga(sagas.fetchProfile, { memberId })
				.next()
				.call(app.get, `member/review/${memberId}`)
				.next(res)
				.call(parseData, res)
				.next(res.data)
				.put(actions.setMemberToReview(res.data))
				.next()
				.isDone();
		});

		it("successfully fetches an existing member", async () => {
			mockApp.onGet(`member/review/${memberId}`).reply(200, data);

			return expectSaga(sagas.fetchProfile, { memberId })
				.dispatch(actions.fetchMember)
				.withReducer(memberReducer)
				.hasFinalState({
					data: [],
					tokens: [],
					editToken: {},
					isLoading: false,
					viewMember: mocks.membersData,
				})
				.run();
		});

		it("if API call fails, it displays a message", () => {
			const err = "Unable to fetch that member.";
			mockApp.onGet(`member/review/${memberId}`).reply(404, { err });

			return expectSaga(sagas.fetchProfile, { memberId })
				.dispatch(actions.fetchMember)
				.withReducer(messageReducer)
				.hasFinalState({
					message: err,
					show: true,
					type: "error",
				})
				.run();
		});
	});

	describe("Fetch Members", () => {
		let data;
		beforeEach(() => {
			data = { members: mocks.membersData };
		});

		it("logical flow matches pattern for fetch members requests", () => {
			const res = { data };

			testSaga(sagas.fetchMembers)
				.next()
				.call(app.get, "members/all")
				.next(res)
				.call(parseData, res)
				.next(res.data)
				.put(actions.setMembers(res.data))
				.next()
				.isDone();
		});

		it("successfully fetches a member for editing", async () => {
			mockApp.onGet("members/all").reply(200, data);

			return expectSaga(sagas.fetchMembers)
				.dispatch(actions.fetchMembers)
				.withReducer(memberReducer)
				.hasFinalState({
					data: mocks.membersData,
					tokens: [],
					editToken: {},
					viewMember: {},
					isLoading: false,
				})
				.run();
		});

		it("if API call fails, it displays a message", async () => {
			const err = "Unable to fetch members.";
			mockApp.onGet("members/all").reply(404, { err });

			return expectSaga(sagas.fetchMembers)
				.dispatch(actions.fetchMembers)
				.withReducer(messageReducer)
				.hasFinalState({
					message: err,
					show: true,
					type: "error",
				})
				.run();
		});
	});

	describe("Fetch Token", () => {
		let data;
		beforeEach(() => {
			data = { token: mocks.tokensData };
		});

		it("logical flow matches pattern for fetch member token requests", () => {
			const res = { data };

			testSaga(sagas.fetchToken, { tokenId })
				.next()
				.put(hideServerMessage())
				.next()
				.call(app.get, `token/edit/${tokenId}`)
				.next(res)
				.call(parseData, res)
				.next(res.data)
				.put(actions.setToken(res.data))
				.next()
				.isDone();
		});

		it("successfully fetches a member token for editing", async () => {
			mockApp.onGet(`token/edit/${tokenId}`).reply(200, data);

			return expectSaga(sagas.fetchToken, { tokenId })
				.dispatch(actions.fetchToken)
				.withReducer(memberReducer)
				.hasFinalState({
					data: [],
					tokens: [],
					editToken: mocks.tokensData,
					viewMember: {},
					isLoading: false,
				})
				.run();
		});

		it("if API call fails, it displays a message", async () => {
			const err = "Unable to fetch that token.";
			mockApp.onGet(`token/edit/${tokenId}`).reply(404, { err });

			return expectSaga(sagas.fetchToken, { tokenId })
				.dispatch(actions.fetchToken)
				.withReducer(messageReducer)
				.hasFinalState({
					message: err,
					show: true,
					type: "error",
				})
				.run();
		});
	});

	describe("Fetch Tokens", () => {
		let data;
		beforeEach(() => {
			data = { tokens: mocks.tokensData };
		});

		it("logical flow matches pattern for fetch member tokens requests", () => {
			const res = { data };

			testSaga(sagas.fetchTokens)
				.next()
				.call(app.get, "tokens/all")
				.next(res)
				.call(parseData, res)
				.next(res.data)
				.put(actions.setTokens(res.data))
				.next()
				.isDone();
		});

		it("successfully fetches a member for editing", async () => {
			mockApp.onGet("tokens/all").reply(200, data);

			return expectSaga(sagas.fetchTokens)
				.dispatch(actions.fetchTokens)
				.withReducer(memberReducer)
				.hasFinalState({
					data: [],
					tokens: mocks.tokensData,
					editToken: {},
					viewMember: {},
					isLoading: false,
				})
				.run();
		});

		it("if API call fails, it displays a message", async () => {
			const err = "Unable to fetch tokens.";
			mockApp.onGet("tokens/all").reply(404, { err });

			return expectSaga(sagas.fetchTokens)
				.dispatch(actions.fetchTokens)
				.withReducer(messageReducer)
				.hasFinalState({
					message: err,
					show: true,
					type: "error",
				})
				.run();
		});
	});

	describe("Update Member", () => {
		let message;
		let props;
		beforeEach(() => {
			message = "Successfully updated the member!";
			props = mocks.membersData;
		});

		it("logical flow matches pattern for update member requests", () => {
			const res = { data: { message } };

			testSaga(sagas.updateMember, { props })
				.next()
				.call(app.put, "member/update", { ...props })
				.next(res)
				.call(parseMessage, res)
				.next(res.data.message)
				.put(setServerMessage({ type: "info", message: res.data.message }))
				.next(props)
				.put(actions.fetchMember(props._id))
				.next()
				.isDone();
		});

		it("successfully updates a member", async () => {
			mockApp.onPut("member/update").reply(200, { message });

			return expectSaga(sagas.updateMember, { props })
				.dispatch(actions.updateMember)
				.withReducer(messageReducer)
				.hasFinalState({
					message,
					show: true,
					type: "info",
				})
				.run();
		});

		it("if API call fails, it displays a message", async () => {
			const err = "Unable to delete the member.";
			mockApp.onPut("member/update").reply(404, { err });

			return expectSaga(sagas.updateMember, { props })
				.dispatch(actions.updateMember)
				.withReducer(messageReducer)
				.hasFinalState({
					message: err,
					show: true,
					type: "error",
				})
				.run();
		});
	});

	describe("Update Member Status", () => {
		let message;
		let props;
		beforeEach(() => {
			message = "Successfully updated the member!";
			props = mocks.membersData;
		});

		it("logical flow matches pattern for update member status requests", () => {
			const res = { data: { message } };

			testSaga(sagas.updateMemberStatus, { props })
				.next()
				.put(hideServerMessage())
				.next()
				.call(app.put, "member/updatestatus", { ...props })
				.next(res)
				.call(parseMessage, res)
				.next(res.data.message)
				.put(setServerMessage({ type: "info", message: res.data.message }))
				.next(props)
				.put(actions.fetchMember(props._id))
				.next()
				.isDone();
		});

		it("successfully updates a member status", async () => {
			mockApp.onPut("member/updatestatus").reply(200, { message });

			return expectSaga(sagas.updateMemberStatus, { props })
				.dispatch(actions.updateMemberStatus)
				.withReducer(messageReducer)
				.hasFinalState({
					message,
					show: true,
					type: "info",
				})
				.run();
		});

		it("if API call fails, it displays a message", async () => {
			const err = "Unable to delete the member.";
			mockApp.onPut("member/updatestatus").reply(404, { err });

			return expectSaga(sagas.updateMemberStatus, { props })
				.dispatch(actions.updateMemberStatus)
				.withReducer(messageReducer)
				.hasFinalState({
					message: err,
					show: true,
					type: "error",
				})
				.run();
		});
	});

	describe("Update Member Token", () => {
		let message;
		let props;
		beforeEach(() => {
			message = "Successfully updated the member token!";
			props = mocks.tokensData;
		});

		it("logical flow matches pattern for update member token requests", () => {
			const res = { data: { message } };

			testSaga(sagas.updateMemberToken, { props })
				.next()
				.call(app.put, "token/update", { ...props })
				.next(res)
				.call(parseMessage, res)
				.next(res.data.message)
				.put(setServerMessage({ type: "info", message: res.data.message }))
				.next()
				.put(push("/employee/members/authorizations/viewall"))
				.next()
				.isDone();
		});

		it("successfully updates a member status", async () => {
			mockApp.onPut("token/update").reply(200, { message });

			return expectSaga(sagas.updateMemberToken, { props })
				.dispatch(actions.updateMemberToken, { props })
				.withReducer(messageReducer)
				.hasFinalState({
					message,
					show: true,
					type: "info",
				})
				.run();
		});

		it("if API call fails, it displays a message", async () => {
			const err = "Unable to delete the member.";
			mockApp.onPut("token/update").reply(404, { err });

			return expectSaga(sagas.updateMemberToken, { props })
				.dispatch(actions.updateMemberToken, { props })
				.withReducer(messageReducer)
				.hasFinalState({
					message: err,
					show: true,
					type: "error",
				})
				.run();
		});
	});
});
