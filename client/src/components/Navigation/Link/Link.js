import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const LinkComponent = ({ className, children, style, target, to }) => (
	<Link className={className} style={style} to={to} target={target}>
		{children}
	</Link>
);

LinkComponent.propTypes = {
	className: PropTypes.string.isRequired,
	children: PropTypes.oneOfType([PropTypes.node, PropTypes.string]).isRequired,
	style: PropTypes.objectOf(
		PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	),
	target: PropTypes.string,
	to: PropTypes.string.isRequired,
};

export default LinkComponent;
