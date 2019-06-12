import isEmpty from "lodash/isEmpty";
import React, { Component } from "react";
import { Button, ButtonContainer, Submitting } from "components/Body";
import { Input } from "components/Forms";
import { fields, validator } from "./fields";

class LoginForm extends Component {
	state = {
		fields,
		isFocused: "",
		isSubmitting: false,
	};

	handleChange = ({ target: { name, value } }) => {
		this.setState(prevState => ({
			...prevState,
			fields: prevState.fields.map(field =>
				field.name === name ? { ...field, value, errors: "" } : field,
			),
		}));
	};

	handleFocus = ({ target: { name } }) => this.setState({ isFocused: name });

	handleBlur = () => this.setState({ isFocused: "" });

	handleSubmit = e => {
		e.preventDefault();
		const { validatedFields, errors } = validator(this.state.fields);

		this.setState({ fields: validatedFields, isSubmitting: !errors }, () => {
			if (!errors) {
				// alert(JSON.stringify(this.state, null, 4));
			}
		});
	};

	render = () => {
		const { isFocused, isSubmitting } = this.state;

		return (
			<form onSubmit={this.handleSubmit}>
				{this.state.fields.map(({ name, type, label, icon, value, errors }) => (
					<Input
						key={name}
						type={type}
						name={name}
						label={label}
						icon={icon}
						isFocused={isFocused}
						onChange={this.handleChange}
						onBlur={this.handleBlur}
						onFocus={this.handleFocus}
						value={value}
						errors={errors}
					/>
				))}
				<ButtonContainer style={{ background: "#025f6d" }}>
					{isSubmitting ? (
						<Submitting />
					) : (
						<Button primary="true" type="submit">
							Submit
						</Button>
					)}
				</ButtonContainer>
			</form>
		);
	};
}

export default LoginForm;
