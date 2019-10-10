import * as types from "types";
import memberReducer, { initialState } from "reducers/Members";
import * as mocks from "reducers/__mocks__/reducers.mocks";

const membersData = {
	members: mocks.membersData,
};

const memberData = {
	member: mocks.membersData,
	eventResponses: mocks.memberEventResponses,
	memberAvailiability: mocks.memberAvailiability,
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

	it("sets members data", () => {
		const state = memberReducer(undefined, {
			type: types.MEMBERS_SET,
			payload: membersData,
		});

		expect(state).toEqual({
			data: mocks.membersData,
			eventResponses: [],
			memberAvailiability: {},
			editToken: {},
			viewMember: {},
			tokens: [],
		});
	});

	it("sets members event response data", () => {
		const state = memberReducer(undefined, {
			type: types.MEMBERS_SET_EVENTS,
			payload: { eventResponses: mocks.eventResponseData },
		});

		expect(state).toEqual({
			data: [],
			editToken: {},
			eventResponses: mocks.eventResponseData,
			memberAvailiability: {},
			viewMember: {},
			tokens: [],
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

	it("sets member tokens for viewing", () => {
		const state = memberReducer(undefined, {
			type: types.MEMBERS_SET_TOKENS,
			payload: tokensData,
		});

		expect(state).toEqual({
			data: [],
			editToken: {},
			eventResponses: [],
			memberAvailiability: {},
			viewMember: {},
			tokens: mocks.tokensData,
		});
	});

	it("sets a single member token for editing", () => {
		const state = memberReducer(undefined, {
			type: types.MEMBERS_SET_TOKEN,
			payload: tokenData,
		});

		expect(state).toEqual({
			data: [],
			editToken: { ...mocks.tokensData, seasonIds: mocks.seasonIdsData },
			eventResponses: [],
			memberAvailiability: {},
			viewMember: {},
			tokens: [],
		});
	});

	it("sets a single member's data for viewing", () => {
		const state = memberReducer(undefined, {
			type: types.MEMBERS_SET_REVIEW,
			payload: memberData,
		});

		expect(state).toEqual({
			data: [],
			editToken: {},
			eventResponses: mocks.memberEventResponses,
			memberAvailiability: mocks.memberAvailiability,
			viewMember: mocks.membersData,
			tokens: [],
		});
	});
});
