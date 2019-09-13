import React from "react";
import PropTypes from "prop-types";

const Notes = ({ className, notes, style }) => (
	<div className={className} style={style}>
		<i>Special Notes: </i> {notes}
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
