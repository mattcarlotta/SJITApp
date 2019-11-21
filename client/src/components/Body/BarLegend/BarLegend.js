import React from "react";
import PropTypes from "prop-types";
import { Badge, ColumnTitle } from "components/Body";

const BarLegend = ({ className, style }) => (
	<div className={className} style={style}>
		<ColumnTitle style={{ marginBottom: 5 }}>Legend</ColumnTitle>
		{["Scheduled Games", "Available Games"].map(response => (
			<Badge key={response} response={response} style={{ fontSize: 17 }}>
				{response}
			</Badge>
		))}
	</div>
);

BarLegend.propTypes = {
	className: PropTypes.string.isRequired,
	style: PropTypes.objectOf(
		PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	),
};

export default BarLegend;
