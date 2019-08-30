import React from "react";
import PropTypes from "prop-types";
import moment from "moment";

const DisplayShortDate = ({ date }) => (
	<span>{moment(date).format("MMM Do")}</span>
);

DisplayShortDate.propTypes = {
	date: PropTypes.string.isRequired,
};

export default DisplayShortDate;
