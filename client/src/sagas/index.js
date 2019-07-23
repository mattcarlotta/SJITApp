import { all } from "redux-saga/effects";
import authSagas from "./Auth";
import membersSagas from "./Members";
import seasonsSagas from "./Seasons";

export default function* rootSaga() {
	yield all([authSagas(), membersSagas(), seasonsSagas()]);
}
