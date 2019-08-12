import * as types from "types";
import * as actions from "actions/Events";

const data = {
	_id: "0123456789",
	callTimes: ["2019-08-09T19:00:38-07:00"],
	eventDate: "2019-08-11T02:30:30.036+00:00",
	eventType: "Game",
	league: "AHL",
	location: "SAP Center at San Jose",
	notes: "",
	seasonId: "20002001",
	uniform: "Barracuda Jersey",
};

const eventId = "1234567890";

describe("Events Actions", () => {
	it("returns EVENTS_CREATE with data", () => {
		const props = data;
		const value = actions.createEvent(props);

		expect(value).toEqual({
			type: types.EVENTS_CREATE,
			props,
		});
	});

	it("returns EVENTS_DELETE with a eventId", () => {
		const value = actions.deleteEvent(eventId);

		expect(value).toEqual({
			type: types.EVENTS_DELETE,
			eventId,
		});
	});

	it("returns EVENTS_EDIT", () => {
		const value = actions.fetchEvent(eventId);

		expect(value).toEqual({
			type: types.EVENTS_EDIT,
			eventId,
		});
	});

	it("returns EVENTS_FETCH", () => {
		const value = actions.fetchEvents();

		expect(value).toEqual({
			type: types.EVENTS_FETCH,
		});
	});

	it("returns EVENTS_SET with an empty array if data is empty", () => {
		const value = actions.setEvents([]);

		expect(value).toEqual({
			type: types.EVENTS_SET,
			payload: [],
		});
	});

	it("returns EVENTS_SET with data", () => {
		const value = actions.setEvents(data);

		expect(value).toEqual({
			type: types.EVENTS_SET,
			payload: data,
		});
	});

	it("returns EVENTS_SET_EDIT with an empty object if data is empty", () => {
		const value = actions.setEventToEdit({});

		expect(value).toEqual({
			type: types.EVENTS_SET_EDIT,
			payload: {},
		});
	});

	it("returns EVENTS_SET_EDIT with data", () => {
		const value = actions.setEventToEdit({ ...data });

		expect(value).toEqual({
			type: types.EVENTS_SET_EDIT,
			payload: { ...data },
		});
	});

	it("returns EVENTS_UPDATE with props", () => {
		const props = data;

		const value = actions.updateEvent(props);

		expect(value).toEqual({
			type: types.EVENTS_UPDATE,
			props,
		});
	});
});
