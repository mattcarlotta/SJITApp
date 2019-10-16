import React from "react";
import PropTypes from "prop-types";
import moment from "moment";

const FormatDate = ({ date, format, style }) => (
	<span style={style}>{moment(date || Date.now()).format(format)}</span>
);

FormatDate.propTypes = {
	date: PropTypes.string.isRequired,
	format: PropTypes.string.isRequired,
	style: PropTypes.objectOf(
		PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	),
};

export default FormatDate;
