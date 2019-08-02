import * as types from "types";
import seasonReducer, { initialState } from "reducers/Seasons";
import * as mocks from "reducers/__mocks__/reducers.mocks";

const seasonsData = {
	seasons: mocks.seasonsData,
};

const seasonData = {
	season: mocks.seasonsData,
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
			payload: seasonsData,
		});

		expect(state).toEqual({
			data: mocks.seasonsData,
			editSeason: {},
			ids: [],
			isLoading: false,
		});
	});

	it("when fetching all seasons, resets to initialState", () => {
		let state = seasonReducer(undefined, {
			type: types.SEASONS_SET,
			payload: seasonsData,
		});

		state = seasonReducer(state, {
			type: types.SEASONS_FETCH,
		});

		expect(state).toEqual(initialState);
	});

	it("when fetching a season for editing, resets to initialState", () => {
		let state = seasonReducer(undefined, {
			type: types.SEASONS_SET,
			payload: seasonsData,
		});

		state = seasonReducer(state, {
			type: types.SEASONS_EDIT,
		});

		expect(state).toEqual(initialState);
	});

	it("sets a single season's data for editing and sets isLoading to false", () => {
		const state = seasonReducer(undefined, {
			type: types.SEASONS_SET_EDIT,
			payload: seasonData,
		});

		expect(state).toEqual({
			data: [],
			editSeason: mocks.seasonsData,
			ids: [],
			isLoading: false,
		});
	});
});
