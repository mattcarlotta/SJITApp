import { all } from "redux-saga/effects";
import authSagas from "./Auth";
import eventsSagas from "./Events";
import formsSagas from "./Forms";
import membersSagas from "./Members";
import seasonsSagas from "./Seasons";

export default function* rootSaga() {
	yield all([
		authSagas(),
		eventsSagas(),
		formsSagas(),
		membersSagas(),
		seasonsSagas(),
	]);
}
