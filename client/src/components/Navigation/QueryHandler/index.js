import { PureComponent } from "react";
import PropTypes from "prop-types";
import { parseQuery, stringifyQuery } from "utils/queryHelpers";

class QueryHandler extends PureComponent {
	state = {
		queries: parseQuery(this.props.location.search),
		queryString: this.props.location.search.replace(/[?]/g, ""),
	};

	static getDerivedStateFromProps({ location }) {
		const queries = parseQuery(location.search);
		return {
			queries,
			queryString: stringifyQuery(queries),
		};
	}

	updateQuery = (nextQuery, page = 1) => {
		const {
			location: { pathname, search },
		} = this.props;

		const currentQueries = parseQuery(search);

		const queryString = stringifyQuery({
			...currentQueries,
			...nextQuery,
			page,
		});

		this.props.push(`${pathname}?${queryString}`);
	};

	clearFilters = () =>
		this.props.push(`${this.props.location.pathname}?page=1`);

	render = () =>
		this.props.children({
			...this.state,
			clearFilters: this.clearFilters,
			updateQuery: this.updateQuery,
		});
}

QueryHandler.propTypes = {
	location: PropTypes.shape({
		pathname: PropTypes.string,
		search: PropTypes.string,
	}),
	push: PropTypes.func.isRequired,
	children: PropTypes.func.isRequired,
};

export default QueryHandler;
