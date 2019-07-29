import React, { Component } from "react";
import PropTypes from "prop-types";

class ClickHandler extends Component {
	state = {
		isVisible: false,
	};

	componentDidMount() {
		document.addEventListener("mousedown", this.handleClickOutside);
		document.addEventListener("keydown", this.handleTabPress);
	}

	componentWillUnmount() {
		/* istanbul ignore next */
		document.removeEventListener("mousedown", this.handleClickOutside);
		/* istanbul ignore next */
		document.removeEventListener("keydown", this.handleTabPress);
	}

	handleTabPress = ({ key, target }) => {
		if (key === "Tab") {
			if (
				!this.state.isVisible &&
				this.wrapperRef &&
				this.wrapperRef.contains(target)
			) {
				this.handleOpen();
			} else {
				/* istanbul ignore next */
				if (
					this.state.isVisible &&
					this.wrapperRef &&
					!this.wrapperRef.contains(target)
				) {
					this.handleClose();
				}
			}
		}
	};

	handleClickOutside = ({ target }) => {
		if (
			this.state.isVisible &&
			this.wrapperRef &&
			!this.wrapperRef.contains(target)
		) {
			this.handleClose();
		}
	};

	handleClose = () => {
		this.setState({ isVisible: false });
	};

	handleOpen = () => {
		this.setState({ isVisible: true });
	};

	handleSelectClick = () => {
		this.setState(prevState => ({ isVisible: !prevState.isVisible }));
	};

	handleOptionSelect = props => {
		this.setState({ isVisible: false }, () =>
			this.props.onChange({ ...props }),
		);
	};

	render = () => (
		<div className="clickhandler" ref={node => (this.wrapperRef = node)}>
			{this.props.children({
				isVisible: this.state.isVisible,
				handleSelectClick: this.handleSelectClick,
				handleOptionSelect: this.handleOptionSelect,
			})}
		</div>
	);
}

ClickHandler.propTypes = {
	onChange: PropTypes.func.isRequired,
	children: PropTypes.func.isRequired,
};

export default ClickHandler;
