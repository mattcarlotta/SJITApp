import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { FaUnlockAlt } from "react-icons/fa";
import { Center, Modal, SubmitButton } from "components/Body";
import { FieldGenerator, FormTitle } from "components/Forms";
import { Link } from "components/Navigation";
import { fieldValidator, fieldUpdater, parseFields } from "utils";
import { signinUser } from "actions/Auth";

export class LoginForm extends Component {
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

	handleSubmit = e => {
		e.preventDefault();
		const { validatedFields, errors } = fieldValidator(this.state.fields);

		this.setState({ fields: validatedFields, isSubmitting: !errors }, () => {
			if (!errors) this.props.signinUser(parseFields(validatedFields));
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
				<SubmitButton isSubmitting={this.state.isSubmitting} title="Log In" />
			</form>
			<Center style={{ marginTop: 20 }}>
				<span>Don&#39;t have an account?</span> &nbsp;
				<Link blue style={{ padding: 0, margin: 0 }} to="/employee/signup">
					Sign up
				</Link>
			</Center>
		</Modal>
	);
}

LoginForm.propTypes = {
	serverMessage: PropTypes.string,
	signinUser: PropTypes.func,
};

/* istanbul ignore next */
const mapStateTopProps = state => ({
	serverMessage: state.server.message,
});

/* istanbul ignore next */
const mapDispatchToProps = {
	signinUser,
};

export default connect(
	mapStateTopProps,
	mapDispatchToProps,
)(LoginForm);
