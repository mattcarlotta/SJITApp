import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import isEmpty from "lodash/isEmpty";
import { Card } from "antd";
import { connect } from "react-redux";
import { push } from "connected-react-router";
import { FaEdit } from "react-icons/fa";
import { BackButton, FormContainer, SubmitButton } from "components/Body";
import { FieldGenerator, FormTitle, LoadingForm } from "components/Forms";
import { fetchForm, updateForm } from "actions/Forms";
import { fieldValidator, fieldUpdater, parseFields } from "utils";
import fields from "./Fields";
import updateFormFields from "./UpdateFormFields";

const title = "Edit Form";
const iconStyle = {
	verticalAlign: "middle",
	marginRight: 10,
	fontSize: 22,
};

export class EditForm extends Component {
	state = {
		fields,
		isLoading: true,
		isSubmitting: false,
	};

	static getDerivedStateFromProps = ({ editForm, serverMessage }, state) => {
		if (state.isLoading && !isEmpty(editForm)) {
			return {
				fields: state.fields.map(field => updateFormFields(field, editForm)),
				isLoading: false,
			};
		}

		if (serverMessage) return { isSubmitting: false };

		return null;
	};

	componentDidMount = () => {
		const { id } = this.props.match.params;
		this.props.fetchForm(id);
	};

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
			const {
				editForm: { _id },
				updateForm,
			} = this.props;

			if (!errors) {
				const parsedFields = parseFields(validatedFields);
				updateForm({ _id, ...parsedFields });
			}
		});
	};

	render = () => (
		<Card
			extra={
				<BackButton push={this.props.push} location="/employee/forms/viewall" />
			}
			title={
				<Fragment>
					<FaEdit style={iconStyle} />
					<span css="vertical-align: middle;">{title}</span>
				</Fragment>
			}
		>
			<FormContainer>
				<FormTitle
					header={title}
					title={title}
					description="Edit or change any of the current form fields below."
				/>
				<form onSubmit={this.handleSubmit}>
					{this.state.isLoading ? (
						<LoadingForm rows={4} />
					) : (
						<Fragment>
							<FieldGenerator
								fields={this.state.fields}
								onChange={this.handleChange}
							/>
							<SubmitButton
								disabled={isEmpty(this.props.editForm)}
								title="Update Form"
								isSubmitting={this.state.isSubmitting}
							/>
						</Fragment>
					)}
				</form>
			</FormContainer>
		</Card>
	);
}

EditForm.propTypes = {
	editForm: PropTypes.shape({
		_id: PropTypes.string,
		startMonth: PropTypes.string,
		endMonth: PropTypes.string,
		expirationDate: PropTypes.string,
		sendEmailNotificationsDate: PropTypes.string,
		notes: PropTypes.string,
	}),
	fetchForm: PropTypes.func.isRequired,
	match: PropTypes.shape({
		params: PropTypes.shape({
			id: PropTypes.string,
		}),
	}).isRequired,
	push: PropTypes.func.isRequired,
	serverMessage: PropTypes.string,
	updateForm: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
	editForm: state.forms.editForm,
	serverMessage: state.server.message,
});

const mapDispatchToProps = {
	fetchForm,
	push,
	updateForm,
};

export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(EditForm);
