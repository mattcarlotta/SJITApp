import { all } from "redux-saga/effects";
import authSagas from "./Auth";
import eventsSagas from "./Events";
import membersSagas from "./Members";
import seasonsSagas from "./Seasons";

export default function* rootSaga() {
	yield all([authSagas(), eventsSagas(), membersSagas(), seasonsSagas()]);
}
