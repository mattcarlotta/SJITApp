import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import isEmpty from "lodash/isEmpty";
import { connect } from "react-redux";
import { Spinner, SubmitButton } from "components/Body";
import { FieldGenerator } from "components/Forms";
import { hideServerMessage } from "actions/Messages";
import { updateMember } from "actions/Members";
import { fieldValidator, fieldUpdater, parseFields } from "utils";
import fields from "./Fields";

const formStyles = {
	width: 400,
	marginTop: 50,
	marginBottom: 60,
};

export class EditMemberForm extends Component {
	state = {
		fields,
		isLoading: true,
		isSubmitting: false,
	};

	static getDerivedStateFromProps = ({ viewMember, serverMessage }, state) => {
		if (state.isLoading && !isEmpty(viewMember)) {
			return {
				fields: state.fields.map(field => ({
					...field,
					value: viewMember[field.name],
				})),
				isLoading: false,
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
		<form style={formStyles} onSubmit={this.handleSubmit}>
			{this.state.isLoading ? (
				<Spinner />
			) : (
				<Fragment>
					<FieldGenerator
						fields={this.state.fields}
						onChange={this.handleChange}
					/>
					<SubmitButton
						title="Update Member"
						isSubmitting={this.state.isSubmitting}
					/>
				</Fragment>
			)}
		</form>
	);
}

EditMemberForm.propTypes = {
	hideServerMessage: PropTypes.func.isRequired,
	serverMessage: PropTypes.string,
	updateMember: PropTypes.func.isRequired,
	viewMember: PropTypes.shape({
		_id: PropTypes.string,
		email: PropTypes.string,
		events: PropTypes.any,
		firstName: PropTypes.string,
		lastName: PropTypes.string,
		registered: PropTypes.string,
		role: PropTypes.string,
		schedule: PropTypes.any,
		status: PropTypes.string,
	}).isRequired,
};

EditMemberForm.defaultProps = {
	viewMember: {},
};

/* istanbul ignore next */
const mapStateToProps = state => ({
	serverMessage: state.server.message,
	viewMember: state.members.viewMember,
});

/* istanbul ignore next */
const mapDispatchToProps = {
	hideServerMessage,
	updateMember,
};

export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(EditMemberForm);
