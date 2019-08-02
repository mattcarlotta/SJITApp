import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import isEmpty from "lodash/isEmpty";
import { Card } from "antd";
import { connect } from "react-redux";
import {
	FieldGenerator,
	FormContainer,
	Spinner,
	SubmitButton,
} from "components/Body";
import { FormTitle } from "components/Forms";
import { hideServerMessage } from "actions/Messages";
import { fetchSeasonsIds } from "actions/Seasons";
import { fetchToken, updateMemberToken } from "actions/Members";
import { fieldValidator, fieldUpdater, parseFields } from "utils";
import fields from "./Fields";
import updateFormFields from "./UpdateFormFields";

const title = "Edit Member Form";

export class NewMemberForm extends Component {
	state = {
		fields,
		isLoading: true,
		isSubmitting: false,
	};

	componentDidMount = () => {
		this.props.fetchSeasonsIds();

		const { id } = this.props.match.params;
		this.props.fetchToken(id);
	};

	static getDerivedStateFromProps = (
		{ editToken, seasonIds, serverMessage },
		state,
	) => {
		if (state.isLoading && !isEmpty(seasonIds) && !isEmpty(editToken)) {
			return {
				fields: state.fields.map(field =>
					updateFormFields(field, seasonIds, editToken),
				),
				isLoading: false,
			};
		}

		if (serverMessage) return { isSubmitting: false, isLoading: false };

		return null;
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
			const {
				hideServerMessage,
				serverMessage,
				updateMemberToken,
			} = this.props;

			if (!errors) {
				const parsedFields = parseFields(formFields);

				if (serverMessage) hideServerMessage();
				console.log(parsedFields);
				// setTimeout(() => updateMemberToken(parsedFields), 350);
			}
		});
	};

	render = () => (
		<Card title={title}>
			<FormContainer>
				<FormTitle
					header={title}
					title={title}
					description="Select a different season, role, and/or enter another valid email address."
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
								title="Update Authorization"
								isSubmitting={this.state.isSubmitting}
							/>
						</Fragment>
					)}
				</form>
			</FormContainer>
		</Card>
	);
}

NewMemberForm.propTypes = {
	fetchToken: PropTypes.func.isRequired,
	fetchSeasonsIds: PropTypes.func.isRequired,
	hideServerMessage: PropTypes.func.isRequired,
	seasonIds: PropTypes.arrayOf(PropTypes.string),
	serverMessage: PropTypes.string,
	updateMemberToken: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
	editToken: state.members.editToken,
	serverMessage: state.server.message,
	seasonIds: state.seasons.ids,
});

const mapDispatchToProps = {
	fetchToken,
	fetchSeasonsIds,
	hideServerMessage,
	updateMemberToken,
};

export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(NewMemberForm);
