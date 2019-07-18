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
} from "react-icons/fa";
import { Label } from "components/Body";
import { Errors } from "components/Forms";

const iconType = type => {
	switch (type) {
		case "key":
			return <FaKey />;
		case "lock":
			return <FaLock />;
		case "mail":
			return <FaEnvelope />;
		case "user":
			return <FaUserCircle />;
		case "calander":
			return <FaCalendarAlt />;
		case "id":
			return <FaIdCard />;
		default:
			return <FaBug />;
	}
};

const Input = ({
	className,
	containerStyle,
	errors,
	disabled,
	icon,
	inputStyle,
	isFocused,
	label,
	name,
	onBlur,
	onChange,
	onFocus,
	placeholder,
	readOnly,
	type,
	tooltip,
	value,
}) => (
	<div className={className} style={containerStyle}>
		<div
			className={[
				isFocused === name && "focused",
				errors && "error",
				disabled && "disabled",
			]
				.filter(c => !!c)
				.join(" ")}
		>
			{label && (
				<Label name={name} label={label} tooltip={tooltip} htmlFor={name} />
			)}
			{icon && <i className="icon">{iconType(icon)}</i>}
			<input
				type={type}
				name={name}
				onBlur={onBlur}
				onChange={onChange}
				onFocus={onFocus}
				placeholder={placeholder}
				value={value}
				style={inputStyle}
				disabled={disabled}
				readOnly={readOnly}
			/>
			{errors && <Errors>{errors}</Errors>}
		</div>
	</div>
);

Input.propTypes = {
	className: PropTypes.string.isRequired,
	containerStyle: PropTypes.objectOf(
		PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	),
	disabled: PropTypes.bool,
	errors: PropTypes.string,
	icon: PropTypes.node,
	inputStyle: PropTypes.objectOf(
		PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	),
	isFocused: PropTypes.string,
	label: PropTypes.string,
	name: PropTypes.string,
	onBlur: PropTypes.func,
	onChange: PropTypes.func,
	onFocus: PropTypes.func,
	placeholder: PropTypes.string,
	readOnly: PropTypes.bool,
	tooltip: PropTypes.string,
	type: PropTypes.string,
	value: PropTypes.string,
};

Input.defaultProps = {
	disabled: false,
	isFocused: "",
	readyOnly: false,
};

export default Input;
