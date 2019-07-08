import React, { Component, Fragment } from "react";
import Helmet from "react-helmet";
import PropTypes from "prop-types";
import { Center, Modal, Paragraph, SubmitButton, Title } from "components/Body";
import { Input } from "components/Forms";
import { fieldValidator, fieldUpdater, parseFields, parseToken } from "utils";

class NewPasswordForm extends Component {
	constructor(props) {
		super(props);

		const token = parseToken(props.history.location.search);
		if (!token) props.history.push("/employee/login");

		this.state = {
			fields: [
				{
					name: "password",
					type: "password",
					label: "New Password",
					icon: "lock",
					value: "",
					errors: "",
					required: true
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
				history,
				serverMessage,
				updateUserPassword,
			} = this.props;

			if (!errors) {
				const newPasswordFields = parseFields(formFields);

				if (serverMessage) hideServerMessage();
				setTimeout(
					() => updateUserPassword({ ...newPasswordFields, token }, history),
					350,
				);
			}
		});
	};

	render = () => (
		<Modal>
			<Helmet title="Update Password" />
			<Center
				style={{ borderBottom: "1px solid #e8edf2", marginBottom: "25px" }}
			>
				<Title style={{ color: "#025f6d" }}>Update Password</Title>
				<Paragraph style={{ color: "#9facbd" }}>
					Enter a new password to update your current password.
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
				<SubmitButton isSubmitting={this.state.isSubmitting} title="Submit" />
			</form>
		</Modal>
	);
}

NewPasswordForm.propTypes = {
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

export default NewPasswordForm;
