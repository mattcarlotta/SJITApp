import isEmpty from "lodash/isEmpty";
import React, { Component } from "react";
import { Button } from "components/Body";
import { Input } from "components/Forms";
import { fields, validator } from "./fields";

class LoginForm extends Component {
	state = {
		fields,
		isFocused: "",
	};

	handleChange = ({ target: { name, value } }) => {
		this.setState(prevState => ({
			...prevState,
			fields: prevState.fields.map(field =>
				field.name === name ? { ...field, value, errors: "" } : field,
			),
		}));
	};

	handleClick = ({ target: { name } }) => {
		this.setState({ isFocused: name });
	};

	handleBlur = () => this.setState({ isFocused: "" });

	handleSubmit = e => {
		e.preventDefault();
		const { validatedFields, errors } = validator(this.state.fields);

		this.setState({ fields: validatedFields }, () => {
			if (!errors) {
				alert(JSON.stringify(this.state, null, 4));
			}
		});
	};

	render = () => (
		<form onSubmit={this.handleSubmit}>
			{this.state.fields.map(({ name, type, label, icon, value, errors }) => (
				<Input
					key={name}
					type={type}
					name={name}
					label={label}
					icon={icon}
					isFocused={this.state.isFocused}
					onClick={this.handleClick}
					onChange={this.handleChange}
					onBlur={this.handleBlur}
					value={value}
					errors={errors}
				/>
			))}
			<Button primary="true" type="submit">
				Submit
			</Button>
		</form>
	);
}

export default LoginForm;
