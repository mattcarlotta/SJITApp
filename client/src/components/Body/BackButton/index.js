import React from "react";
import PropTypes from "prop-types";
import { FaChevronLeft } from "react-icons/fa";
import { Button } from "components/Body";

const iconStyle = {
	position: "relative",
	top: 3,
};

const btnStyle = {
	padding: "5px 10px",
	display: "inline-block",
};

const BackButton = ({ push, location, style, txtStyle }) => (
	<Button primary width="100px" style={style} onClick={() => push(location)}>
		<FaChevronLeft style={iconStyle} />
		<span style={txtStyle}>Back</span>
	</Button>
);

BackButton.propTypes = {
	push: PropTypes.func.isRequired,
	location: PropTypes.string,
	style: PropTypes.objectOf(
		PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	),
	txtStyle: PropTypes.objectOf(
		PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	),
};

BackButton.defaultProps = {
	style: {},
	txtStyle: {},
};

export default BackButton;
