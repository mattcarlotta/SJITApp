import { goBack, push } from "connected-react-router";
import { expectSaga, testSaga } from "redux-saga-test-plan";
import { app } from "utils";
import * as types from "types";
import * as actions from "actions/Seasons";
import { hideServerMessage, setServerMessage } from "actions/Messages";
import * as sagas from "sagas/Seasons";
import * as mocks from "sagas/__mocks__/sagas.mocks";
import messageReducer from "reducers/Messages";
import seasonReducer from "reducers/Seasons";
import { parseData, parseMessage } from "utils/parseResponse";

const seasonId = "124567890";
const currentPage = 1;

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
				.put(hideServerMessage())
				.next()
				.call(app.post, "season/create", { ...props })
				.next(res)
				.call(parseMessage, res)
				.next(res.data.message)
				.put(setServerMessage({ type: "success", message: res.data.message }))
				.next()
				.put(push("/employee/seasons/viewall?page=1"))
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

	describe("Delete Season", () => {
		it("logical flow matches pattern for delete season on page 1 requests", () => {
			const message = "Successfully deleted season.";
			const res = { data: { message } };

			testSaga(sagas.deleteSeason, { seasonId, currentPage })
				.next()
				.put(hideServerMessage())
				.next()
				.call(app.delete, `season/delete/${seasonId}`)
				.next(res)
				.call(parseMessage, res)
				.next(res.data.message)
				.put(setServerMessage({ type: "success", message: res.data.message }))
				.next()
				.put({ type: types.SEASONS_FETCH, currentPage })
				.next()
				.isDone();
		});

		it("logical flow matches pattern for delete season on page 1+ requests", () => {
			const message = "Successfully deleted season.";
			const res = { data: { message } };

			testSaga(sagas.deleteSeason, { seasonId, currentPage: 2 })
				.next()
				.put(hideServerMessage())
				.next()
				.call(app.delete, `season/delete/${seasonId}`)
				.next(res)
				.call(parseMessage, res)
				.next(res.data.message)
				.put(setServerMessage({ type: "success", message: res.data.message }))
				.next()
				.put(push("/employee/seasons/viewall?page=1"))
				.next()
				.isDone();
		});

		it("successfully deletes a season", async () => {
			const message = "Successfully deleted the season.";
			mockApp.onDelete(`season/delete/${seasonId}`).reply(200, { message });

			return expectSaga(sagas.deleteSeason, { seasonId, currentPage })
				.dispatch(actions.deleteSeason)
				.withReducer(messageReducer)
				.hasFinalState({
					message,
					show: true,
					type: "success",
				})
				.run();
		});

		it("if API call fails, it displays a message", async () => {
			const err = "Unable to delete the season.";
			mockApp.onDelete(`season/delete/${seasonId}`).reply(404, { err });

			return expectSaga(sagas.deleteSeason, { seasonId, currentPage })
				.dispatch(actions.deleteSeason)
				.withReducer(messageReducer)
				.hasFinalState({
					message: err,
					show: true,
					type: "error",
				})
				.run();
		});
	});

	describe("Fetch Season", () => {
		let data;
		beforeEach(() => {
			data = { season: mocks.seasonsData };
		});

		it("logical flow matches pattern for fetch season requests", () => {
			const res = { data };

			testSaga(sagas.fetchSeason, { seasonId })
				.next()
				.put(hideServerMessage())
				.next()
				.call(app.get, `season/edit/${seasonId}`)
				.next(res)
				.call(parseData, res)
				.next(res.data)
				.put(actions.setSeasonToEdit(res.data))
				.next()
				.isDone();
		});

		it("successfully fetches an existing season", async () => {
			mockApp.onGet(`season/edit/${seasonId}`).reply(200, data);

			return expectSaga(sagas.fetchSeason, { seasonId })
				.dispatch(actions.fetchSeason)
				.withReducer(seasonReducer)
				.hasFinalState({
					data: [],
					editSeason: mocks.seasonsData,
					ids: [],
					isLoading: true,
					totalDocs: 0,
				})
				.run();
		});

		it("if API call fails, it displays a message", async () => {
			const err = "Unable to fetch that season.";
			mockApp.onGet(`season/edit/${seasonId}`).reply(404, { err });

			return expectSaga(sagas.fetchSeason, { seasonId })
				.dispatch(actions.fetchSeason)
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
			data = { seasons: mocks.seasonsData, totalDocs: 1 };
		});

		it("logical flow matches pattern for fetch seasons requests", () => {
			const res = { data };

			testSaga(sagas.fetchSeasons, { currentPage })
				.next()
				.call(app.get, `seasons/all?page=${currentPage}`)
				.next(res)
				.call(parseData, res)
				.next(res.data)
				.put(actions.setSeasons(res.data))
				.next()
				.isDone();
		});

		it("successfully fetches a season for editing", async () => {
			mockApp.onGet(`seasons/all?page=${currentPage}`).reply(200, data);

			return expectSaga(sagas.fetchSeasons, { currentPage })
				.dispatch(actions.fetchSeasons)
				.withReducer(seasonReducer)
				.hasFinalState({
					data: mocks.seasonsData,
					isLoading: false,
					totalDocs: 1,
					editSeason: {},
					ids: [],
				})
				.run();
		});

		it("if API call fails, it displays a message", async () => {
			const err = "Unable to create a new season.";
			mockApp.onGet(`seasons/all?page=${currentPage}`).reply(404, { err });

			return expectSaga(sagas.fetchSeasons, { currentPage })
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

	describe("Fetch Season Ids", () => {
		let data;
		beforeEach(() => {
			data = { seasonIds: mocks.seasonIdsData };
		});

		it("logical flow matches pattern for fetch seasons requests", () => {
			const res = { data };

			testSaga(sagas.fetchSeasonsIds)
				.next()
				.put(hideServerMessage())
				.next()
				.call(app.get, "seasons/all/ids")
				.next(res)
				.call(parseData, res)
				.next(res.data)
				.put(actions.setSeasonsIds(res.data))
				.next()
				.isDone();
		});

		it("successfully fetches a season for editing", async () => {
			mockApp.onGet("seasons/all/ids").reply(200, data);

			return expectSaga(sagas.fetchSeasonsIds)
				.dispatch(actions.fetchSeasonsIds)
				.withReducer(seasonReducer)
				.hasFinalState({
					data: [],
					editSeason: {},
					ids: mocks.seasonIdsData,
					isLoading: true,
					totalDocs: 0,
				})
				.run();
		});

		it("if API call fails, it displays a message", async () => {
			const err = "Unable to get season ids.";
			mockApp.onGet("seasons/all/ids").reply(404, { err });

			return expectSaga(sagas.fetchSeasonsIds)
				.dispatch(actions.fetchSeasonsIds)
				.withReducer(messageReducer)
				.hasFinalState({
					message: err,
					show: true,
					type: "error",
				})
				.run();
		});
	});

	describe("Update Season", () => {
		let message;
		let props;
		beforeEach(() => {
			message = "Successfully updated the season!";
			props = mocks.newSeason;
		});

		it("logical flow matches pattern for update season requests", () => {
			const res = { data: { message } };

			testSaga(sagas.updateSeason, { props })
				.next()
				.put(hideServerMessage())
				.next()
				.call(app.put, "season/update", { ...props })
				.next(res)
				.call(parseMessage, res)
				.next(res.data.message)
				.put(setServerMessage({ type: "success", message: res.data.message }))
				.next()
				.put(goBack())
				.next()
				.isDone();
		});

		it("successfully updates a season", async () => {
			mockApp.onPut("season/update").reply(200, { message });

			return expectSaga(sagas.updateSeason, { props })
				.dispatch(actions.updateSeason)
				.withReducer(messageReducer)
				.hasFinalState({
					message,
					show: true,
					type: "success",
				})
				.run();
		});

		it("if API call fails, it displays a message", async () => {
			const err = "Unable to delete the season.";
			mockApp.onPut("season/update").reply(404, { err });

			return expectSaga(sagas.updateSeason, { seasonId })
				.dispatch(actions.updateSeason)
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
