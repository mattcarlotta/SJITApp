import React from "react";
import PropTypes from "prop-types";
import { Tooltip } from "antd";
import { FaUser, FaUserTimes } from "react-icons/fa";

const activeUserStyle = { color: "green", position: "relative", top: "2px" };
const inactiveUserStyle = {
	fontSize: 22,
	position: "relative",
	top: "5px",
	color: "red",
};
const titleStyle = { fontSize: 16, paddingLeft: 5 };

const DisplayStatus = status => (
	<Tooltip title={status} placement="top">
		{status === "active" ? (
			<FaUser style={activeUserStyle} />
		) : (
			<FaUserTimes style={inactiveUserStyle} />
		)}
		<span style={titleStyle}>({status})</span>
	</Tooltip>
);

DisplayStatus.propTypes = {
	status: PropTypes.string.isRequired,
};

export default DisplayStatus;
