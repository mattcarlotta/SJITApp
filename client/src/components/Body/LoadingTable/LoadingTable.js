import React from "react";
import PropTypes from "prop-types";

const LoadingTable = ({ className }) => (
	<div className={className}>
		<div className="thead" />
		<div className="tbody" />
	</div>
);

LoadingTable.propTypes = {
	className: PropTypes.string.isRequired,
};

export default LoadingTable;
