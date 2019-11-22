import React from "react";
import PropTypes from "prop-types";
import FadeIn from "components/Body/FadeIn";

const LoadingTable = ({ className }) => (
	<FadeIn>
		<div className={className}>
			<div className="thead" />
			<div className="tbody" />
		</div>
	</FadeIn>
);

LoadingTable.propTypes = {
	className: PropTypes.string.isRequired,
};

export default LoadingTable;
