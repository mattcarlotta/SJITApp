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

const BackButton = ({ push, location }) => (
	<Button primary width="100px" style={btnStyle} onClick={() => push(location)}>
		<FaChevronLeft style={iconStyle} /> Back
	</Button>
);

BackButton.propTypes = {
	push: PropTypes.func.isRequired,
};

export default BackButton;
