import React from "react";
import { Provider } from "react-redux";
import { ConnectedRouter, routerMiddleware } from "connected-react-router";
import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension/developmentOnly";
import { createBrowserHistory } from "history";
import createSagaMiddleware from "redux-saga";
import { createStateSyncMiddleware } from "redux-state-sync";
import { ConfigProvider } from "antd";
import enUS from "antd/lib/locale-provider/en_US";
import * as types from "types";
import "froala-editor/js/froala_editor.pkgd.min.js";
import "froala-editor/js/plugins/colors.min.js";
import "froala-editor/js/plugins/font_family.min.js";
import "froala-editor/js/plugins/font_size.min.js";
import "froala-editor/js/plugins/link.min.js";
import "froala-editor/js/plugins/lists.min.js";
import "froala-editor/js/plugins/align.min.js";
import "froala-editor/js/plugins/quote.min.js";

import createRootReducer from "reducers";
import rootSagas from "sagas";
import { MainRoutes } from "routes";

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
