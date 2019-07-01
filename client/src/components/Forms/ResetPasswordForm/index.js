import React, { Component, Fragment } from "react";
import Helmet from "react-helmet";
import PropTypes from "prop-types";
import {
	Button,
	ButtonContainer,
	Center,
	Paragraph,
	Submitting,
	Title,
} from "components/Body";
import { Input } from "components/Forms";
import { Link } from "components/Navigation";
import validator from "utils/fieldvalidator";

const fields = [
	{
		name: "email",
		type: "text",
		label: "Email",
		icon: "mail",
		value: "",
		errors: "",
	},
];

class ResetPasswordForm extends Component {
	state = {
		fields,
		isFocused: "",
		isSubmitting: false,
	};

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
		const { validatedFields, errors } = validator(this.state.fields);

		this.setState({ fields: validatedFields, isSubmitting: !errors }, () => {
			const { fields: formFields } = this.state;
			const { hideServerMessage, serverMessage } = this.props;

			if (!errors) {
				const resetPasswordFields = formFields.reduce(
					(acc, { name, value }) => {
						acc[name] = value;

						return acc;
					},
					{},
				);

				if (serverMessage) hideServerMessage();
				// TODO: Add reset password redux action
				// setTimeout(() => this.props.signinUser(signinFields), 350);
			}
		});
	};

	render = () => (
		<Fragment>
			<Helmet title="Reset Password" />
			<Center
				style={{ borderBottom: "1px solid #e8edf2", marginBottom: "25px" }}
			>
				<Title style={{ color: "#025f6d" }}>Reset Password</Title>
				<Paragraph style={{ color: "#9facbd" }}>
					Enter your email to request a password reset.
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
				<ButtonContainer style={{ marginTop: 5, minHeight: 63 }} primary>
					{this.state.isSubmitting ? (
						<Submitting />
					) : (
						<Button primary fontSize="22px" type="submit">
							Reset Password
						</Button>
					)}
				</ButtonContainer>
			</form>
			<Center style={{ marginTop: 20 }}>
				Don't have an account? &nbsp;
				<Link blue style={{ padding: 0, margin: 0 }} to="/employee/signup">
					Sign up
				</Link>
			</Center>
		</Fragment>
	);
}

ResetPasswordForm.propTypes = {
	hideServerMessage: PropTypes.func.isRequired,
	serverMessage: PropTypes.string,
};

export default ResetPasswordForm;
