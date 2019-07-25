import React from "react";
import PropTypes from "prop-types";
import {
	FaUserCircle,
	FaLock,
	FaBug,
	FaEnvelope,
	FaKey,
	FaCalendarAlt,
	FaIdCard,
	FaUserTag,
	FaIdCardAlt,
} from "react-icons/fa";

const icons = type => {
	switch (type) {
		case "calander":
			return <FaCalendarAlt />;
		case "id":
			return <FaIdCard />;
		case "key":
			return <FaKey />;
		case "lock":
			return <FaLock />;
		case "mail":
			return <FaEnvelope />;
		case "user":
			return <FaUserCircle />;
		case "usertag":
			return <FaIdCardAlt />;
		default:
			return <FaBug />;
	}
};

const Icon = ({ className, type }) => (
	<i className={className}>{icons(type)}</i>
);

Icon.propTypes = {
	className: PropTypes.string.isRequired,
	type: PropTypes.string,
};

export default Icon;
