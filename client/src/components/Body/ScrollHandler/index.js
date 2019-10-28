import { PureComponent } from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";

export class ScrollHandler extends PureComponent {
	componentDidMount = () => this.handleScroll();

	componentDidUpdate = prevProps => {
		if (this.props.location.pathname !== prevProps.location.pathname)
			this.handleScroll();
	};

	handleScroll = () => {
		setTimeout(() => {
			window.scrollTo({
				behavior: "auto",
				top: 0,
			});
		});
	};

	render = () => this.props.children;
}

ScrollHandler.propTypes = {
	children: PropTypes.node.isRequired,
	location: PropTypes.shape({
		hash: PropTypes.string,
		key: PropTypes.string,
		pathname: PropTypes.string,
		search: PropTypes.string,
		state: PropTypes.any,
	}),
};

export default withRouter(ScrollHandler);
