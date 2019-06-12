import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";
import authReducer from "./auth";
import serverReducer from "./server";

const reducers = {
	auth: authReducer,
	server: serverReducer,
};

export default history =>
	combineReducers({ router: connectRouter(history), ...reducers });
