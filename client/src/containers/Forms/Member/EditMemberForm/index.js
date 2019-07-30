import React, { Component } from "react";
import PropTypes from "prop-types";
import isEmpty from "lodash/isEmpty";
import { connect } from "react-redux";
import { Input, Select } from "components/Forms";
import { SubmitButton } from "components/Body";
import { hideServerMessage } from "actions/Messages";
import { updateMember } from "actions/Members";
import { fieldValidator, fieldUpdater, parseFields } from "utils";
import fields from "./Fields";

export class EditMemberForm extends Component {
	state = {
		fields,
		wasInitialized: false,
		isSubmitting: false,
	};

	static getDerivedStateFromProps = ({ viewMember, serverMessage }, state) => {
		if (!state.wasInitialized && !isEmpty(viewMember)) {
			const values = [
				viewMember.email,
				viewMember.firstName,
				viewMember.lastName,
				viewMember.role,
			];

			return {
				fields: state.fields.map((field, key) => ({
					...field,
					value: values[key],
				})),
				wasInitialized: true,
			};
		}

		if (serverMessage) return { isSubmitting: false };

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
				updateMember,
				viewMember: { _id },
			} = this.props;

			if (!errors) {
				const parsedFields = parseFields(formFields);

				if (serverMessage) hideServerMessage();
				setTimeout(() => updateMember({ ...parsedFields, _id }), 350);
			}
		});
	};

	render = () => (
		<form
			style={{ width: 400, marginTop: 50, marginBottom: 60 }}
			onSubmit={this.handleSubmit}
		>
			{this.state.fields.map(props =>
				props.type != "select" ? (
					<Input {...props} key={props.name} onChange={this.handleChange} />
				) : (
					<Select
						{...props}
						key={props.name}
						onChange={this.handleChange}
						selectOptions={["staff", "member"]}
					/>
				),
			)}
			<SubmitButton
				title="Update Member"
				isSubmitting={this.state.isSubmitting}
			/>
		</form>
	);
}

EditMemberForm.propTypes = {
	hideServerMessage: PropTypes.func.isRequired,
	serverMessage: PropTypes.string,
	updateMember: PropTypes.func.isRequired,
	viewMember: PropTypes.shape({
		_id: PropTypes.string,
		email: PropTypes.string.isRequired,
		events: PropTypes.any,
		firstName: PropTypes.string.isRequired,
		lastName: PropTypes.string.isRequired,
		registered: PropTypes.string,
		role: PropTypes.string.isRequired,
		schedule: PropTypes.any,
		status: PropTypes.string,
	}).isRequired,
};

const mapStateToProps = state => ({
	serverMessage: state.server.message,
	viewMember: state.members.viewMember,
});

const mapDispatchToProps = {
	hideServerMessage,
	updateMember,
};

export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(EditMemberForm);
