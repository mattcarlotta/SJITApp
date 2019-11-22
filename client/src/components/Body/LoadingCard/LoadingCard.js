import React from "react";
import PropTypes from "prop-types";
import { Card } from "antd";
import FadeIn from "components/Body/FadeIn";

const LoadingCard = ({ className, style }) => (
	<Card title={<span css="color: #025f6d;">Loading...</span>}>
		<FadeIn timing="2s">
			<div className={className} style={style} />
		</FadeIn>
	</Card>
);

LoadingCard.propTypes = {
	className: PropTypes.string.isRequired,
	style: PropTypes.objectOf(
		PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	),
};

export default LoadingCard;
