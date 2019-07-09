import React from "react";
import { Provider } from "react-redux";
import { ConnectedRouter, routerMiddleware } from "connected-react-router";
import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension/developmentOnly";
import { createBrowserHistory } from "history";
import createSagaMiddleware from "redux-saga";
// import thunk from "redux-thunk";
import createRootReducer from "reducers";
import rootSaga from "sagas";
import Routes from "routes";

const history = createBrowserHistory();
const saga = createSagaMiddleware();
const middlewares = applyMiddleware(saga, routerMiddleware(history));

export const store = createStore(
	createRootReducer(history),
	composeWithDevTools(middlewares),
);

saga.run(rootSaga);

const Root = () => (
	<Provider store={store}>
		<ConnectedRouter history={history}>
			<Routes />
		</ConnectedRouter>
	</Provider>
);

export default Root;
