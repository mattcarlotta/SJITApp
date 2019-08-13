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
import { FieldGenerator, FormTitle } from "components/Forms";
import { hideServerMessage } from "actions/Messages";
import { fetchSeasonsIds } from "actions/Seasons";
import { createForm } from "actions/Forms";
import { fieldValidator, fieldUpdater, parseFields } from "utils";
import fields from "./Fields";

const title = "New Form";

export class NewForm extends Component {
	state = {
		fields,
		isLoading: true,
		isSubmitting: false,
	};

	static getDerivedStateFromProps = ({ seasonIds, serverMessage }, state) => {
		if (state.isLoading && !isEmpty(seasonIds)) {
			return {
				fields: state.fields.map(field =>
					field.name === "seasonId"
						? { ...field, selectOptions: seasonIds, disabled: false }
						: { ...field, disabled: false },
				),
				isLoading: false,
			};
		}

		if (serverMessage) return { isSubmitting: false };

		return null;
	};

	componentDidMount = () => {
		this.props.fetchSeasonsIds();
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
			const { createForm, hideServerMessage, serverMessage } = this.props;

			if (!errors) {
				const parsedFields = parseFields(formFields);

				if (serverMessage) hideServerMessage();
				setTimeout(() => createForm(parsedFields), 350);
			}
		});
	};

	render = () => (
		<Card
			extra={
				<BackButton push={this.props.push} location="/employee/forms/viewall" />
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
						<Spinner />
					) : (
						<Fragment>
							<FieldGenerator
								fields={this.state.fields}
								onChange={this.handleChange}
							/>
							<SubmitButton
								disabled={isEmpty(this.props.seasonIds)}
								title="Create Form"
								isSubmitting={this.state.isSubmitting}
							/>
						</Fragment>
					)}
				</form>
			</FormContainer>
		</Card>
	);
}

NewForm.propTypes = {
	createForm: PropTypes.func.isRequired,
	fetchSeasonsIds: PropTypes.func.isRequired,
	hideServerMessage: PropTypes.func.isRequired,
	push: PropTypes.func.isRequired,
	seasonIds: PropTypes.arrayOf(PropTypes.string),
	serverMessage: PropTypes.string,
};

const mapStateToProps = state => ({
	serverMessage: state.server.message,
	seasonIds: state.seasons.ids,
});

const mapDispatchToProps = {
	createForm,
	fetchSeasonsIds,
	push,
	hideServerMessage,
};

export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(NewForm);
