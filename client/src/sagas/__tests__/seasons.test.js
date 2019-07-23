import { push } from "connected-react-router";
import { expectSaga, testSaga } from "redux-saga-test-plan";
import { app } from "utils";
import * as actions from "actions/Seasons";
import { setServerMessage } from "actions/Messages";
import * as sagas from "sagas/Seasons";
import * as mocks from "sagas/__mocks__/sagas.mocks";
import messageReducer from "reducers/Messages";
import seasonReducer from "reducers/Seasons";
import { parseData, parseMessage } from "utils/parseResponse";

describe("Season Sagas", () => {
	afterEach(() => {
		mockApp.reset();
	});

	afterAll(() => {
		mockApp.restore();
	});

	describe("Create Season", () => {
		let message;
		let props;
		beforeEach(() => {
			message = "Successfully created a new season!";
			props = mocks.newSeason;
		});

		it("logical flow matches pattern for a create season request", () => {
			const res = { data: { message } };

			testSaga(sagas.createSeason, { props })
				.next()
				.call(app.post, "season/create", { ...props })
				.next(res)
				.call(parseMessage, res)
				.next(res.data.message)
				.put(setServerMessage({ type: "success", message: res.data.message }))
				.next()
				.put(push("/employee/seasons/viewall"))
				.next()
				.isDone();
		});

		it("successfully creates a new season", async () => {
			mockApp.onPost("season/create").reply(200, { message });

			return expectSaga(sagas.createSeason, { props })
				.dispatch(actions.createSeason)
				.withReducer(messageReducer)
				.hasFinalState({
					message,
					show: true,
					type: "success",
				})
				.run();
		});

		it("if API call fails, it displays a message", async () => {
			const err = "Unable to create a new season.";
			mockApp.onPost("season/create").reply(404, { err });

			return expectSaga(sagas.createSeason, { props })
				.dispatch(actions.createSeason)
				.withReducer(messageReducer)
				.hasFinalState({
					message: err,
					show: true,
					type: "error",
				})
				.run();
		});
	});

	describe("Fetch Seasons", () => {
		let data;
		beforeEach(() => {
			data = { seasons: mocks.seasonsData };
		});

		it("logical flow matches pattern for fetch seasons requests", () => {
			const res = { data };

			testSaga(sagas.fetchSeasons)
				.next()
				.call(app.get, "seasons/all")
				.next(res)
				.call(parseData, res)
				.next(res.data)
				.put(actions.setSeasons(res.data))
				.next()
				.isDone();
		});

		it("successfully creates a new season", async () => {
			mockApp.onGet("seasons/all").reply(200, data);

			return expectSaga(sagas.fetchSeasons)
				.dispatch(actions.fetchSeasons)
				.withReducer(seasonReducer)
				.hasFinalState({
					data: mocks.seasonsData,
					editSeason: [],
					isLoading: false,
				})
				.run();
		});

		it("if API call fails, it displays a message", async () => {
			const err = "Unable to create a new season.";
			mockApp.onGet("seasons/all").reply(404, { err });

			return expectSaga(sagas.fetchSeasons)
				.dispatch(actions.fetchSeasons)
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
