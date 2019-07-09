import { expectSaga, testSaga } from "redux-saga-test-plan";
import { call, put } from "redux-saga/effects";
import { app } from "utils";
import * as actions from "actions/auth";
import { setServerMessage } from "actions/messages";
import * as sagas from "sagas/auth";
import * as mocks from "sagas/__mocks__/sagas.mocks";
import authReducer from "reducers/auth";
import messageReducer from "reducers/messages";

describe("Auth Sagas", () => {
	afterEach(() => {
		mockApp.reset();
	});

	afterAll(() => {
		mockApp.restore();
	});

	describe("Authenticate User", () => {
		it("logical flow matches pattern for a signed in session", () => {
			const res = { data: { ...mocks.userSession } };

			testSaga(sagas.authenticateUser)
				.next()
				.call(app.get, "signedin")
				.next(res)
				.put(actions.signin(res.data))
				.next()
				.isDone();
		});

		it("logical flow matches pattern for a guest sign in", () => {
			const res = { data: {} };

			testSaga(sagas.authenticateUser)
				.next()
				.call(app.get, "signedin")
				.next(res)
				.put(actions.signin({ role: "guest" }))
				.next()
				.isDone();
		});

		it("sets the current signed in user from a session", async () => {
			mockApp.onGet("signedin").reply(200, mocks.userSession);

			return expectSaga(sagas.authenticateUser)
				.dispatch(actions.authenticateUser)
				.withReducer(authReducer)
				.hasFinalState(mocks.userSession)
				.run();
		});

		it("sets the current signed as a guest when no session is present", async () => {
			mockApp.onGet("signedin").reply(200, {});

			return expectSaga(sagas.authenticateUser)
				.dispatch(actions.authenticateUser)
				.withReducer(authReducer)
				.hasFinalState({
					id: "",
					email: "",
					firstName: "",
					lastName: "",
					role: "guest",
				})
				.run();
		});

		it("if API call fails, it displays a message", async () => {
			const err = "Unable to automatically sign in";
			mockApp.onGet("signedin").reply(404, { err });

			return expectSaga(sagas.authenticateUser)
				.dispatch(actions.authenticateUser)
				.withReducer(messageReducer)
				.hasFinalState({
					message: err,
					show: true,
					type: "error",
				})
				.run();
		});
	});

	describe("Reset User Password", () => {
		it("logical flow matches pattern for a successful password reset request", () => {
			const props = mocks.resetPassword;
			const history = { push: jest.fn() };
			const message = "Successfully changed password.";
			const res = { data: { message } };

			testSaga(sagas.resetPassword, { props, history })
				.next()
				.call(app.put, "reset-password", { ...mocks.resetPassword })
				.next(res)
				.put(setServerMessage({ type: "info", message: res.data.message }))
				.next()
				.isDone();
		});

		it("successfully requests a password reset", async () => {
			const props = mocks.resetPassword;
			const history = { push: jest.fn() };
			const message =
				"An password reset email has been sent to test@example.com.";
			mockApp.onPut("reset-password").reply(200, { message });

			return expectSaga(sagas.resetPassword, { props, history })
				.dispatch(actions.resetPassword)
				.withReducer(messageReducer)
				.hasFinalState({
					message,
					show: true,
					type: "info",
				})
				.run();
		});

		it("if API call fails, it displays a message", async () => {
			const props = mocks.resetPassword;
			const history = { push: jest.fn() };
			const err = "Unable to automatically sign in";
			mockApp.onPut("reset-password").reply(404, { err });

			return expectSaga(sagas.resetPassword, { props, history })
				.dispatch(actions.resetPassword)
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
