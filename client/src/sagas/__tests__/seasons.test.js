import { push } from "connected-react-router";
import { expectSaga, testSaga } from "redux-saga-test-plan";
import { app } from "utils";
import * as actions from "actions/Seasons";
import { setServerMessage } from "actions/Messages";
import * as sagas from "sagas/Seasons";
import * as mocks from "sagas/__mocks__/sagas.mocks";
import messageReducer from "reducers/Messages";
import { parseMessage } from "utils/parseResponse";

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
				.put(push("/employee/seasons/members"))
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
});
