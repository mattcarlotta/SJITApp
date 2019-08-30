import React from "react";
import PropTypes from "prop-types";
import { FaUserAltSlash } from "react-icons/fa";

const NoUsers = ({ className }) => (
	<div className={className}>
		<FaUserAltSlash /> <br />
		No Employees
	</div>
);

NoUsers.propTypes = {
	className: PropTypes.string.isRequired,
};

export default NoUsers;
