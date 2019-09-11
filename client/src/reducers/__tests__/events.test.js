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

	it("sets a scheduled event for viewing and assigning", () => {
		const state = eventReducer(undefined, {
			type: types.EVENTS_SET_SCHEDULE,
			payload: { schedule: mocks.eventForSchedulingData },
		});

		expect(state).toEqual({
			data: [],
			editEvent: {},
			newEvent: {},
			schedule: mocks.eventForSchedulingData,
			scheduleEvents: [],
		});
	});

	it("sets scheduled events for viewing", () => {
		const state = eventReducer(undefined, {
			type: types.EVENTS_SET_SCHEDULE_EVENTS,
			payload: { events: mocks.scheduleEventsData },
		});

		expect(state).toEqual({
			data: [],
			editEvent: {},
			newEvent: {},
			schedule: {},
			scheduleEvents: mocks.scheduleEventsData,
		});
	});
});
