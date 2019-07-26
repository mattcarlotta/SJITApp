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

describe("Season Sagas", () => {
	afterEach(() => {
		mockApp.reset();
	});

	afterAll(() => {
		mockApp.restore();
	});

	// describe("Create Season", () => {
	// 	let message;
	// 	let props;
	// 	beforeEach(() => {
	// 		message = "Successfully created a new season!";
	// 		props = mocks.newSeason;
	// 	});

	// 	it("logical flow matches pattern for a create season request", () => {
	// 		const res = { data: { message } };

	// 		testSaga(sagas.createSeason, { props })
	// 			.next()
	// 			.call(app.post, "season/create", { ...props })
	// 			.next(res)
	// 			.call(parseMessage, res)
	// 			.next(res.data.message)
	// 			.put(setServerMessage({ type: "success", message: res.data.message }))
	// 			.next()
	// 			.put(push("/employee/seasons/viewall"))
	// 			.next()
	// 			.isDone();
	// 	});

	// 	it("successfully creates a new season", async () => {
	// 		mockApp.onPost("season/create").reply(200, { message });

	// 		return expectSaga(sagas.createSeason, { props })
	// 			.dispatch(actions.createSeason)
	// 			.withReducer(messageReducer)
	// 			.hasFinalState({
	// 				message,
	// 				show: true,
	// 				type: "success",
	// 			})
	// 			.run();
	// 	});

	// 	it("if API call fails, it displays a message", async () => {
	// 		const err = "Unable to create a new season.";
	// 		mockApp.onPost("season/create").reply(404, { err });

	// 		return expectSaga(sagas.createSeason, { props })
	// 			.dispatch(actions.createSeason)
	// 			.withReducer(messageReducer)
	// 			.hasFinalState({
	// 				message: err,
	// 				show: true,
	// 				type: "error",
	// 			})
	// 			.run();
	// 	});
	// });

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

	describe("Fetch Profile", () => {
		let data;
		beforeEach(() => {
			data = { member: mocks.membersData };
		});

		it("logical flow matches pattern for fetch season requests", () => {
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
					isLoading: false,
					viewMember: mocks.membersData,
				})
				.run();
		});

		it("if API call fails, it displays a message", () => {
			const err = "Unable to fetch that season.";
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

		it("successfully fetches a season for editing", async () => {
			mockApp.onGet("members/all").reply(200, data);

			return expectSaga(sagas.fetchMembers)
				.dispatch(actions.fetchMembers)
				.withReducer(memberReducer)
				.hasFinalState({
					data: mocks.membersData,
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

	// describe("Update Season", () => {
	// 	let message;
	// 	let props;
	// 	beforeEach(() => {
	// 		message = "Successfully updated the season!";
	// 		props = mocks.newSeason;
	// 	});

	// 	it("logical flow matches pattern for update season requests", () => {
	// 		const res = { data: { message } };

	// 		testSaga(sagas.updateSeason, { props })
	// 			.next()
	// 			.call(app.put, "season/update", { ...props })
	// 			.next(res)
	// 			.call(parseMessage, res)
	// 			.next(res.data.message)
	// 			.put(setServerMessage({ type: "success", message: res.data.message }))
	// 			.next()
	// 			.put(push("/employee/seasons/viewall"))
	// 			.next()
	// 			.isDone();
	// 	});

	// 	it("successfully updates a season", async () => {
	// 		mockApp.onPut("season/update").reply(200, { message });

	// 		return expectSaga(sagas.updateSeason, { props })
	// 			.dispatch(actions.updateSeason)
	// 			.withReducer(messageReducer)
	// 			.hasFinalState({
	// 				message,
	// 				show: true,
	// 				type: "success",
	// 			})
	// 			.run();
	// 	});

	// 	it("if API call fails, it displays a message", async () => {
	// 		const err = "Unable to delete the season.";
	// 		mockApp.onPut("season/update").reply(404, { err });

	// 		return expectSaga(sagas.updateSeason, { seasonId })
	// 			.dispatch(actions.updateSeason)
	// 			.withReducer(messageReducer)
	// 			.hasFinalState({
	// 				message: err,
	// 				show: true,
	// 				type: "error",
	// 			})
	// 			.run();
	// 	});
	// });
});
