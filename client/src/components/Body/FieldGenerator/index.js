import React from "react";
import PropTypes from "prop-types";
import { Form, DatePicker, TimePicker } from "antd";
import { FaCalendarPlus, FaClock } from "react-icons/fa";
import { Icon, Label } from "components/Body";
import { Errors, Input, Select } from "components/Forms";

const RangePicker = DatePicker.RangePicker;

const removeIconStyle = {
	cursor: "pointer",
	top: "10%",
	right: "15px",
};

const FieldGenerator = ({ fields, onChange }) =>
	fields.map(props => {
		switch (props.type) {
			case "text":
			case "email":
			case "password":
				return <Input {...props} key={props.name} onChange={onChange} />;
			case "select":
				return <Select {...props} key={props.name} onChange={onChange} />;
			case "range":
				return (
					<Form.Item key={props.name} style={{ height: 105 }}>
						<Label {...props} />
						<RangePicker
							{...props}
							className={props.errors ? "has-error" : ""}
							suffixIcon={
								<FaCalendarPlus
									style={{
										color: props.errors ? "#d14023" : "rgba(0, 0, 0, 0.25)",
									}}
								/>
							}
							onChange={value =>
								onChange({ target: { name: props.name, value } })
							}
						/>
						{props.errors && <Errors>{props.errors}</Errors>}
					</Form.Item>
				);
			case "time":
				return (
					<Form.Item
						key={props.name}
						style={{ height: props.height ? props.height : 105 }}
					>
						{props.label && <Label {...props} />}
						{props.onFieldRemove && (
							<Icon
								style={removeIconStyle}
								color="rgba(255, 0, 0, 0.65)"
								onClick={() => props.onFieldRemove(props.name)}
								type="remove"
							/>
						)}
						<TimePicker
							{...props}
							use12Hours
							minuteStep={15}
							format="h:mm a"
							className={props.errors ? "has-error" : ""}
							suffixIcon={
								<FaClock
									style={{
										color: props.errors ? "#d14023" : "rgba(0, 0, 0, 0.25)",
									}}
								/>
							}
							onChange={value =>
								onChange({ target: { name: props.name, value } })
							}
						/>
						{props.errors && <Errors>{props.errors}</Errors>}
					</Form.Item>
				);
		}
	});

FieldGenerator.propTypes = {
	fields: PropTypes.arrayOf(
		PropTypes.shape({
			name: PropTypes.string.isRequired,
			type: PropTypes.string.isRequired,
			label: PropTypes.string,
			placeholder: PropTypes.string,
			props: PropTypes.any,
			icon: PropTypes.string,
			value: PropTypes.any,
			errors: PropTypes.string,
			required: PropTypes.bool,
			disabled: PropTypes.bool,
			readOnly: PropTypes.bool,
			tooltip: PropTypes.string,
			selectOptions: PropTypes.arrayOf(PropTypes.string),
		}),
	),
};

FieldGenerator.defaultProps = {
	fields: [],
};

export default FieldGenerator;
