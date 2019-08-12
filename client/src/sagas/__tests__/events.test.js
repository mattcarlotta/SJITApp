import { push } from "connected-react-router";
import { expectSaga, testSaga } from "redux-saga-test-plan";
import { app } from "utils";
import * as types from "types";
import * as actions from "actions/Events";
import { hideServerMessage, setServerMessage } from "actions/Messages";
import * as sagas from "sagas/Events";
import * as mocks from "sagas/__mocks__/sagas.mocks";
import messageReducer from "reducers/Messages";
import memberReducer from "reducers/Events";
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
		beforeEach(() => {
			data = { event: mocks.eventsData };
			data2 = { seasonIds: mocks.seasonIdsData };
		});

		it("logical flow matches pattern for fetch event requests", () => {
			const res = { data };
			const res2 = { data2 };

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
				.put(
					actions.setEventToEdit({
						...res.data.event,
						seasonIds: res2.data2.seasonIds,
					}),
				)
				.next()
				.isDone();
		});

		it("successfully fetches a fetch event for editing", async () => {
			mockApp.onGet(`event/edit/${eventId}`).reply(200, data);
			mockApp
				.onGet("seasons/all/ids")
				.reply(200, { data: { seasonIds: mocks.seasonIdsData } });

			return expectSaga(sagas.fetchEvent, { eventId })
				.dispatch(actions.fetchEvent)
				.withReducer(memberReducer)
				.hasFinalState({
					data: [],
					editEvent: { ...mocks.eventsData, seasonIds: mocks.seasonIds },
					isLoading: false,
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

		it("successfully fetches all events fo", async () => {
			mockApp.onGet("events/all").reply(200, data);

			return expectSaga(sagas.fetchEvents)
				.dispatch(actions.fetchEvents)
				.withReducer(memberReducer)
				.hasFinalState({
					data: mocks.eventsData,
					editEvent: {},
					isLoading: false,
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
