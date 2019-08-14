import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";
import authReducer from "./Auth";
import eventReducer from "./Events";
import formReducer from "./Forms";
import memberReducer from "./Members";
import seasonReducer from "./Seasons";
import serverMessageReducer from "./Messages";

const reducers = {
	auth: authReducer,
	events: eventReducer,
	forms: formReducer,
	members: memberReducer,
	seasons: seasonReducer,
	server: serverMessageReducer,
};

export default history =>
	combineReducers({ router: connectRouter(history), ...reducers });
