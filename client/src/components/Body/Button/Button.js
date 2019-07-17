import React from "react";
import PropTypes from "prop-types";

const StyledButton = ({
	className,
	children,
	disabled,
	onClick,
	style,
	type,
}) => (
	<button
		className={className}
		disabled={disabled}
		onClick={onClick}
		style={style}
		type={type}
	>
		{children}
	</button>
);

StyledButton.propTypes = {
	className: PropTypes.string.isRequired,
	children: PropTypes.oneOfType([PropTypes.node, PropTypes.string]).isRequired,
	disabled: PropTypes.bool,
	onClick: PropTypes.func,
	style: PropTypes.objectOf(
		PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	),
	type: PropTypes.string,
};

StyledButton.defaultProps = {
	disabled: false,
	type: "button",
};

export default StyledButton;
