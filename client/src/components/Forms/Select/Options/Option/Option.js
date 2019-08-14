import React from "react";
import PropTypes from "prop-types";

const Option = ({ className, onClick, onKeyPress, name, value }) => (
	<div
		id={value}
		tabIndex={0}
		className={className}
		data-name={name}
		data-value={value}
		onClick={onClick}
		onKeyPress={onKeyPress}
	>
		{value}
	</div>
);

Option.propTypes = {
	className: PropTypes.string.isRequired,
	onClick: PropTypes.func.isRequired,
	onKeyPress: PropTypes.func.isRequired,
	name: PropTypes.string.isRequired,
	value: PropTypes.string.isRequired,
};

export default Option;
