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
});
