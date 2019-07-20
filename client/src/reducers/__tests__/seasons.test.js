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
			isLoading: false,
		});
	});

	it("resets seasons data and sets isLoading to true", () => {
		let state = seasonReducer(undefined, {
			type: types.SEASONS_SET,
			payload: data,
		});

		state = seasonReducer(state, {
			type: types.SEASONS_RESET,
		});

		expect(state).toEqual(initialState);
	});
});
