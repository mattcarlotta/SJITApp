import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";
import { withReduxStateSync } from "redux-state-sync";
import * as types from "types";
import authReducer from "./Auth";
import eventReducer from "./Events";
import formReducer from "./Forms";
import mailReducer from "./Mail";
import memberReducer from "./Members";
import seasonReducer from "./Seasons";
import serverMessageReducer from "./Messages";

const reducers = {
	auth: authReducer,
	events: eventReducer,
	forms: formReducer,
	mail: mailReducer,
	members: memberReducer,
	seasons: seasonReducer,
	server: serverMessageReducer,
};

const appReducer = history =>
	withReduxStateSync(
		combineReducers({ router: connectRouter(history), ...reducers }),
	);

export default history => (state, action) =>
	appReducer(history)(
		action.type === types.USER_SIGNOUT
			? { router: state.router, server: state.server }
			: state,
		action,
	);
