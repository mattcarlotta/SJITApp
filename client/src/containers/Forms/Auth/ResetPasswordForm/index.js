import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Center, Modal, SubmitButton } from "components/Body";
import { FormTitle, Input } from "components/Forms";
import { Link } from "components/Navigation";
import { fieldValidator, fieldUpdater, parseFields } from "utils";
import { resetPassword } from "actions/Auth";
import { hideServerMessage } from "actions/Messages";

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
			const { fields: formFields } = this.state;
			const { hideServerMessage, resetPassword, serverMessage } = this.props;

			if (!errors) {
				const resetPasswordFields = parseFields(formFields);

				if (serverMessage) hideServerMessage();
				setTimeout(() => resetPassword(resetPasswordFields), 350);
			}
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
				{this.state.fields.map(props => (
					<Input {...props} key={props.name} onChange={this.handleChange} />
				))}
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
				Don't have an account? &nbsp;
				<Link blue style={{ padding: 0, margin: 0 }} to="/employee/signup">
					Sign up
				</Link>
			</Center>
		</Modal>
	);
}

ResetPasswordForm.propTypes = {
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
	resetPassword: PropTypes.func.isRequired,
	serverMessage: PropTypes.string,
};

const mapStateToProps = state => ({
	serverMessage: state.server.message,
});

const mapDispatchToProps = {
	hideServerMessage,
	resetPassword,
};

export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(ResetPasswordForm);
