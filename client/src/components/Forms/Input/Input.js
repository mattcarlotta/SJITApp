import React from "react";
import PropTypes from "prop-types";
import { Label } from "components/Body";
import { FaUserCircle, FaUnlockAlt, FaBug } from "react-icons/fa";

const iconType = type => {
	switch (type) {
		case "user":
			return <FaUserCircle />;
		case "unlock":
			return <FaUnlockAlt />;
		default:
			return <FaBug />;
	}
};

const Input = ({
	className,
	containerStyle,
	errors,
	icon,
	inputStyle,
	isFocused,
	label,
	name,
	onBlur,
	onChange,
	onFocus,
	placeholder,
	type,
	value,
}) => (
	<div className={className} style={containerStyle}>
		<div
			className={`${isFocused === name ? "focused" : ""} ${
				errors ? "error" : ""
			}`}
		>
			{label && <Label htmlFor={name}>{label}</Label>}
			{icon && iconType(icon)}
			<input
				type={type || "text"}
				name={name || ""}
				onBlur={onBlur}
				onChange={onChange}
				onFocus={onFocus}
				placeholder={placeholder}
				value={value}
				style={inputStyle}
			/>
			{errors && <p>{errors}</p>}
		</div>
	</div>
);

Input.propTypes = {
	className: PropTypes.string.isRequired,
	containerStyle: PropTypes.objectOf(PropTypes.string),
	icon: PropTypes.node,
	inputStyle: PropTypes.objectOf(PropTypes.string),
	isFocused: PropTypes.string,
	label: PropTypes.string,
	name: PropTypes.string,
	onBlur: PropTypes.func,
	onChange: PropTypes.func.isRequired,
	onFocus: PropTypes.func,
	placeholder: PropTypes.string,
	type: PropTypes.string,
	value: PropTypes.string,
};

export default Input;
