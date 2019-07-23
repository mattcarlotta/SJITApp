import * as types from "types";
import * as actions from "actions/Seasons";

describe("Season Actions", () => {
	it("returns SEASONS_CREATE with props", () => {
		const props = { seasonId: "1234", startDate: "1234", endDate: "1234" };
		const value = actions.createSeason(props);
		expect(value).toEqual({
			type: types.SEASONS_CREATE,
			props,
		});
	});

	it("returns SEASONS_FETCH", () => {
		const value = actions.fetchSeasons();
		expect(value).toEqual({
			type: types.SEASONS_FETCH,
		});
	});

	it("returns SEASONS_SET with data", () => {
		const data = {
			seasons: [
				{
					_id: "5d323ee2b02dee15483e5d9f",
					members: 3,
					seasonId: "20002001",
					startDate: "2000-10-06T07:00:00.000+00:00",
					endDate: "2001-08-06T07:00:00.000+00:00",
				},
			],
		};
		const value = actions.setSeasons(data);

		expect(value).toEqual({
			type: types.SEASONS_SET,
			payload: data,
		});
	});

	it("returns SEASONS_SET with an empty array if data is empty", () => {
		const data = {};
		const value = actions.setSeasons(data);

		expect(value).toEqual({
			type: types.SEASONS_SET,
			payload: [],
		});
	});
});
