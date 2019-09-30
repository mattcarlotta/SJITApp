import React from "react";
import PropTypes from "prop-types";
import { FadeIn } from "components/Body";

const LoadingForm = ({ className, rows }) => {
	const inputs = [...Array(rows).keys()];

	return (
		<FadeIn>
			<div className={className}>
				{inputs.map(value => (
					<div key={value} className="input" />
				))}
			</div>
		</FadeIn>
	);
};

LoadingForm.propTypes = {
	className: PropTypes.string.isRequired,
	rows: PropTypes.number.isRequired,
};

export default LoadingForm;
