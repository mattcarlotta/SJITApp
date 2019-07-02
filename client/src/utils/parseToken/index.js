import qs from "qs";

export default search => {
	const { token } = qs.parse(search, {
		ignoreQueryPrefix: true,
	});

	return token;
};
