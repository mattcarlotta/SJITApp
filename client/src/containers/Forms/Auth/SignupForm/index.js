import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { FaUnlockAlt } from "react-icons/fa";
import { Center, Modal, SubmitButton } from "components/Body";
import { FieldGenerator, FormTitle } from "components/Forms";
import { Link } from "components/Navigation";
import { fieldValidator, fieldUpdater, parseFields, parseToken } from "utils";
import { signupUser } from "actions/Auth";
import { hideServerMessage } from "actions/Messages";

export class SignupForm extends Component {
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
					value: token || "",
					errors: "",
					disabled: !!token,
					required: true,
				},
				{
					name: "email",
					type: "email",
					label: "Authorized Email",
					tooltip: "The email below needs to match a staff approved email.",
					icon: "mail",
					value: "",
					errors: "",
					required: true,
				},
				{
					name: "firstName",
					type: "text",
					label: "First Name",
					icon: "user",
					value: "",
					errors: "",
					required: true,
				},
				{
					name: "lastName",
					type: "text",
					label: "Last Name",
					icon: "user",
					value: "",
					errors: "",
					required: true,
				},
				{
					name: "password",
					type: "password",
					label: "Password",
					icon: "lock",
					value: "",
					errors: "",
					required: true,
				},
			],
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

	handleSubmit = e => {
		e.preventDefault();
		const { validatedFields, errors } = fieldValidator(this.state.fields);

		this.setState({ fields: validatedFields, isSubmitting: !errors }, () => {
			const { fields: formFields } = this.state;
			const { hideServerMessage, signupUser, serverMessage } = this.props;

			if (!errors) {
				const parsedFields = parseFields(formFields);

				if (serverMessage) hideServerMessage();
				setTimeout(() => signupUser(parsedFields), 350);
			}
		});
	};

	render = () => (
		<Modal maxWidth="750px">
			<FormTitle
				header="Sign Up"
				title="Sign Up"
				description="Fill out all the fields below to register."
			/>
			<form onSubmit={this.handleSubmit}>
				<FieldGenerator
					fields={this.state.fields}
					onChange={this.handleChange}
				/>
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
	signupUser: PropTypes.func,
};

/* istanbul ignore next */
const mapStateToProps = state => ({
	serverMessage: state.server.message,
});

/* istanbul ignore next */
const mapDispatchToProps = {
	hideServerMessage,
	signupUser,
};

export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(SignupForm);
