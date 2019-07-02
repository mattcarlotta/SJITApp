import React, { Component, Fragment } from "react";
import Helmet from "react-helmet";
import PropTypes from "prop-types";
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
import { fieldValidator, parseFields, parseToken } from "utils";

const fields = [
	{
		name: "password",
		type: "password",
		label: "New Password",
		icon: "lock",
		value: "",
		errors: "",
	},
];

class NewPasswordForm extends Component {
	constructor(props) {
		super(props);

		const { search } = props.history.location;
		const token = search ? parseToken(search) : "";

		if (!token) props.history.push("/employee/login");

		this.state = {
			fields,
			token,
			isFocused: "",
			isSubmitting: false,
		};
	}

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
			const { fields: formFields, token } = this.state;
			const { hideServerMessage, serverMessage } = this.props;

			if (!errors) {
				const newPasswordFields = parseFields(formFields);

				if (serverMessage) hideServerMessage();
				setTimeout(
					() =>
						this.props.updateUserPassword(
							{ ...newPasswordFields, token },
							this.props.history,
						),
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
				<ButtonContainer style={{ marginTop: 5, minHeight: 63 }} primary>
					{this.state.isSubmitting ? (
						<Submitting />
					) : (
						<Button primary fontSize="22px" type="submit">
							Update Password
						</Button>
					)}
				</ButtonContainer>
			</form>
		</Modal>
	);
}

NewPasswordForm.propTypes = {
	hideServerMessage: PropTypes.func.isRequired,
	serverMessage: PropTypes.string,
};

export default NewPasswordForm;
