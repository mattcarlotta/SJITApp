import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";
import authReducer from "./Auth";
import serverMessageReducer from "./Messages";

const reducers = {
	auth: authReducer,
	server: serverMessageReducer,
};

export default history =>
	combineReducers({ router: connectRouter(history), ...reducers });
