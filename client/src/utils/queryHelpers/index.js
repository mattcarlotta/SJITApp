import qs from "qs";

export const stringifyQuery = query => qs.stringify(query, { skipNulls: true });

export const parseQuery = query => {
	const queries = qs.parse(query, {
		ignoreQueryPrefix: true,
	});

	return {
		...queries,
		page: parseInt(queries.page || 1, 10),
	};
};
