import * as types from "types";
import seasonReducer, { initialState } from "reducers/Seasons";
import * as mocks from "reducers/__mocks__/reducers.mocks";

const data = {
	seasons: mocks.seasonsData,
};

describe("Season Reducer", () => {
	it("initially matches the initialState pattern", () => {
		expect(seasonReducer(undefined, { payload: {}, type: "" })).toEqual(
			initialState,
		);
	});

	it("sets seasons data and sets isLoading to false", () => {
		const state = seasonReducer(undefined, {
			type: types.SEASONS_SET,
			payload: data,
		});

		expect(state).toEqual({
			data: mocks.seasonsData,
			editSeason: [],
			isLoading: false,
		});
	});

	it("when fetching all seasons, resets seasons data and sets isLoading to true", () => {
		let state = seasonReducer(undefined, {
			type: types.SEASONS_SET,
			payload: data,
		});

		state = seasonReducer(state, {
			type: types.SEASONS_FETCH,
		});

		expect(state).toEqual(initialState);
	});
});
