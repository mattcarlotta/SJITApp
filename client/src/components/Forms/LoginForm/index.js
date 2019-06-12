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
				const signinFields = this.state.fields.reduce(
					(acc, { name, value }) => {
						acc[name] = value;

						return acc;
					},
					{},
				);
				this.props.signinUser(signinFields);
			}
		});
	};

	render = () => (
		<form onSubmit={this.handleSubmit}>
			{this.state.fields.map(props => (
				<Input
					{...props}
					key={props.name}
					isFocused={this.state.isFocused}
					onChange={this.handleChange}
					onBlur={this.handleBlur}
					onFocus={this.handleFocus}
				/>
			))}
			<ButtonContainer style={{ marginTop: 5 }} primary="true">
				{this.state.isSubmitting ? (
					<Submitting />
				) : (
					<Button primary="true" type="submit">
						Submit
					</Button>
				)}
			</ButtonContainer>
		</form>
	);
}

export default LoginForm;
