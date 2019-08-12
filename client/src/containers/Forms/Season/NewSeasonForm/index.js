import React, { Component } from "react";
import PropTypes from "prop-types";
import isEmpty from "lodash/isEmpty";
import { connect } from "react-redux";
import { push } from "connected-react-router";
import { Card } from "antd";
import { hideServerMessage } from "actions/Messages";
import { createSeason } from "actions/Seasons";
import { BackButton, FormContainer, SubmitButton } from "components/Body";
import { FieldGenerator, FormTitle } from "components/Forms";
import { fieldValidator, fieldUpdater, parseFields } from "utils";
import fields from "./Fields";

const title = "New Season Form";

export class NewSeasonForm extends Component {
	state = {
		fields,
		seasonId: "",
		isSubmitting: false,
	};

	static getDerivedStateFromProps = ({ serverMessage }) =>
		serverMessage ? { isSubmitting: false } : null;

	handleChange = ({ target: { name, value } }) => {
		let seasonId = "";

		if (!isEmpty(value)) {
			const [startYear, endYear] = value;
			seasonId = `${startYear.format("YYYY")}${endYear.format("YYYY")}`;
		}

		this.setState(prevState => {
			const updateFields = prevState.fields.map(field =>
				field.type === "text" ? { ...field, value: seasonId } : { ...field },
			);

			return {
				...prevState,
				fields: fieldUpdater(updateFields, name, value),
			};
		});
	};

	handleSubmit = e => {
		e.preventDefault();

		const { validatedFields, errors } = fieldValidator(this.state.fields);

		this.setState({ fields: validatedFields, isSubmitting: !errors }, () => {
			const { fields: formFields } = this.state;
			const { createSeason, hideServerMessage, serverMessage } = this.props;

			if (!errors) {
				const parsedFields = parseFields(formFields);

				if (serverMessage) hideServerMessage();
				setTimeout(() => createSeason({ ...parsedFields }), 350);
			}
		});
	};

	render = () => (
		<Card
			extra={
				<BackButton
					push={this.props.push}
					location="/employee/seasons/viewall"
				/>
			}
			title={title}
		>
			<FormContainer>
				<FormTitle
					header={title}
					title={title}
					description="Enter a new season by selecting a start and end date."
				/>
				<form onSubmit={this.handleSubmit}>
					<FieldGenerator
						fields={this.state.fields}
						onChange={this.handleChange}
					/>
					<SubmitButton isSubmitting={this.state.isSubmitting} />
				</form>
			</FormContainer>
		</Card>
	);
}

NewSeasonForm.propTypes = {
	createSeason: PropTypes.func.isRequired,
	hideServerMessage: PropTypes.func.isRequired,
	push: PropTypes.func.isRequired,
	serverMessage: PropTypes.string,
};

const mapStateToProps = state => ({
	serverMessage: state.server.message,
});

const mapDispatchToProps = {
	createSeason,
	hideServerMessage,
	push,
};

export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(NewSeasonForm);
