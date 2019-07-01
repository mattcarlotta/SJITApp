import React from "react";
import PropTypes from "prop-types";
import { Tooltip } from "antd";
import { Label } from "components/Body";
import { Errors } from "components/Forms";
import { FaUserCircle, FaLock, FaBug, FaEnvelope, FaKey } from "react-icons/fa";
import { GoQuestion } from "react-icons/go";

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
	tooltip,
	value,
}) => (
	<div className={className} style={containerStyle}>
		<div
			className={`${isFocused === name ? "focused" : ""} ${
				errors ? "error" : ""
			}`}
		>
			{label && (
				<Label htmlFor={name}>
					{label}
					{tooltip && (
						<span className="tooltip">
							<Tooltip
								placement="top"
								title={
									<p style={{ textAlign: "center", margin: 0, padding: 0 }}>
										{tooltip}
									</p>
								}
							>
								<GoQuestion />
							</Tooltip>
						</span>
					)}
				</Label>
			)}
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
			{errors && <Errors>{errors}</Errors>}
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
	tooltip: PropTypes.string,
	type: PropTypes.string,
	value: PropTypes.string,
};

export default Input;
