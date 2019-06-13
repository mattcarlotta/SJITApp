import React, { Fragment, Component } from "react";
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
import { fields, validator } from "./fields";

class LoginForm extends Component {
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
			const { fields: loginFields } = this.state;
			const { hideServerMessage, serverMessage } = this.props;

			if (!errors) {
				const signinFields = loginFields.reduce((acc, { name, value }) => {
					acc[name] = value;

					return acc;
				}, {});

				if (serverMessage) hideServerMessage();
				setTimeout(() => this.props.signinUser(signinFields), 350);
			}
		});
	};

	render = () => (
		<Fragment>
			<Helmet title="Employee Log In" />
			<Center
				style={{ borderBottom: "1px solid #e8edf2", marginBottom: "25px" }}
			>
				<Title style={{ color: "#025f6d" }}>Welcome!</Title>
				<Paragraph style={{ color: "#9facbd" }}>
					Sign into your account below.
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
				<ButtonContainer style={{ marginTop: 5 }} primary="true">
					{this.state.isSubmitting ? (
						<Submitting />
					) : (
						<Button primary="true" type="submit">
							Submit
						</Button>
					)}
				</ButtonContainer>
			</form>
		</Fragment>
	);
}

LoginForm.propTypes = {
	hideServerMessage: PropTypes.func.isRequired,
	serverMessage: PropTypes.string,
};

export default LoginForm;
