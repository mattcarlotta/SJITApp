import React from "react";
import PropTypes from "prop-types";
import { Form, DatePicker } from "antd";
import { FaCalendarPlus } from "react-icons/fa";
import { Label } from "components/Body";
import { Errors, Input, Select } from "components/Forms";

const RangePicker = DatePicker.RangePicker;

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
							suffixIcon={<FaCalendarPlus />}
							onChange={value => onChange({ name: props.name, value })}
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
