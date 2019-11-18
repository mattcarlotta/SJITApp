import React from "react";
import PropTypes from "prop-types";

const { buildTimeStamp, buildVersion, commitCount, commitHash } = process.env;

const BuildVersion = ({ className }) => (
	<div className={className}>
		<p>SJS Ice Team Scheduling App</p>
		<p>
			build {commitCount}.{commitHash}_{buildVersion}
		</p>
		<p>{buildTimeStamp}</p>
	</div>
);

BuildVersion.propTypes = {
	className: PropTypes.string.isRequired,
};

export default BuildVersion;
