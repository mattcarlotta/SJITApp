import * as types from "types";
import * as actions from "actions/Members";

const data = {
	_id: "1234567890",
	firstName: "Beta",
	lastName: "Tester",
	role: "member",
	email: "member@example.com",
	registered: "2000-10-06T07:00:00.000+00:00",
	events: 0,
};

const membersData = { members: [data] };

const memberData = { member: [data] };

describe("Member Actions", () => {
	// it("returns SEASONS_CREATE with props", () => {
	// 	const props = { seasonId: "1234", startDate: "1234", endDate: "1234" };

	// 	const value = actions.createSeason(props);

	// 	expect(value).toEqual({
	// 		type: types.SEASONS_CREATE,
	// 		props,
	// 	});
	// });

	// it("returns SEASONS_DELETE with a seasonId", () => {
	// 	const seasonId = "20052006";

	// 	const value = actions.deleteSeason(seasonId);

	// 	expect(value).toEqual({
	// 		type: types.SEASONS_DELETE,
	// 		seasonId,
	// 	});
	// });

	// it("returns SEASONS_EDIT", () => {
	// 	const seasonId = "20052006";

	// 	const value = actions.fetchSeason(seasonId);

	// 	expect(value).toEqual({
	// 		type: types.SEASONS_EDIT,
	// 		seasonId,
	// 	});
	// });

	it("returns MEMBERS_FETCH", () => {
		const value = actions.fetchMembers();

		expect(value).toEqual({
			type: types.MEMBERS_FETCH,
		});
	});

	it("returns MEMBERS_SET with data", () => {
		const value = actions.setMembers(membersData);

		expect(value).toEqual({
			type: types.MEMBERS_SET,
			payload: membersData,
		});
	});

	it("returns MEMBERS_SET with an empty array if data is empty", () => {
		const value = actions.setMembers({});

		expect(value).toEqual({
			type: types.MEMBERS_SET,
			payload: [],
		});
	});

	// it("returns SEASONS_SET_EDIT with data", () => {
	// 	const value = actions.setSeasonToEdit(seasonData);

	// 	expect(value).toEqual({
	// 		type: types.SEASONS_SET_EDIT,
	// 		payload: seasonData,
	// 	});
	// });

	// it("returns SEASONS_SET_EDIT with an empty array if data is empty", () => {
	// 	const data = {};

	// 	const value = actions.setSeasonToEdit(data);

	// 	expect(value).toEqual({
	// 		type: types.SEASONS_SET_EDIT,
	// 		payload: [],
	// 	});
	// });

	// it("returns SEASONS_UPDATE_EDIT with props", () => {
	// 	const props = {
	// 		id: "1234567890",
	// 		seasonId: "20052006",
	// 		startDate: "2005-10-06T07:00:00.000+00:00",
	// 		endDate: "2006-08-06T07:00:00.000+00:00",
	// 	};

	// 	const value = actions.updateSeason(props);

	// 	expect(value).toEqual({
	// 		type: types.SEASONS_UPDATE_EDIT,
	// 		props,
	// 	});
	// });
});
