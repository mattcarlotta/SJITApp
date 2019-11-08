import React from "react";
import PropTypes from "prop-types";
import { Badge, ColumnTitle } from "components/Body";

const Legend = ({ className }) => (
	<div className={className}>
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
};

export default Legend;
