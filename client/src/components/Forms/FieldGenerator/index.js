import React from "react";
import PropTypes from "prop-types";
import isEmpty from "lodash/isEmpty";
import { Form, DatePicker, TimePicker, Radio, Input as AntInput } from "antd";
import { FaCalendarPlus, FaClock } from "react-icons/fa";
import { Icon, Label, Notes } from "components/Body";
import { Errors, Input, Select } from "components/Forms";

const RangePicker = DatePicker.RangePicker;
const TextArea = AntInput.TextArea;
const RadioGroup = Radio.Group;

const removeIconStyle = {
	cursor: "pointer",
	top: "10%",
	right: "15px",
};

const radioStyle = {
	display: "block",
	width: "100%",
	height: "30px",
	lineHeight: "30px",
	fontSize: "20px",
	margin: "10px 0",
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
			case "date":
				return (
					<Form.Item key={props.name} style={{ height: 105 }}>
						<Label {...props} />
						<DatePicker
							{...props}
							className={props.errors ? "has-error date-picker" : "date-picker"}
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
			case "radiogroup":
				return (
					<Form.Item
						key={props.name}
						style={{ height: 220, marginBottom: props.notes ? 60 : 30 }}
					>
						<Label style={{ marginBottom: 25 }} {...props} />
						{props.notes && <Notes {...props} />}
						<RadioGroup
							{...props}
							style={{ textAlign: "left" }}
							onChange={onChange}
						>
							{!isEmpty(props.selectOptions) &&
								props.selectOptions.map(value => (
									<Radio style={radioStyle} key={value} value={value}>
										{value}
									</Radio>
								))}
						</RadioGroup>
						{props.errors && (
							<Errors style={{ textAlign: "center" }}>{props.errors}</Errors>
						)}
					</Form.Item>
				);
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
			case "textarea":
				return (
					<Form.Item
						key={props.name}
						style={{ minHeight: 105, marginBottom: props.label ? 20 : 40 }}
					>
						{props.label && <Label {...props} />}
						<TextArea
							{...props}
							style={{ width: props.width || "100%" }}
							onChange={onChange}
							rows={props.rows || 4}
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
								className="remove-time-slot"
								style={removeIconStyle}
								color="rgba(255, 0, 0, 0.65)"
								onHoverColor="rgba(204, 0, 0, 0.65)"
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
			label: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
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
