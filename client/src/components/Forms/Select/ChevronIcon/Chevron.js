import React from "react";
import PropTypes from "prop-types";
import { MdChevronRight } from "react-icons/md";

const Chevron = ({ className }) => (
	<div className={className}>
		<MdChevronRight />
	</div>
);

Chevron.propTypes = {
	className: PropTypes.string.isRequired,
};

export default Chevron;
