import React from "react";
import PropTypes from "prop-types";
import moment from "moment";

const DisplayDate = ({ date }) => (
	<span>{moment(date).format("MM/DD/YYYY")}</span>
);

DisplayDate.propTypes = {
	date: PropTypes.string.isRequired,
};

export default DisplayDate;
