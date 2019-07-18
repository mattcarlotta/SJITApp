import { all } from "redux-saga/effects";
import authSagas from "./Auth";
import seasonsSagas from "./Seasons";

export default function* rootSaga() {
	yield all([authSagas(), seasonsSagas()]);
}
