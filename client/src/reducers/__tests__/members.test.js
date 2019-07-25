import * as types from "types";
import memberReducer, { initialState } from "reducers/Members";
import * as mocks from "reducers/__mocks__/reducers.mocks";

const membersData = {
	members: mocks.membersData,
};

const memberData = {
	member: mocks.membersData,
};

describe("Member Reducer", () => {
	it("initially matches the initialState pattern", () => {
		expect(memberReducer(undefined, { payload: {}, type: "" })).toEqual(
			initialState,
		);
	});

	it("sets members data and sets isLoading to false", () => {
		const state = memberReducer(undefined, {
			type: types.MEMBERS_SET,
			payload: membersData,
		});

		expect(state).toEqual({
			data: mocks.membersData,
			viewMember: {},
			isLoading: false,
		});
	});

	it("when fetching all members, resets to initialState", () => {
		let state = memberReducer(undefined, {
			type: types.MEMBERS_SET,
			payload: membersData,
		});

		state = memberReducer(state, {
			type: types.MEMBERS_FETCH,
		});

		expect(state).toEqual(initialState);
	});

	it("when fetching a member for viewing, resets to initialState", () => {
		let state = memberReducer(undefined, {
			type: types.MEMBERS_SET,
			payload: membersData,
		});

		state = memberReducer(state, {
			type: types.MEMBERS_REVIEW,
		});

		expect(state).toEqual(initialState);
	});

	it("sets a single member's data for viewing and sets isLoading to false", () => {
		const state = memberReducer(undefined, {
			type: types.MEMBERS_SET_REVIEW,
			payload: memberData,
		});

		expect(state).toEqual({
			data: [],
			viewMember: mocks.membersData,
			isLoading: false,
		});
	});
});
