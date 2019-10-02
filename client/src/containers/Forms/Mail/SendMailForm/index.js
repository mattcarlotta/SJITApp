import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import isEmpty from "lodash/isEmpty";
import { Card } from "antd";
import { connect } from "react-redux";
import { push } from "connected-react-router";
import {
	Button,
	BackButton,
	EmailPreview,
	FormContainer,
	SubmitButton,
} from "components/Body";
import { FieldGenerator, FormTitle, LoadingForm } from "components/Forms";
import { fieldUpdater, fieldValidator, parseFields } from "utils";
import { fetchMemberNames } from "actions/Members";
import { createMail } from "actions/Mail";
import updateFormFields from "./UpdateFormFields";
import fields from "./Fields";

const title = "Send Mail";

export class SendMailForm extends Component {
	state = {
		fields,
		errors: "",
		isLoading: true,
		isSubmitting: false,
	};

	static getDerivedStateFromProps = ({ memberNames, serverMessage }, state) => {
		if (state.isLoading && !isEmpty(memberNames)) {
			return {
				fields: state.fields.map(field => updateFormFields(field, memberNames)),
				isLoading: false,
			};
		}

		if (serverMessage) return { isSubmitting: false };

		return null;
	};

	componentDidMount = () => {
		this.props.fetchMemberNames();
	};

	handleChange = ({ target: { name, value } }) => {
		this.setState(prevState => ({
			...prevState,
			fields: fieldUpdater(prevState.fields, name, value),
		}));
	};

	handlePreview = () =>
		this.setState(prevState => ({ showPreview: !prevState.showPreview }));

	handleSubmit = e => {
		e.preventDefault();
		const { validatedFields, errors } = fieldValidator(this.state.fields);

		this.setState({ fields: validatedFields, isSubmitting: !errors }, () => {
			if (!errors) this.props.createMail(parseFields(validatedFields));
		});
	};

	render = () => (
		<Card
			extra={
				<BackButton push={this.props.push} location="/employee/mail/viewall" />
			}
			title={title}
		>
			<FormContainer>
				<FormTitle
					header={title}
					title={title}
					description="Please fill out all of the form fields below."
				/>
				<form onSubmit={this.handleSubmit}>
					{this.state.isLoading ? (
						<LoadingForm rows={5} />
					) : (
						<Fragment>
							<FieldGenerator
								fields={this.state.fields}
								onChange={this.handleChange}
							/>
							<Button onClick={this.handlePreview}>Preview Email</Button>
							<SubmitButton
								title="Send"
								isSubmitting={this.state.isSubmitting}
							/>
							{this.state.showPreview && (
								<EmailPreview
									fields={parseFields(this.state.fields)}
									handleCloseModal={this.handlePreview}
								/>
							)}
						</Fragment>
					)}
				</form>
			</FormContainer>
		</Card>
	);
}

SendMailForm.propTypes = {
	createMail: PropTypes.func.isRequired,
	fetchMemberNames: PropTypes.func.isRequired,
	push: PropTypes.func.isRequired,
	memberNames: PropTypes.arrayOf(
		PropTypes.shape({
			_id: PropTypes.string,
			name: PropTypes.string,
			email: PropTypes.string,
		}),
	),
	serverMessage: PropTypes.string,
};

const mapStateToProps = state => ({
	memberNames: state.members.names,
	serverMessage: state.server.message,
});

const mapDispatchToProps = {
	createMail,
	fetchMemberNames,
	push,
};

export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(SendMailForm);
