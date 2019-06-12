import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";
import authReducer from "./auth";
import serverMessageReducer from "./messages";

const reducers = {
	auth: authReducer,
	server: serverMessageReducer,
};

export default history =>
	combineReducers({ router: connectRouter(history), ...reducers });
