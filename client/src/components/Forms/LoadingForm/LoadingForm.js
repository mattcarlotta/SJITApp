import React from "react";
import PropTypes from "prop-types";

const LoadingForm = ({ className, rows }) => {
	const inputs = [...Array(rows).keys()];

	return (
		<div className={className}>
			{inputs.map(value => (
				<div key={value} className="input" />
			))}
		</div>
	);
};

LoadingForm.propTypes = {
	className: PropTypes.string.isRequired,
	rows: PropTypes.number.isRequired,
};

export default LoadingForm;
