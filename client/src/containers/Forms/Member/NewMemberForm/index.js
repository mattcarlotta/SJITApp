import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { Card } from "antd";
import { connect } from "react-redux";
import { push } from "connected-react-router";
import { FaUserPlus } from "react-icons/fa";
import { BackButton, FormContainer, SubmitButton } from "components/Body";
import { FieldGenerator, FormTitle } from "components/Forms";
import { createMember } from "actions/Members";
import { fieldValidator, fieldUpdater, parseFields } from "utils";
import fields from "./Fields";

const title = "Create Member";
const iconStyle = {
	verticalAlign: "middle",
	marginRight: 10,
	fontSize: 20,
};

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
			if (!errors) this.props.createMember(parseFields(validatedFields));
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
			title={
				<Fragment>
					<FaUserPlus style={iconStyle} />
					<span css="vertical-align: middle;">{title}</span>
				</Fragment>
			}
		>
			<FormContainer>
				<FormTitle
					header={title}
					title={title}
					description="Please fill out all of the form fields below."
				/>
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
