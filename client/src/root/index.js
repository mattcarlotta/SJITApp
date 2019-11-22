import React from "react";
import { Provider } from "react-redux";
import { ConnectedRouter, routerMiddleware } from "connected-react-router";
import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension/developmentOnly";
import { createBrowserHistory } from "history";
import createSagaMiddleware from "redux-saga";
import { createStateSyncMiddleware } from "redux-state-sync";
import moment from "moment-timezone";
import { ConfigProvider } from "antd";
import enUS from "antd/lib/locale-provider/en_US";
import * as types from "types";

import createRootReducer from "reducers";
import rootSagas from "sagas";
import MainRoutes from "routes/MainRoutes";

moment.tz.setDefault("America/Los_Angeles");
const inTesting = process.env.NODE_ENV === "testing";

const history = createBrowserHistory();
export const saga = createSagaMiddleware();
const config = {
	whitelist: [
		types.MESSAGE_HIDE,
		types.MESSAGE_RESET,
		types.MESSAGE_SET,
		types.USER_SIGNIN_ATTEMPT,
		types.USER_SIGNOUT,
	],
};

const middlewares = [saga, routerMiddleware(history)];
/* istanbul ignore next */
if (!inTesting) middlewares.push(createStateSyncMiddleware(config));

const appliedMiddleware = applyMiddleware(...middlewares);

export const store = createStore(
	createRootReducer(history),
	composeWithDevTools(appliedMiddleware),
);

saga.run(rootSagas);

const Root = () => (
	<ConfigProvider locale={enUS}>
		<Provider store={store}>
			<ConnectedRouter history={history}>
				<MainRoutes />
			</ConnectedRouter>
		</Provider>
	</ConfigProvider>
);

export default Root;
