/* istanbul ignore file */
import React, { PureComponent } from "react";
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
			if (this.wrapper) this.wrapper.scrollIntoView();
		}, 100);
	};

	render = () => (
		<div ref={node => (this.wrapper = node)}>{this.props.children}</div>
	);
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
