import * as types from "types";
import eventReducer, { initialState } from "reducers/Events";
import * as mocks from "reducers/__mocks__/reducers.mocks";

const eventsData = {
	events: mocks.eventsData,
};

describe("Event Reducer", () => {
	it("initially matches the initialState pattern", () => {
		expect(eventReducer(undefined, { payload: {}, type: "" })).toEqual(
			initialState,
		);
	});

	it("sets events data", () => {
		const state = eventReducer(undefined, {
			type: types.EVENTS_SET,
			payload: eventsData,
		});

		expect(state).toEqual({
			data: mocks.eventsData,
			editEvent: {},
			newEvent: {},
			schedule: {},
			scheduleEvents: [],
		});
	});

	it("when fetching all events, resets to initialState", () => {
		let state = eventReducer(undefined, {
			type: types.EVENTS_SET,
			payload: eventsData,
		});

		state = eventReducer(state, {
			type: types.EVENTS_FETCH,
		});

		expect(state).toEqual(initialState);
	});

	it("when fetching an event for editing, resets to initialState", () => {
		let state = eventReducer(undefined, {
			type: types.EVENTS_SET,
			payload: eventsData,
		});

		state = eventReducer(state, {
			type: types.EVENTS_EDIT,
		});

		expect(state).toEqual(initialState);
	});

	it("sets event for editing", () => {
		const state = eventReducer(undefined, {
			type: types.EVENTS_SET_EDIT,
			payload: { ...mocks.eventsData },
		});

		expect(state).toEqual({
			data: [],
			editEvent: { ...mocks.eventsData },
			newEvent: {},
			schedule: {},
			scheduleEvents: [],
		});
	});
});
