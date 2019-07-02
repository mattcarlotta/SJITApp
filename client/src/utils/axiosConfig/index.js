import get from "lodash/get";
import axios from "axios";
import { inDevelopment, APIPORT } from "../../../config/envs";

const app = axios.create({
	baseURL: inDevelopment
		? `http://localhost:${APIPORT}/api/`
		: "https://example.com",
	withCredentials: true,
});

app.interceptors.response.use(
	response => response,
	error => {
		const err = get(error, ["response", "data", "err"]);

		return err ? Promise.reject(err) : Promise.reject(error.message);
	},
);

export default app;
