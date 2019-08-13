/* istanbul ignore file */
/* eslint-disable no-unneeded-ternary */
import get from "lodash/get";
import axios from "axios";
import { inDevelopment, APIPORT } from "../../../config/envs";

const app = axios.create({
	/* eslint-disable-next  */
	baseURL: inDevelopment
		? `http://localhost:${APIPORT}/api/`
		: "https://example.com",
	withCredentials: true,
});

app.interceptors.response.use(
	response => response,
	error => {
		const err = get(error, ["response", "data", "err"]);

		return Promise.reject(err ? err : error.message);
	},
);

export default app;
/* eslint-enable no-unneeded-ternary */
