import React from "react";
import PropTypes from "prop-types";
import Badge from "components/Body/Badge";
import ColumnTitle from "components/Body/ColumnTitle";

const Legend = ({ className, style }) => (
	<div className={className} style={style}>
		<ColumnTitle style={{ marginBottom: 5 }}>Legend</ColumnTitle>
		{[
			"I want to work.",
			"Available to work.",
			"Prefer not to work.",
			"Not available to work.",
			"No response.",
		].map(response => (
			<Badge key={response} response={response} style={{ fontSize: 17 }}>
				{response}
			</Badge>
		))}
	</div>
);

Legend.propTypes = {
	className: PropTypes.string.isRequired,
	style: PropTypes.objectOf(
		PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	),
};

export default Legend;
