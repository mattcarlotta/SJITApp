import React, { Component } from "react";
import PropTypes from "prop-types";
import isEmpty from "lodash/isEmpty";
import moment from "moment";
import { connect } from "react-redux";
import { push } from "connected-react-router";
import { Card, Form, DatePicker } from "antd";
import { FaCalendarPlus } from "react-icons/fa";
import { FormContainer, SubmitButton } from "components/Body";
import { FormTitle, Errors, Input } from "components/Forms";
import { Label } from "components/Body";
import { hideServerMessage } from "actions/Messages";
import { fetchSeason, fetchSeasons, updateSeason } from "actions/Seasons";
import { fieldUpdater, parseFields } from "utils";

const RangePicker = DatePicker.RangePicker;

const title = "Edit Season Form";

export class EditSeasonForm extends Component {
	state = {
		fields: [
			{
				type: "range",
				name: "seasonDuration",
				label: "Season Duration",
				value: [],
				errors: "",
				required: true,
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

	componentWillUnmount = () => {
		if (!this.props.isLoading) this.props.fetchSeasons();
	};

	static getDerivedStateFromProps = ({ editSeason, serverMessage }, state) => {
		if (!state.seasonId && !isEmpty(editSeason)) {
			const { endDate, seasonId, startDate } = editSeason;
			return {
				seasonId,
				fields: state.fields.map(field => ({
					...field,
					value: [moment(startDate), moment(endDate)],
				})),
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

		this.setState(prevState => ({
			...prevState,
			seasonId,
			fields: fieldUpdater(prevState.fields, name, value),
		}));
	};

	handleSubmit = e => {
		e.preventDefault();

		this.setState({ isSubmitting: true }, () => {
			const { fields: formFields, seasonId } = this.state;
			const {
				editSeason,
				hideServerMessage,
				serverMessage,
				updateSeason,
			} = this.props;

			const parsedFields = parseFields(formFields);
			const [seasonStart, seasonEnd] = parsedFields.seasonDuration;
			const startDate = seasonStart.format("l");
			const endDate = seasonEnd.format("l");
			const { _id } = editSeason;

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
					<Input
						name="seasonId"
						type="text"
						label="Season ID"
						tooltip="Select a start and end date below to automatically fill in this field."
						icon="id"
						value={this.state.seasonId}
						inputStyle={{ paddingLeft: 94 }}
						readOnly
						disabled
					/>
					{this.state.fields.map(({ name, props, errors, ...rest }) => (
						<Form.Item key={name} style={{ height: 105 }}>
							<Label {...rest} />
							<RangePicker
								{...props}
								{...rest}
								disabled={isEmpty(this.props.editSeason)}
								suffixIcon={<FaCalendarPlus />}
								onChange={value => this.handleChange({ name, value })}
							/>
						</Form.Item>
					))}
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
	editSeason: PropTypes.any,
	fetchSeason: PropTypes.func.isRequired,
	fetchSeasons: PropTypes.func.isRequired,
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
	fetchSeasons,
	hideServerMessage,
	push,
	updateSeason,
};

export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(EditSeasonForm);
