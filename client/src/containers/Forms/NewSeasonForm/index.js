import React, { Component } from "react";
import PropTypes from "prop-types";
import moment from "moment";
import { connect } from "react-redux";
import { Card, Form, DatePicker } from "antd";
import { FaCalendarPlus } from "react-icons/fa";
import { hideServerMessage } from "actions/Messages";
import { createSeason } from "actions/Seasons";
import { FormContainer, SubmitButton } from "components/Body";
import { FormTitle, Errors, Input } from "components/Forms";
import { Label } from "components/Body";
import { fieldValidator, fieldUpdater, parseFields } from "utils";

const RangePicker = DatePicker.RangePicker;

const title = "New Season Form";

export class NewSeasonForm extends Component {
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

	static getDerivedStateFromProps = ({ serverMessage }) =>
		serverMessage ? { isSubmitting: false } : null;

	handleChange = ({ name, value }) => {
		let seasonId = "";

		const startYear = moment(value[0]).format("YYYY");
		const endYear = moment(value[1]).format("YYYY");
		seasonId = `${startYear}${endYear}`;

		this.setState(prevState => ({
			...prevState,
			seasonId,
			fields: fieldUpdater(prevState.fields, name, value),
		}));
	};

	handleSubmit = e => {
		e.preventDefault();

		const { validatedFields, errors } = fieldValidator(this.state.fields);

		this.setState({ fields: validatedFields, isSubmitting: !errors }, () => {
			const { fields: formFields, seasonId } = this.state;
			const { createSeason, hideServerMessage, serverMessage } = this.props;

			if (!errors) {
				const parsedFields = parseFields(formFields);
				const [seasonStart, seasonEnd] = parsedFields.seasonDuration;
				const startDate = seasonStart.format("l");
				const endDate = seasonEnd.format("l");

				if (serverMessage) hideServerMessage();
				setTimeout(() => createSeason({ endDate, startDate, seasonId }), 350);
			}
		});
	};

	render = () => (
		<Card title={title}>
			<FormContainer>
				<FormTitle
					header={title}
					title={title}
					description="Enter a new season by selecting a start and end date."
				/>
				<form onSubmit={this.handleSubmit}>
					<Input
						name="seasonId"
						type="text"
						label="Season ID"
						tooltip="Select a start and end date below to automatically fill in this field."
						icon="id"
						value={this.state.seasonId}
						inputStyle={{ paddingLeft: 60 }}
						readOnly
						disabled
					/>
					{this.state.fields.map(({ name, props, errors, ...rest }) => (
						<Form.Item
							key={name}
							style={{ height: 105 }}
							validateStatus={errors ? "error" : ""}
						>
							<Label {...rest} />
							<RangePicker
								{...props}
								{...rest}
								suffixIcon={<FaCalendarPlus />}
								onChange={value => this.handleChange({ name, value })}
							/>
							{errors && <Errors>{errors}</Errors>}
						</Form.Item>
					))}
					<SubmitButton isSubmitting={this.state.isSubmitting} />
				</form>
			</FormContainer>
		</Card>
	);
}

NewSeasonForm.propTypes = {
	createSeason: PropTypes.func.isRequired,
	hideServerMessage: PropTypes.func.isRequired,
	serverMessage: PropTypes.string,
};

const mapStateToProps = state => ({
	serverMessage: state.server.message,
});

const mapDispatchToProps = {
	createSeason,
	hideServerMessage,
};

export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(NewSeasonForm);
