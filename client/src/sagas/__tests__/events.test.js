import { push } from "connected-react-router";
import { expectSaga, testSaga } from "redux-saga-test-plan";
import { app } from "utils";
import * as types from "types";
import * as actions from "actions/Events";
import { hideServerMessage, setServerMessage } from "actions/Messages";
import * as sagas from "sagas/Events";
import * as mocks from "sagas/__mocks__/sagas.mocks";
import messageReducer from "reducers/Messages";
import eventReducer from "reducers/Events";
import { parseData, parseMessage } from "utils/parseResponse";

const eventId = "0123456789";

describe("Event Sagas", () => {
	afterEach(() => {
		mockApp.reset();
	});

	afterAll(() => {
		mockApp.restore();
	});

	describe("Create Member", () => {
		let message;
		let props;
		beforeEach(() => {
			message = "Successfully created a new event!";
			props = mocks.eventsData;
		});

		it("logical flow matches pattern for a create event request", () => {
			const res = { data: { message } };

			testSaga(sagas.createEvent, { props })
				.next()
				.put(hideServerMessage())
				.next()
				.call(app.post, "event/create", { ...props })
				.next(res)
				.call(parseMessage, res)
				.next(res.data.message)
				.put(setServerMessage({ type: "success", message: res.data.message }))
				.next()
				.put(push("/employee/events/viewall"))
				.next()
				.isDone();
		});

		it("successfully creates a new event", async () => {
			mockApp.onPost("event/create").reply(200, { message });

			return expectSaga(sagas.createEvent, { props })
				.dispatch(actions.createEvent)
				.withReducer(messageReducer)
				.hasFinalState({
					message,
					show: true,
					type: "success",
				})
				.run();
		});

		it("if API call fails, it displays a message", async () => {
			const err = "Unable to create a new event.";
			mockApp.onPost("event/create").reply(404, { err });

			return expectSaga(sagas.createEvent, { props })
				.dispatch(actions.createEvent)
				.withReducer(messageReducer)
				.hasFinalState({
					message: err,
					show: true,
					type: "error",
				})
				.run();
		});
	});

	describe("Delete Event", () => {
		it("logical flow matches pattern for delete event requests", () => {
			const message = "Successfully deleted event.";
			const res = { data: { message } };

			testSaga(sagas.deleteEvent, { eventId })
				.next()
				.put(hideServerMessage())
				.next()
				.call(app.delete, `event/delete/${eventId}`)
				.next(res)
				.call(parseMessage, res)
				.next(res.data.message)
				.put(setServerMessage({ type: "success", message: res.data.message }))
				.next()
				.put({ type: types.EVENTS_FETCH })
				.next()
				.isDone();
		});

		it("successfully deletes a event", async () => {
			const message = "Successfully deleted the event.";
			mockApp.onDelete(`event/delete/${eventId}`).reply(200, { message });

			return expectSaga(sagas.deleteEvent, { eventId })
				.dispatch(actions.deleteEvent)
				.withReducer(messageReducer)
				.hasFinalState({
					message,
					show: true,
					type: "success",
				})
				.run();
		});

		it("if API call fails, it displays a message", async () => {
			const err = "Unable to delete the event.";
			mockApp.onDelete(`event/delete/${eventId}`).reply(404, { err });

			return expectSaga(sagas.deleteEvent, { eventId })
				.dispatch(actions.deleteEvent)
				.withReducer(messageReducer)
				.hasFinalState({
					message: err,
					show: true,
					type: "error",
				})
				.run();
		});
	});

	describe("Fetch Event", () => {
		let data;
		let data2;
		let data3;
		beforeEach(() => {
			data = { event: mocks.eventsData };
			data2 = { seasonIds: mocks.seasonIdsData };
			data3 = { teams: mocks.teamNamesData };
		});

		it("logical flow matches pattern for fetch event requests", () => {
			const res = { data };
			const res2 = { data2 };
			const res3 = { data3 };

			testSaga(sagas.fetchEvent, { eventId })
				.next()
				.put(hideServerMessage())
				.next()
				.call(app.get, `event/edit/${eventId}`)
				.next(res)
				.call(parseData, res)
				.next(res.data)
				.call(app.get, "seasons/all/ids")
				.next(res2)
				.call(parseData, res2)
				.next(res2.data2)
				.call(app.get, "teams/all/names")
				.next(res3)
				.call(parseData, res3)
				.next(res3.data3)
				.put(
					actions.setEventToEdit({
						...res.data.event,
						seasonIds: res2.data2.seasonIds,
						teams: res3.data3.names,
					}),
				)
				.next()
				.isDone();
		});

		it("successfully fetches a fetch event for editing", async () => {
			mockApp.onGet(`event/edit/${eventId}`).reply(200, data);

			mockApp
				.onGet("seasons/all/ids")
				.reply(200, { seasonIds: mocks.seasonIdsData });

			mockApp
				.onGet("teams/all/names")
				.reply(200, { names: mocks.teamNamesData });

			return expectSaga(sagas.fetchEvent, { eventId })
				.dispatch(actions.fetchEvent)
				.withReducer(eventReducer)
				.hasFinalState({
					data: [],
					editEvent: {
						...mocks.eventsData,
						seasonIds: mocks.seasonIdsData,
						teams: mocks.teamNamesData,
					},
					newEvent: {},
				})
				.run();
		});

		it("if API call fails, it displays a message", async () => {
			const err = "Unable to fetch that event.";
			mockApp.onGet(`event/edit/${eventId}`).reply(404, { err });

			return expectSaga(sagas.fetchEvent, { eventId })
				.dispatch(actions.fetchEvent)
				.withReducer(messageReducer)
				.hasFinalState({
					message: err,
					show: true,
					type: "error",
				})
				.run();
		});
	});

	describe("Fetch Events", () => {
		let data;
		beforeEach(() => {
			data = { events: mocks.eventsData };
		});

		it("logical flow matches pattern for fetch events requests", () => {
			const res = { data };

			testSaga(sagas.fetchEvents)
				.next()
				.call(app.get, "events/all")
				.next(res)
				.call(parseData, res)
				.next(res.data)
				.put(actions.setEvents(res.data))
				.next()
				.isDone();
		});

		it("successfully fetches all events", async () => {
			mockApp.onGet("events/all").reply(200, data);

			return expectSaga(sagas.fetchEvents)
				.dispatch(actions.fetchEvents)
				.withReducer(eventReducer)
				.hasFinalState({
					data: mocks.eventsData,
					editEvent: {},
					newEvent: {},
				})
				.run();
		});

		it("if API call fails, it displays a message", async () => {
			const err = "Unable to fetch events.";
			mockApp.onGet("events/all").reply(404, { err });

			return expectSaga(sagas.fetchEvents)
				.dispatch(actions.fetchEvents)
				.withReducer(messageReducer)
				.hasFinalState({
					message: err,
					show: true,
					type: "error",
				})
				.run();
		});
	});

	describe("Initialize Event", () => {
		let data;
		let data2;
		beforeEach(() => {
			data = { seasonIds: mocks.seasonIdsData };
			data2 = { team: mocks.eventsData };
		});

		it("logical flow matches pattern for fetch event requests", () => {
			const res = { data };
			const res2 = { data2 };

			testSaga(sagas.initializeNewEvent)
				.next()
				.put(hideServerMessage())
				.next()
				.call(app.get, "seasons/all/ids")
				.next(res)
				.call(parseData, res)
				.next(res.data)
				.call(app.get, "teams/all/names")
				.next(res2)
				.call(parseData, res2)
				.next(res2.data2)
				.put(
					actions.setNewEvent({
						seasonIds: res.data.seasonIds,
						teams: res2.data2.names,
					}),
				)
				.next()
				.isDone();
		});

		it("successfully initialzie a new event form", async () => {
			mockApp
				.onGet("seasons/all/ids")
				.reply(200, { seasonIds: mocks.seasonIdsData });

			mockApp
				.onGet("teams/all/names")
				.reply(200, { names: mocks.teamNamesData });

			return expectSaga(sagas.initializeNewEvent)
				.dispatch(actions.initializeNewEvent)
				.withReducer(eventReducer)
				.hasFinalState({
					data: [],
					editEvent: {},
					newEvent: {
						seasonIds: mocks.seasonIdsData,
						teams: mocks.teamNamesData,
					},
				})
				.run();
		});

		it("if API call fails, it displays a message", async () => {
			const err = "Unable to fetch to initialize event form.";
			mockApp.onGet("seasons/all/ids").reply(404, { err });

			return expectSaga(sagas.initializeNewEvent)
				.dispatch(actions.initializeNewEvent)
				.withReducer(messageReducer)
				.hasFinalState({
					message: err,
					show: true,
					type: "error",
				})
				.run();
		});
	});

	describe("Update Event", () => {
		let message;
		let props;
		beforeEach(() => {
			message = "Successfully updated the event!";
			props = mocks.eventsData;
		});

		it("logical flow matches pattern for update event requests", () => {
			const res = { data: { message } };

			testSaga(sagas.updateEvent, { props })
				.next()
				.put(hideServerMessage())
				.next()
				.call(app.put, "event/update", { ...props })
				.next(res)
				.call(parseMessage, res)
				.next(res.data.message)
				.put(setServerMessage({ type: "success", message: res.data.message }))
				.next()
				.put(push("/employee/events/viewall"))
				.next()
				.isDone();
		});

		it("successfully updates an event", async () => {
			mockApp.onPut("event/update").reply(200, { message });

			return expectSaga(sagas.updateEvent, { props })
				.dispatch(actions.updateEvent)
				.withReducer(messageReducer)
				.hasFinalState({
					message,
					show: true,
					type: "success",
				})
				.run();
		});

		it("if API call fails, it displays a message", async () => {
			const err = "Unable to delete the event.";
			mockApp.onPut("event/update").reply(404, { err });

			return expectSaga(sagas.updateEvent, { props })
				.dispatch(actions.updateEvent)
				.withReducer(messageReducer)
				.hasFinalState({
					message: err,
					show: true,
					type: "error",
				})
				.run();
		});
	});
});
