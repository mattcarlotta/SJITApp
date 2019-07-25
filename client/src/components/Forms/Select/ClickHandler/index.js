// import React, { useState, useEffect, useCallback, useRef } from "react";
// import PropTypes from "prop-types";

// const ClickHandler = ({ children, handleChange, width }) => {
// 	const wrapperRef = useRef();
// 	const [isVisible, setVisible] = useState(false);

// 	const handleClickOutside = useCallback(
// 		({ target }) => {
// 			if (isVisible && wrapperRef && !wrapperRef.current.contains(target)) {
// 				setVisible(false);
// 			}
// 		},
// 		[isVisible, wrapperRef],
// 	);

// 	const handleSelectClick = () => {
// 		setVisible(visible => !visible);
// 	};

// 	const handleOptionSelect = e => {
// 		setVisible(false);
// 		handleChange(e);
// 	};

// 	useEffect(() => {
// 		document.addEventListener("mousedown", handleClickOutside);

// 		return () => {
// 			document.removeEventListener("mousedown", handleClickOutside);
// 		};
// 	}, [handleClickOutside]);

// 	return (
// 		<div style={{ display: "inline-block" }} ref={wrapperRef}>
// 			{children({
// 				isVisible,
// 				handleSelectClick,
// 				handleOptionSelect,
// 			})}
// 		</div>
// 	);
// };

import React, { Component } from "react";
import PropTypes from "prop-types";

class ClickHandler extends Component {
	state = {
		isVisible: false,
	};

	static propTypes = {
		handleChange: PropTypes.func.isRequired,
		children: PropTypes.func.isRequired,
	};

	componentDidMount() {
		document.addEventListener("mousedown", this.handleClickOutside);
	}

	componentWillUnmount() {
		document.removeEventListener("mousedown", this.handleClickOutside);
	}

	handleClickOutside = ({ target }) => {
		if (
			this.state.isVisible &&
			this.wrapperRef &&
			!this.wrapperRef.contains(target)
		) {
			this.handleSelectClose();
		}
	};

	handleSelectClose = () => {
		this.setState({ isVisible: false });
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
		<div ref={node => (this.wrapperRef = node)}>
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
