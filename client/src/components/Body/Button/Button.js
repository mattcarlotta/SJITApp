import React from "react";
import PropTypes from "prop-types";

const StyledButton = ({ className, children, disabled, onClick, type }) => (
	<button
		className={className}
		type={!type ? "button" : type}
		onClick={onClick}
		disabled={disabled || false}
	>
		{children}
	</button>
);

StyledButton.propTypes = {
	className: PropTypes.string.isRequired,
	children: PropTypes.oneOfType([PropTypes.node, PropTypes.string]).isRequired,
	disabled: PropTypes.bool,
	onClick: PropTypes.func,
	type: PropTypes.string,
};

export default StyledButton;
