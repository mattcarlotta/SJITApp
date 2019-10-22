import React from "react";
import PropTypes from "prop-types";
import { FaExclamationTriangle } from "react-icons/fa";

const iconStyle = {
	position: "relative",
	top: 2,
	marginRight: 5,
};

const WarningText = ({ className, children }) => (
	<span className={className}>
		<FaExclamationTriangle style={iconStyle} /> {children}
	</span>
);

WarningText.propTypes = {
	className: PropTypes.string.isRequired,
	children: PropTypes.oneOfType([PropTypes.node, PropTypes.string]).isRequired,
};

export default WarningText;
