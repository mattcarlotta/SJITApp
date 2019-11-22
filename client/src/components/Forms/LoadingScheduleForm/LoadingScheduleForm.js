import React from "react";
import PropTypes from "prop-types";
import Flex from "components/Body/Flex";

const LoadingScheduleForm = ({ className }) => (
	<div className={className}>
		<Flex>
			<div className="loading legend" />
			<div className="loading gamedetails" />
		</Flex>
		<div className="loading form" />
	</div>
);

LoadingScheduleForm.propTypes = {
	className: PropTypes.string.isRequired,
};

export default LoadingScheduleForm;
