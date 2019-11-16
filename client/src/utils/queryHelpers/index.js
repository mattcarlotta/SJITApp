import qs from "qs";

export const stringifyQuery = query => qs.stringify(query, { skipNulls: true });

export const parseQuery = query => {
	const queries = qs.parse(query, {
		ignoreQueryPrefix: true,
	});

	/* istanbul ignore next */
	return {
		...queries,
		page: parseInt(queries.page || 1, 10),
	};
};

export const setQuery = query => {
	const queries = parseQuery(query);
	const queryString = stringifyQuery(queries);

	return { queries, queryString };
};
