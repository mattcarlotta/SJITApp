import React, { Component } from "react";
import PropTypes from "prop-types";
import { Modal, SubmitButton } from "components/Body";
import { FormTitle, Input } from "components/Forms";
import { fieldValidator, fieldUpdater, parseFields, parseToken } from "utils";

class NewPasswordForm extends Component {
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
			const { fields: formFields, token } = this.state;
			const {
				hideServerMessage,
				serverMessage,
				updateUserPassword,
			} = this.props;

			if (!errors) {
				const newPasswordFields = parseFields(formFields);

				if (serverMessage) hideServerMessage();
				setTimeout(
					() => updateUserPassword({ ...newPasswordFields, token }),
					350,
				);
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
				<SubmitButton isSubmitting={this.state.isSubmitting} />
			</form>
		</Modal>
	);
}

NewPasswordForm.propTypes = {
	hideServerMessage: PropTypes.func.isRequired,
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
};

export default NewPasswordForm;
