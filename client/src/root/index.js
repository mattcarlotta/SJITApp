import React from "react";
import { Provider } from "react-redux";
import { ConnectedRouter, routerMiddleware } from "connected-react-router";
import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension/developmentOnly";
import { createBrowserHistory } from "history";
import createSagaMiddleware from "redux-saga";
import { LocaleProvider } from "antd";
import enUS from "antd/lib/locale-provider/en_US";

import createRootReducer from "reducers";
import rootSagas from "sagas";
import Routes from "routes";

const history = createBrowserHistory();
export const saga = createSagaMiddleware();
const middlewares = applyMiddleware(saga, routerMiddleware(history));

export const store = createStore(
	createRootReducer(history),
	composeWithDevTools(middlewares),
);

saga.run(rootSagas);

const Root = () => (
	<LocaleProvider locale={enUS}>
		<Provider store={store}>
			<ConnectedRouter history={history}>
				<Routes />
			</ConnectedRouter>
		</Provider>
	</LocaleProvider>
);

export default Root;
