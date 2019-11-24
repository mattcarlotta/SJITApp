/* istanbul ignore file */
import React from "react";
import PropTypes from "prop-types";
import { Tooltip } from "antd";

const { IMAGEAPI } = process.env;

const DisplayTeam = ({ folder, team }) => (
	<Tooltip placement="top" title={team}>
		<img src={`${IMAGEAPI}/${folder}/${team}.png`} alt={`${team}.png`} />
	</Tooltip>
);

DisplayTeam.propTypes = {
	folder: PropTypes.string.isRequired,
	team: PropTypes.string.isRequired,
};

export default DisplayTeam;
