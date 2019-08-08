import React from "react";
import PropTypes from "prop-types";
import { FaPlus } from "react-icons/fa";

const iconStyle = {
	position: "relative",
	top: 3,
};

const AddField = ({ className, onClick, text }) => (
	<button type="button" className={className} onClick={onClick}>
		<FaPlus style={iconStyle} />
		<span className="text">{text}</span>
	</button>
);

AddField.propTypes = {
	className: PropTypes.string.isRequired,
	onClick: PropTypes.func.isRequired,
	text: PropTypes.string.isRequired,
};

export default AddField;
