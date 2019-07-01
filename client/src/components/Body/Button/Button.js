import React from "react";
import PropTypes from "prop-types";

const StyledButton = ({ className, children, onClick, type }) => (
	<button
		className={className}
		type={!type ? "button" : type}
		onClick={onClick}
	>
		{children}
	</button>
);

StyledButton.propTypes = {
	className: PropTypes.string.isRequired,
	children: PropTypes.oneOfType([PropTypes.node, PropTypes.string]).isRequired,
	onClick: PropTypes.func,
	type: PropTypes.string,
};

export default StyledButton;
