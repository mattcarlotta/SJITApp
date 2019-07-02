import React, { Component } from "react";
import Helmet from "react-helmet";
import qs from "qs";
import PropTypes from "prop-types";
import { FaUnlockAlt } from "react-icons/fa";
import {
	Button,
	ButtonContainer,
	Center,
	Modal,
	Paragraph,
	Submitting,
	Title,
} from "components/Body";
import { Input } from "components/Forms";
import { Link } from "components/Navigation";
import { fieldValidator, parseFields, parseToken } from "utils";

class SignupForm extends Component {
	constructor(props) {
		super(props);

		const { search } = props.history.location;
		const token = search ? parseToken(search) : "";

		this.state = {
			fields: [
				{
					name: "token",
					type: "text",
					label: "Authorization Key",
					tooltip:
						"The authorization key is supplied via email upon staff approval.",
					icon: "key",
					value: token,
					errors: "",
					disabled: !!token,
				},
				{
					name: "email",
					type: "text",
					label: "Authorized Email",
					tooltip:
						"The email below needs to match the email that has been staff approved.",
					icon: "mail",
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
					name: "password",
					type: "password",
					label: "Password",
					icon: "lock",
					value: "",
					errors: "",
				},
			],
			isFocused: "",
			isSubmitting: false,
		};
	}

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
		const { validatedFields, errors } = fieldValidator(this.state.fields);

		this.setState({ fields: validatedFields, isSubmitting: !errors }, () => {
			const { fields: formFields } = this.state;
			const { hideServerMessage, serverMessage } = this.props;

			if (!errors) {
				const signupFields = parseFields(formFields);

				if (serverMessage) hideServerMessage();
				setTimeout(
					() => this.props.signupUser(signupFields, this.props.history),
					350,
				);
			}
		});
	};

	render = () => (
		<Modal maxWidth="750px">
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
		</Modal>
	);
}

SignupForm.propTypes = {
	hideServerMessage: PropTypes.func.isRequired,
	serverMessage: PropTypes.string,
};

export default SignupForm;
