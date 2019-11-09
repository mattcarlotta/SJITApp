/* eslint-disable react/forbid-prop-types */
import React from "react";
import PropTypes from "prop-types";
import { Popover, Button } from "antd";
import { FaCircle, FaRegCircle } from "react-icons/fa";

const iconStyle = {
	position: "relative",
	top: 1,
	fontSize: 12,
};

const FilterButton = ({ content, title, value }) => (
	<Popover placement="bottom" trigger="click" content={content}>
		<Button style={{ marginRight: 5, height: 41 }} onClick={null}>
			<span css="margin-right: 5px;">{title}</span>{" "}
			{value ? (
				<FaCircle style={iconStyle} />
			) : (
				<FaRegCircle style={iconStyle} />
			)}
		</Button>
	</Popover>
);

FilterButton.propTypes = {
	content: PropTypes.node.isRequired,
	title: PropTypes.string.isRequired,
	value: PropTypes.any,
};

export default FilterButton;
/* eslint-enable react/forbid-prop-types */
