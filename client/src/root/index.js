import React from "react";
import { Provider } from "react-redux";
import { ConnectedRouter, routerMiddleware } from "connected-react-router";
import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension/developmentOnly";
import { createBrowserHistory } from "history";
import createSagaMiddleware from "redux-saga";
import { ConfigProvider } from "antd";
import enUS from "antd/lib/locale-provider/en_US";
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

const history = createBrowserHistory();
export const saga = createSagaMiddleware();
const middlewares = applyMiddleware(saga, routerMiddleware(history));

export const store = createStore(
	createRootReducer(history),
	composeWithDevTools(middlewares),
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
