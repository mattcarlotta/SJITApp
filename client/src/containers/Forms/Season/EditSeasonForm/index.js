import React, { Component } from "react";
import PropTypes from "prop-types";
import isEmpty from "lodash/isEmpty";
import moment from "moment";
import { connect } from "react-redux";
import { push } from "connected-react-router";
import { Card, DatePicker } from "antd";
import { FieldGenerator, FormContainer, SubmitButton } from "components/Body";
import { FormTitle } from "components/Forms";
import { hideServerMessage } from "actions/Messages";
import { fetchSeason, updateSeason } from "actions/Seasons";
import { fieldUpdater, parseFields } from "utils";

const RangePicker = DatePicker.RangePicker;

const title = "Edit Season Form";

export class EditSeasonForm extends Component {
	state = {
		fields: [
			{
				type: "text",
				name: "seasonId",
				label: "Season ID",
				tooltip:
					"Select a start and end date below to automatically fill in this field.",
				icon: "id",
				value: "",
				errors: "",
				required: true,
				disabled: true,
				readOnly: true,
				inputStyle: { paddingLeft: 94 },
			},
			{
				type: "range",
				name: "seasonDuration",
				label: "Season Duration",
				value: [],
				errors: "",
				required: true,
				disabled: true,
				props: {
					format: "l",
				},
			},
		],
		seasonId: "",
		isSubmitting: false,
	};

	componentDidMount = () => {
		const { id } = this.props.match.params;

		this.props.fetchSeason(id);
	};

	static getDerivedStateFromProps = ({ editSeason, serverMessage }, state) => {
		if (!state.seasonId && !isEmpty(editSeason)) {
			const { endDate, seasonId, startDate } = editSeason;
			return {
				seasonId,
				fields: state.fields.map(field =>
					field.type === "range"
						? {
								...field,
								disabled: false,
								value: [moment(startDate), moment(endDate)],
						  }
						: { ...field, value: seasonId },
				),
			};
		}

		if (serverMessage) return { isSubmitting: false };

		return null;
	};

	handleChange = ({ name, value }) => {
		let seasonId = "";

		if (!isEmpty(value)) {
			const startYear = moment(value[0]).format("YYYY");
			const endYear = moment(value[1]).format("YYYY");
			seasonId = `${startYear}${endYear}`;
		}

		this.setState(prevState => {
			const updateFields = prevState.fields.map(field =>
				field.type === "text" ? { ...field, value: seasonId } : { ...field },
			);

			return {
				...prevState,
				seasonId,
				fields: fieldUpdater(updateFields, name, value),
			};
		});
	};

	handleSubmit = e => {
		e.preventDefault();

		this.setState({ isSubmitting: true }, () => {
			const { fields: formFields } = this.state;
			const {
				editSeason: { _id },
				hideServerMessage,
				serverMessage,
				updateSeason,
			} = this.props;

			const parsedFields = parseFields(formFields);
			const { seasonId, seasonDuration } = parsedFields;
			const [seasonStart, seasonEnd] = seasonDuration;
			const startDate = seasonStart.format("l");
			const endDate = seasonEnd.format("l");

			if (serverMessage) hideServerMessage();
			setTimeout(
				() => updateSeason({ _id, endDate, startDate, seasonId }),
				350,
			);
		});
	};

	render = () => (
		<Card title={title}>
			<FormContainer>
				<FormTitle
					header={title}
					title={title}
					description="Select a new start and end date to update the season."
				/>
				<form onSubmit={this.handleSubmit}>
					<FieldGenerator
						fields={this.state.fields}
						onChange={this.handleChange}
					/>
					<SubmitButton
						disabled={isEmpty(this.props.editSeason)}
						isSubmitting={this.state.isSubmitting}
					/>
				</form>
			</FormContainer>
		</Card>
	);
}

EditSeasonForm.propTypes = {
	editSeason: PropTypes.shape({
		_id: PropTypes.string,
		seaonId: PropTypes.string,
		startDate: PropTypes.oneOfType([
			PropTypes.string,
			PropTypes.instanceOf(Date),
		]),
		endDate: PropTypes.oneOfType([
			PropTypes.string,
			PropTypes.instanceOf(Date),
		]),
	}),
	fetchSeason: PropTypes.func.isRequired,
	hideServerMessage: PropTypes.func.isRequired,
	isLoading: PropTypes.bool.isRequired,
	match: PropTypes.shape({
		params: PropTypes.shape({
			id: PropTypes.string.isRequired,
		}).isRequired,
	}).isRequired,
	push: PropTypes.func.isRequired,
	updateSeason: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
	isLoading: state.seasons.isLoading,
	editSeason: state.seasons.editSeason,
	serverMessage: state.server.message,
});

const mapDispatchToProps = {
	fetchSeason,
	hideServerMessage,
	push,
	updateSeason,
};

export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(EditSeasonForm);
