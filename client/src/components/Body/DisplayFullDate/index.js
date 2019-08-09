import React from "react";
import PropTypes from "prop-types";
import moment from "moment";

const DisplayFullDate = ({ date }) => (
	<span>{moment(date).format("MMM Do @ h:mm a")}</span>
);

DisplayFullDate.propTypes = {
	date: PropTypes.string.isRequired,
};

export default DisplayFullDate;
