import React, { Component } from "react";
import PropTypes from "prop-types";
import { Card } from "antd";
import { connect } from "react-redux";
import { push } from "connected-react-router";
import { BackButton, FormContainer, SubmitButton } from "components/Body";
import { FieldGenerator } from "components/Forms";
import { createMember } from "actions/Members";
import { fieldValidator, fieldUpdater, parseFields } from "utils";
import fields from "./Fields";

const title = "New Member Form";

export class NewMemberForm extends Component {
	state = {
		fields,
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

			if (!errors) {
				const parsedFields = parseFields(formFields);

				this.props.createMember(parsedFields);
			}
		});
	};

	render = () => (
		<Card
			extra={
				<BackButton
					push={this.props.push}
					location="/employee/members/viewall"
				/>
			}
			title={title}
		>
			<FormContainer>
				<form onSubmit={this.handleSubmit}>
					<FieldGenerator
						fields={this.state.fields}
						onChange={this.handleChange}
					/>
					<SubmitButton
						title="Create Member"
						isSubmitting={this.state.isSubmitting}
					/>
				</form>
			</FormContainer>
		</Card>
	);
}

NewMemberForm.propTypes = {
	createMember: PropTypes.func.isRequired,
	push: PropTypes.func.isRequired,
	serverMessage: PropTypes.string,
};

const mapStateToProps = state => ({
	serverMessage: state.server.message,
});

const mapDispatchToProps = {
	createMember,
	push,
};

export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(NewMemberForm);
