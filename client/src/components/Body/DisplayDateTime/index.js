import React from "react";
import PropTypes from "prop-types";
import moment from "moment";

const DisplayDateTime = ({ date }) => (
	<span>{moment(date).format("MM/DD/YY @ hh:mm a")}</span>
);

DisplayDateTime.propTypes = {
	date: PropTypes.string.isRequired,
};

export default DisplayDateTime;
