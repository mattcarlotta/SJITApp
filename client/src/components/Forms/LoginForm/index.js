import React, { Component, Fragment } from "react";
import Helmet from "react-helmet";
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
import { fieldValidator, parseFields } from "utils";

const fields = [
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

class LoginForm extends Component {
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
		const { validatedFields, errors } = fieldValidator(this.state.fields);

		this.setState({ fields: validatedFields, isSubmitting: !errors }, () => {
			const { fields: formFields } = this.state;
			const { hideServerMessage, serverMessage } = this.props;

			if (!errors) {
				const signinFields = parseFields(formFields);

				if (serverMessage) hideServerMessage();
				setTimeout(() => this.props.signinUser(signinFields), 350);
			}
		});
	};

	render = () => (
		<Modal>
			<Helmet title="Log In" />
			<Center
				style={{ borderBottom: "1px solid #e8edf2", marginBottom: "25px" }}
			>
				<Title style={{ color: "#025f6d" }}>Welcome!</Title>
				<Paragraph style={{ color: "#9facbd" }}>
					Sign into your account below.
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
							Submit
						</Button>
					)}
				</ButtonContainer>
			</form>
			<Center style={{ marginTop: 20 }}>
				Don't have an account? &nbsp;
				<Link blue style={{ padding: 0, margin: 0 }} to="/employee/signup">
					Sign up
				</Link>
			</Center>
		</Modal>
	);
}

LoginForm.propTypes = {
	hideServerMessage: PropTypes.func.isRequired,
	serverMessage: PropTypes.string,
};

export default LoginForm;
