import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const LinkComponent = ({ className, children, style, to }) => (
	<Link className={className} style={style} to={to}>
		{children}
	</Link>
);

LinkComponent.propTypes = {
	className: PropTypes.string.isRequired,
	children: PropTypes.string.isRequired,
	style: PropTypes.objectOf(PropTypes.string),
	to: PropTypes.string.isRequired,
};

export default LinkComponent;
