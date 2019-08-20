import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import isEmpty from "lodash/isEmpty";
import moment from "moment";
import { Card } from "antd";
import { connect } from "react-redux";
import { push } from "connected-react-router";
import {
	BackButton,
	FormContainer,
	SubmitButton,
	Notes,
	Title,
} from "components/Body";
import { FieldGenerator, FormTitle, LoadingForm } from "components/Forms";
import { fetchFormAp, updateFormAp } from "actions/Forms";
import { fieldValidator, fieldUpdater, parseFields } from "utils";
import updateFormFields from "./UpdateFormFields";
import fields from "./Fields";

const title = "Sharks & Barracuda A/P Form";

export class ViewApForm extends Component {
	state = {
		fields,
		isLoading: true,
		isSubmitting: false,
	};

	static getDerivedStateFromProps = (
		{ events, viewForm, serverMessage },
		state,
	) => {
		if (state.isLoading && !isEmpty(events) && !isEmpty(viewForm)) {
			return {
				fields: state.fields.reduce(
					(result, field) => updateFormFields(result, field, events),
					[],
				),
				isLoading: false,
			};
		}

		if (serverMessage) return { isSubmitting: false };

		return null;
	};

	componentDidMount = () => {
		const { id } = this.props.match.params;
		this.props.fetchFormAp(id);
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
			const { fields: formFields } = this.state;

			if (!errors) {
				const parsedFields = parseFields(formFields);

				this.props.updateFormAp({
					...parsedFields,
					_id: this.props.viewForm._id,
				});
			}
		});
	};

	render = () => {
		const { fields, isLoading, isSubmitting } = this.state;
		const { viewForm, push } = this.props;

		return (
			<Card
				extra={<BackButton push={push} location="/employee/forms/viewall" />}
				title={title}
			>
				<FormContainer>
					<FormTitle
						header={title}
						title={title}
						description="Please fill out all of the A/P form fields below."
					/>
					<form style={{ textAlign: "center" }} onSubmit={this.handleSubmit}>
						{isLoading ? (
							<LoadingForm rows={9} />
						) : (
							<Fragment>
								<Title style={{ color: "#025f6d" }}>
									{moment(viewForm.startMonth).format("MMMM YYYY")}
								</Title>
								{viewForm.notes && (
									<Notes style={{ marginBottom: 60 }} notes={viewForm.notes} />
								)}
								<FieldGenerator fields={fields} onChange={this.handleChange} />
								<SubmitButton
									title="Submit AP Form"
									isSubmitting={isSubmitting}
								/>
							</Fragment>
						)}
					</form>
				</FormContainer>
			</Card>
		);
	};
}

ViewApForm.propTypes = {
	events: PropTypes.arrayOf(
		PropTypes.shape({
			_id: PropTypes.string,
			team: PropTypes.string,
			opponent: PropTypes.string,
			eventType: PropTypes.string,
			location: PropTypes.string,
			callTimes: PropTypes.arrayOf(PropTypes.string),
			uniform: PropTypes.string,
			seasonId: PropTypes.string,
			eventDate: PropTypes.string,
			notes: PropTypes.string,
		}),
	),
	fetchFormAp: PropTypes.func.isRequired,
	match: PropTypes.shape({
		params: PropTypes.shape({
			id: PropTypes.string,
		}),
	}).isRequired,
	push: PropTypes.func.isRequired,
	serverMessage: PropTypes.string,
	updateFormAp: PropTypes.func.isRequired,
	viewForm: PropTypes.shape({
		_id: PropTypes.string,
		startMonth: PropTypes.string,
		endMonth: PropTypes.string,
		expirationDate: PropTypes.string,
		notes: PropTypes.string,
	}),
};

const mapStateToProps = state => ({
	events: state.forms.events,
	serverMessage: state.server.message,
	viewForm: state.forms.viewForm,
});

const mapDispatchToProps = {
	fetchFormAp,
	push,
	updateFormAp,
};

export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(ViewApForm);
