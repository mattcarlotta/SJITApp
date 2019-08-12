import React from "react";
import PropTypes from "prop-types";
import { Tooltip } from "antd";
import { GoQuestion } from "react-icons/go";
import { Center } from "components/Body";

const Label = ({ className, name, label, tooltip }) => (
	<label className={className} htmlFor={name}>
		{label}
		{tooltip && (
			<span className="tooltip">
				<Tooltip placement="top" title={<Center>{tooltip}</Center>}>
					<GoQuestion />
				</Tooltip>
			</span>
		)}
	</label>
);

Label.propTypes = {
	className: PropTypes.string.isRequired,
	label: PropTypes.string,
	name: PropTypes.string,
	tooltip: PropTypes.string,
};

export default Label;
