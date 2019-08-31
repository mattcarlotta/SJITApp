import React from "react";
import PropTypes from "prop-types";
import moment from "moment";

const FormatDate = ({ date, format }) => (
	<span>{moment(date).format(format)}</span>
);

FormatDate.propTypes = {
	date: PropTypes.string.isRequired,
	format: PropTypes.string.isRequired,
};

export default FormatDate;
