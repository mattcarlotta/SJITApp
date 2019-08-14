import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Modal, SubmitButton } from "components/Body";
import { FieldGenerator, FormTitle } from "components/Forms";
import { fieldValidator, fieldUpdater, parseFields, parseToken } from "utils";
import { updateUserPassword } from "actions/Auth";

export class NewPasswordForm extends Component {
	constructor(props) {
		super(props);

		const token = parseToken(props.history.location.search);
		if (!token) props.push("/employee/login");

		this.state = {
			fields: [
				{
					name: "password",
					type: "password",
					label: "New Password",
					icon: "lock",
					value: "",
					errors: "",
					required: true,
				},
			],
			token,
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
			const { fields: formFields, token } = this.state;
			const { updateUserPassword } = this.props;

			if (!errors) {
				const parsedFields = parseFields(formFields);

				updateUserPassword({ ...parsedFields, token });
			}
		});
	};

	render = () => (
		<Modal>
			<FormTitle
				header="Update Password"
				title="Update Password"
				description="	Enter a new password to update your current password."
			/>
			<form onSubmit={this.handleSubmit}>
				<FieldGenerator
					fields={this.state.fields}
					onChange={this.handleChange}
				/>
				<SubmitButton
					isSubmitting={this.state.isSubmitting}
					title="Update Password"
				/>
			</form>
		</Modal>
	);
}

NewPasswordForm.propTypes = {
	history: PropTypes.shape({
		location: PropTypes.shape({
			pathname: PropTypes.string,
			search: PropTypes.string,
			hash: PropTypes.string,
			state: PropTypes.oneOf(["object", "undefined"]),
		}),
	}),
	push: PropTypes.func,
	serverMessage: PropTypes.string,
	updateUserPassword: PropTypes.func.isRequired,
};

/* istanbul ignore next */
const mapStateToProps = state => ({
	serverMessage: state.server.message,
});

/* istanbul ignore next */
const mapDispatchToProps = {
	updateUserPassword,
};

export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(NewPasswordForm);
