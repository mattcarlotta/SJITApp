import React, { Component } from "react";
import PropTypes from "prop-types";

class ClickHandler extends Component {
	state = {
		isFocused: false,
	};

	shouldComponentUpdate = (nextProps, nextState) =>
		this.state.isFocused !== nextState.isFocused ||
		this.props.values !== nextProps.value;

	componentDidMount() {
		document.addEventListener("mousedown", this.handleClickOutside);
	}

	componentWillUnmount() {
		document.removeEventListener("mousedown", this.handleClickOutside);
	}

	handleClickOutside = ({ target }) => {
		if (
			this.state.isFocused &&
			this.wrapperRef &&
			!this.wrapperRef.contains(target)
		) {
			this.handleBlur();
		}
	};

	handleBlur = () => {
		this.setState({ isFocused: false });
	};

	handleFocus = () => {
		this.setState({ isFocused: true });
	};

	render = () => (
		<span ref={node => (this.wrapperRef = node)}>
			{this.props.children({
				isFocused: this.state.isFocused,
				handleBlur: this.handleBlur,
				handleFocus: this.handleFocus,
			})}
		</span>
	);
}

ClickHandler.propTypes = {
	children: PropTypes.func.isRequired,
	value: PropTypes.string,
};

export default ClickHandler;
