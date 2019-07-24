import React, { Component } from "react";
import PropTypes from "prop-types";
import { FaUnlockAlt } from "react-icons/fa";
import { Center, Modal, SubmitButton } from "components/Body";
import { FormTitle, Input } from "components/Forms";
import { Link } from "components/Navigation";
import { fieldValidator, fieldUpdater, parseFields } from "utils";

class LoginForm extends Component {
	state = {
		fields: [
			{
				name: "email",
				type: "text",
				label: "Email",
				icon: "mail",
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
		isFocused: "",
		isSubmitting: false,
	};

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
			const { hideServerMessage, serverMessage, signinUser } = this.props;

			if (!errors) {
				const signinFields = parseFields(formFields);

				if (serverMessage) hideServerMessage();
				setTimeout(() => signinUser(signinFields), 350);
			}
		});
	};

	render = () => (
		<Modal>
			<FormTitle
				header="Log In"
				title="Welcome!"
				description="Sign into your account below."
			/>
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
				<SubmitButton isSubmitting={this.state.isSubmitting} />
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
	signinUser: PropTypes.func,
};

export default LoginForm;