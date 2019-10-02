import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Center, Modal, SubmitButton } from "components/Body";
import { FieldGenerator, FormTitle } from "components/Forms";
import { Link } from "components/Navigation";
import { fieldValidator, fieldUpdater, parseFields } from "utils";
import { resetPassword } from "actions/Auth";

export class ResetPasswordForm extends Component {
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
			if (!errors) this.props.resetPassword(parseFields(validatedFields));
		});
	};

	render = () => (
		<Modal>
			<FormTitle
				header="Reset Password"
				title="Reset Password"
				description="Enter your email to request a password reset."
			/>
			<form onSubmit={this.handleSubmit}>
				<FieldGenerator
					fields={this.state.fields}
					onChange={this.handleChange}
				/>
				<span>
					<p style={{ margin: 0, padding: 0, fontSize: 16, display: "inline" }}>
						Already have an account?
					</p>
					&nbsp;
					<Link
						blue
						style={{ padding: 0, margin: 0, fontSize: 16 }}
						to="/employee/login"
					>
						Log in
					</Link>
				</span>
				<SubmitButton
					isSubmitting={this.state.isSubmitting}
					title="Reset Password"
				/>
			</form>
			<Center style={{ marginTop: 20 }}>
				{`Don't have an account?`} &nbsp;
				<Link blue style={{ padding: 0, margin: 0 }} to="/employee/signup">
					Sign up
				</Link>
			</Center>
		</Modal>
	);
}

ResetPasswordForm.propTypes = {
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
	resetPassword: PropTypes.func.isRequired,
	serverMessage: PropTypes.string,
};

/* istanbul ignore next */
const mapStateToProps = state => ({
	serverMessage: state.server.message,
});

/* istanbul ignore next */
const mapDispatchToProps = {
	resetPassword,
};

export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(ResetPasswordForm);
