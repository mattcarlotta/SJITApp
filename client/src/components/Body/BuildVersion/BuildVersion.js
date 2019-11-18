import React from "react";
import PropTypes from "prop-types";
import moment from "moment-timezone";

const BuildVersion = ({ className }) => (
	<div className={className}>
		<p>SJS Ice Team Scheduling Application</p>
		<p>Build 0.0.1b-{moment().format()}</p>
	</div>
);

BuildVersion.propTypes = {
	className: PropTypes.string.isRequired,
};

export default BuildVersion;
