import React from "react";
import PropTypes from "prop-types";

const Notes = ({ className, notes, style }) => (
	<div className={className} style={style}>
		<i style={{ marginRight: 5 }}>Special Notes: </i>
		<span>{notes}</span>
	</div>
);

Notes.propTypes = {
	className: PropTypes.string.isRequired,
	style: PropTypes.objectOf(
		PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	),
	notes: PropTypes.string,
};

export default Notes;
