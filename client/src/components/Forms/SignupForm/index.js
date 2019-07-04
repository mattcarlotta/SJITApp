import React, { Component } from "react";
import Helmet from "react-helmet";
import PropTypes from "prop-types";
import { FaUnlockAlt } from "react-icons/fa";
import { Center, Modal, Paragraph, SubmitButton, Title } from "components/Body";
import { Input } from "components/Forms";
import { Link } from "components/Navigation";
import { fieldValidator, fieldUpdater, parseFields, parseToken } from "utils";

class SignupForm extends Component {
	constructor(props) {
		super(props);

		const token = parseToken(props.history.location.search);

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
					tooltip: "The email below needs to match a staff approved email.",
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

	static getDerivedStateFromProps = ({ serverMessage }) =>
		serverMessage ? { isSubmitting: false } : null;

	handleChange = ({ target: { name, value } }) => {
		this.setState(prevState => ({
			...prevState,
			fields: fieldUpdater(prevState.fields, name, value),
		}));
	};

	handleFocus = ({ target: { name } }) => this.setState({ isFocused: name });

	handleBlur = () => this.setState({ isFocused: "" });

	handleSubmit = e => {
		e.preventDefault();
		const { validatedFields, errors } = fieldValidator(this.state.fields);

		this.setState({ fields: validatedFields, isSubmitting: !errors }, () => {
			const { fields: formFields } = this.state;
			const {
				hideServerMessage,
				history,
				signupUser,
				serverMessage,
			} = this.props;

			if (!errors) {
				const signupFields = parseFields(formFields);

				if (serverMessage) hideServerMessage();
				setTimeout(() => signupUser(signupFields, history), 350);
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
				<SubmitButton isSubmitting={this.state.isSubmitting} title="Register" />
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
	history: PropTypes.shape({
		action: PropTypes.string,
		block: PropTypes.func,
		createHref: PropTypes.func,
		go: PropTypes.func,
		goBack: PropTypes.func,
		goForward: PropTypes.func,
		length: PropTypes.number,
		listen: PropTypes.func,
		location: PropTypes.shape({
			pathname: PropTypes.string,
			search: PropTypes.string,
			hash: PropTypes.string,
			state: PropTypes.oneOf(["object", "undefined"]),
		}),
		push: PropTypes.func,
		replace: PropTypes.func,
	}),
	serverMessage: PropTypes.string,
};

export default SignupForm;
