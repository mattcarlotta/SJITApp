import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { FaChevronLeft, FaBan, FaPlus } from "react-icons/fa";
import { Button } from "components/Body";

const iconStyle = {
	position: "relative",
	top: 3,
};

const btnStyle = {
	padding: "5px 10px",
	display: "inline-block",
};

const ExtraButtons = ({ push }) => (
	<Button
		primary
		width="100px"
		style={btnStyle}
		onClick={() => push("/employee/members/viewall")}
	>
		<FaChevronLeft style={iconStyle} /> Back
	</Button>
);

ExtraButtons.propTypes = {
	push: PropTypes.func.isRequired,
};

export default ExtraButtons;
