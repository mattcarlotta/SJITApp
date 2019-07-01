import React, { Component, Fragment } from "react";
import Helmet from "react-helmet";
import PropTypes from "prop-types";
import {
	Button,
	ButtonContainer,
	Center,
	Paragraph,
	Submitting,
	Title,
} from "components/Body";
import { Input } from "components/Forms";
import { Link } from "components/Navigation";
import { FaUnlockAlt } from "react-icons/fa";
import validator from "utils/fieldvalidator";

const fields = [
	{
		name: "token",
		type: "text",
		label: "Authorization Key",
		tooltip:
			"The authorization key is supplied by your supervisor to allow you to register.",
		icon: "key",
		value: "",
		errors: "",
	},
	{
		name: "firstName",
		type: "text",
		label: "First Name",
		icon: "user",
		value: "",
		errors: "",
	},
	{
		name: "lastName",
		type: "text",
		label: "Last Name",
		icon: "user",
		value: "",
		errors: "",
	},
	{
		name: "email",
		type: "text",
		label: "Email",
		icon: "mail",
		value: "",
		errors: "",
	},
	{
		name: "password",
		type: "password",
		label: "Password",
		icon: "lock",
		value: "",
		errors: "",
	},
];

class SignupForm extends Component {
	state = {
		fields,
		isFocused: "",
		isSubmitting: false,
	};

	static getDerivedStateFromProps = props =>
		props.serverMessage ? { isSubmitting: false } : null;

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
			const { fields: formFields } = this.state;
			const { hideServerMessage, serverMessage } = this.props;

			if (!errors) {
				const signupFields = formFields.reduce((acc, { name, value }) => {
					acc[name] = value;

					return acc;
				}, {});

				if (serverMessage) hideServerMessage();
				// TODO: Add signup user action
				// setTimeout(() => this.props.signinUser(signinFields), 350);
			}
		});
	};

	render = () => (
		<Fragment>
			<Helmet title="Sign Up" />
			<Center
				style={{ borderBottom: "1px solid #e8edf2", marginBottom: "25px" }}
			>
				<Title style={{ color: "#025f6d" }}>Sign Up</Title>
				<Paragraph style={{ color: "#9facbd" }}>
					Fill out all the fields below to register.
				</Paragraph>
			</Center>
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
				<Link
					blue
					style={{ padding: 0, margin: 0, fontSize: 16 }}
					to="/employee/resetpassword"
				>
					<FaUnlockAlt />
					&nbsp; Forgot your password?
				</Link>
				<ButtonContainer style={{ marginTop: 5, minHeight: 63 }} primary>
					{this.state.isSubmitting ? (
						<Submitting />
					) : (
						<Button primary fontSize="22px" type="submit">
							Register
						</Button>
					)}
				</ButtonContainer>
			</form>
			<Center style={{ marginTop: 20 }}>
				Already have an account? &nbsp;
				<Link blue style={{ padding: 0, margin: 0 }} to="/employee/login">
					Log in
				</Link>
			</Center>
		</Fragment>
	);
}

SignupForm.propTypes = {
	hideServerMessage: PropTypes.func.isRequired,
	serverMessage: PropTypes.string,
};

export default SignupForm;
