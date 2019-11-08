import React from "react";
import PropTypes from "prop-types";
import { FadeIn } from "components/Body";

const LoadingPanel = ({ className, style }) => (
	<FadeIn>
		<div className={className} style={style} />
	</FadeIn>
);

LoadingPanel.propTypes = {
	className: PropTypes.string.isRequired,
	style: PropTypes.objectOf(
		PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	),
};

export default LoadingPanel;
