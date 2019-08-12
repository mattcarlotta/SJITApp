import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import isEmpty from "lodash/isEmpty";
import { Card } from "antd";
import { connect } from "react-redux";
import { push } from "connected-react-router";
import {
	BackButton,
	FormContainer,
	Spinner,
	SubmitButton,
} from "components/Body";
import { AddField, FieldGenerator, FormTitle } from "components/Forms";
import { hideServerMessage } from "actions/Messages";
import { fetchEvent, updateEvent } from "actions/Events";
import { fieldValidator, fieldUpdater, parseFields } from "utils";
import fields from "./Fields";
import updateFormFields from "./UpdateFormFields";

const title = "Edit Event Form";

export class EditEventForm extends Component {
	state = {
		fields,
		isLoading: true,
		isSubmitting: false,
	};

	componentDidMount = () => {
		const { id } = this.props.match.params;
		this.props.fetchEvent(id);
	};

	componentDidUpdate = () => {
		if (this.state.isLoading && !isEmpty(this.props.editEvent)) {
			this.setState(prevState => ({
				...prevState,
				fields: prevState.fields.reduce(
					(result, field) =>
						updateFormFields(
							result,
							field,
							this.props.editEvent,
							this.handleRemoveField,
						),
					[],
				),
				isLoading: false,
			}));
		}
	};

	static getDerivedStateFromProps = ({ serverMessage }) => {
		if (serverMessage) return { isSubmitting: false };

		return null;
	};

	handleChange = ({ target: { name, value } }) => {
		this.setState(prevState => ({
			...prevState,
			fields: fieldUpdater(prevState.fields, name, value),
		}));
	};

	handleAddField = () => {
		this.setState(prevState => ({
			...prevState,
			fields: [
				...prevState.fields,
				{
					type: "time",
					name: `callTime-${Date.now()}`,
					placeholder: "Select a call time...",
					label: "",
					value: null,
					errors: "",
					height: "auto",
					style: { width: "100%" },
					onFieldRemove: this.handleRemoveField,
				},
			],
		}));
	};

	handleRemoveField = name => {
		this.setState(prevState => ({
			...prevState,
			fields: prevState.fields.filter(field => field.name !== name),
		}));
	};

	handleSubmit = e => {
		e.preventDefault();
		const { validatedFields, errors } = fieldValidator(this.state.fields);

		this.setState({ fields: validatedFields, isSubmitting: !errors }, () => {
			const { fields: formFields } = this.state;
			const {
				hideServerMessage,
				serverMessage,
				editEvent: { _id },
				updateEvent,
			} = this.props;

			if (!errors) {
				const parsedFields = parseFields(formFields);

				if (serverMessage) hideServerMessage();
				setTimeout(() => updateEvent({ _id, ...parsedFields }), 350);
			}
		});
	};

	render = () => (
		<Card
			extra={
				<BackButton
					push={this.props.push}
					location="/employee/events/viewall"
				/>
			}
			title={title}
		>
			<FormContainer>
				<FormTitle
					header={title}
					title={title}
					description="Edit or change any of the current event fields below."
				/>
				<form onSubmit={this.handleSubmit}>
					{this.state.isLoading ? (
						<Spinner />
					) : (
						<Fragment>
							<FieldGenerator
								fields={this.state.fields}
								onChange={this.handleChange}
							/>
							<AddField
								onClick={this.handleAddField}
								text="Add Call Time Slot"
							/>
							<SubmitButton
								disabled={isEmpty(this.props.editEvent)}
								title="Update Event"
								isSubmitting={this.state.isSubmitting}
							/>
						</Fragment>
					)}
				</form>
			</FormContainer>
		</Card>
	);
}

EditEventForm.propTypes = {
	editEvent: PropTypes.shape({
		_id: PropTypes.string,
		league: PropTypes.string,
		eventType: PropTypes.string,
		location: PropTypes.string,
		callTimes: PropTypes.arrayOf(PropTypes.string),
		uniform: PropTypes.string,
		seasonId: PropTypes.string,
		eventDate: PropTypes.string,
		notes: PropTypes.string,
	}).isRequired,
	fetchEvent: PropTypes.func.isRequired,
	hideServerMessage: PropTypes.func.isRequired,
	match: PropTypes.shape({
		params: PropTypes.shape({
			id: PropTypes.string,
		}),
	}).isRequired,
	push: PropTypes.func.isRequired,
	serverMessage: PropTypes.string,
	updateEvent: PropTypes.func.isRequired,
};

EditEventForm.defaultProps = {
	editEvent: {},
};

const mapStateToProps = state => ({
	editEvent: state.events.editEvent,
	serverMessage: state.server.message,
});

const mapDispatchToProps = {
	fetchEvent,
	hideServerMessage,
	push,
	updateEvent,
};

export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(EditEventForm);
