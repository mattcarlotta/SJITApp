import React from "react";
import PropTypes from "prop-types";
import { FadeIn } from "components/Body";

const LoadingPanel = ({ className }) => (
	<FadeIn>
		<div className={className} />
	</FadeIn>
);

LoadingPanel.propTypes = {
	className: PropTypes.string.isRequired,
};

export default LoadingPanel;
