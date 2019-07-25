import React from "react";
import PropTypes from "prop-types";
import { Tooltip } from "antd";
import { FaUser, FaUserTimes } from "react-icons/fa";

const DisplayStatus = status => (
	<Tooltip title={status} placement="top">
		{status === "active" ? (
			<FaUser style={{ color: "green", position: "relative", top: "2px" }} />
		) : (
			<FaUserTimes
				style={{ fontSize: 22, position: "relative", top: "2px", color: "red" }}
			/>
		)}
		<span style={{ fontSize: 16, paddingLeft: 5 }}>({status})</span>
	</Tooltip>
);

DisplayStatus.propTypes = {
	status: PropTypes.string.isRequired,
};

export default DisplayStatus;
