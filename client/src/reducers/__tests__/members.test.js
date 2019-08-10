import * as types from "types";
import memberReducer, { initialState } from "reducers/Members";
import * as mocks from "reducers/__mocks__/reducers.mocks";

const membersData = {
	members: mocks.membersData,
};

const memberData = {
	member: mocks.membersData,
};

const tokensData = {
	tokens: mocks.tokensData,
};

const tokenData = {
	...mocks.tokensData,
	seasonIds: mocks.seasonIdsData,
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
			tokens: [],
			editToken: {},
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

	it("when fetching for a single member token for editing, resets to initialState", () => {
		let state = memberReducer(undefined, {
			type: types.MEMBERS_SET_TOKEN,
			payload: tokenData,
		});

		state = memberReducer(state, {
			type: types.MEMBERS_FETCH_TOKEN,
		});

		expect(state).toEqual(initialState);
	});

	it("when fetching for all member tokens, resets to initialState", () => {
		let state = memberReducer(undefined, {
			type: types.MEMBERS_SET_TOKENS,
			payload: tokensData,
		});

		state = memberReducer(state, {
			type: types.MEMBERS_FETCH_TOKENS,
		});

		expect(state).toEqual(initialState);
	});

	it("sets member tokens for viewing and sets isLoading to false", () => {
		const state = memberReducer(undefined, {
			type: types.MEMBERS_SET_TOKENS,
			payload: tokensData,
		});

		expect(state).toEqual({
			data: [],
			tokens: mocks.tokensData,
			editToken: {},
			viewMember: {},
			isLoading: false,
		});
	});

	it("sets a single member token for editing and sets isLoading to false", () => {
		const state = memberReducer(undefined, {
			type: types.MEMBERS_SET_TOKEN,
			payload: tokenData,
		});

		expect(state).toEqual({
			data: [],
			tokens: [],
			editToken: { ...mocks.tokensData, seasonIds: mocks.seasonIdsData },
			viewMember: {},
			isLoading: false,
		});
	});

	it("sets a single member's data for viewing and sets isLoading to false", () => {
		const state = memberReducer(undefined, {
			type: types.MEMBERS_SET_REVIEW,
			payload: memberData,
		});

		expect(state).toEqual({
			data: [],
			tokens: [],
			editToken: {},
			viewMember: mocks.membersData,
			isLoading: false,
		});
	});
});
