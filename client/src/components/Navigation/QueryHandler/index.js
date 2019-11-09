import { PureComponent } from "react";
import PropTypes from "prop-types";
import { setQuery, stringifyQuery } from "utils/queryHelpers";

class QueryHandler extends PureComponent {
	state = {
		...setQuery(this.props.location.search),
	};

	static getDerivedStateFromProps({ location }) {
		return {
			...setQuery(location.search),
		};
	}

	updateQuery = nextQuery => {
		const {
			location: { pathname },
			push,
		} = this.props;

		const query = stringifyQuery({
			...this.state.queries,
			...nextQuery,
		});

		push(`${pathname}?${query}`);
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
