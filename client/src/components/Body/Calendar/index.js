import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import isEmpty from "lodash/isEmpty";
import moment from "moment";
import { Calendar } from "antd";
import { ScheduleList, ScheduleHeader, ScheduleModal } from "components/Body";

const setValidRange = date => [
	moment(date).startOf("month"),
	moment(date).endOf("month"),
];

class CustomCalendar extends Component {
	constructor(props) {
		super(props);

		const { id } = props.match.params;
		const selectedGames = id ? "My Games" : "All Games";

		this.state = {
			id: props.id || id,
			isVisible: false,
			modalChildren: null,
			months: moment.monthsShort(),
			years: [
				...Array(11)
					.fill()
					.map(
						(_, key) =>
							parseInt(
								moment()
									.subtract(5, "year")
									.format("YYYY"),
								10,
							) + key,
					),
			],
			validRange: setValidRange(Date.now()),
			selectedGames,
			selectedMonth: moment().format("MMM"),
			selectedYear: parseInt(moment().format("YYYY"), 10),
		};
	}

	componentDidMount = () => {
		const { id, selectedGames } = this.state;
		this.props.fetchAction({ id, selectedGames });
	};

	handleShowModal = modalChildren => {
		this.setState({
			isVisible: true,
			modalChildren: [modalChildren],
		});
	};

	handleCloseModal = () => {
		this.setState({
			isVisible: false,
			modalChildren: null,
		});
	};

	handleSelection = ({ name, value, calendarDate, updateCalendarDate }) => {
		let newCalendarDate = calendarDate;

		switch (name) {
			case "selectedMonth": {
				newCalendarDate = calendarDate.clone().month(value);
				break;
			}
			case "selectedYear": {
				newCalendarDate = calendarDate.clone().year(value);
				break;
			}
		}

		updateCalendarDate(newCalendarDate);

		this.setState(
			{ [name]: value, validRange: setValidRange(newCalendarDate) },
			() => {
				this.props.fetchAction({
					id: this.state.id,
					selectedDate: moment(
						`${this.state.selectedMonth} ${this.state.selectedYear}`,
						"MMM YYYY",
					).format(),
					selectedGames: this.state.selectedGames,
				});
			},
		);
	};

	handleRenderHeader = props => (
		<ScheduleHeader
			{...this.state}
			{...props}
			handleSelection={this.handleSelection}
		/>
	);

	handleDateCellRender = value => {
		const { scheduleEvents } = this.props;

		const calanderDate = value.format("l");
		const content = !isEmpty(scheduleEvents)
			? scheduleEvents.filter(
					event => moment(event.eventDate).format("l") === calanderDate,
			  )
			: [];

		return (
			<ScheduleList content={content} handleShowModal={this.handleShowModal} />
		);
	};

	render = () => (
		<Fragment>
			<Calendar
				mode="month"
				validRange={this.state.validRange}
				headerRender={this.handleRenderHeader}
				dateCellRender={this.handleDateCellRender}
			/>
			<ScheduleModal {...this.state} handleCloseModal={this.handleCloseModal} />
		</Fragment>
	);
}

CustomCalendar.propTypes = {
	id: PropTypes.string,
	fetchAction: PropTypes.func.isRequired,
	match: PropTypes.shape({
		params: PropTypes.shape({
			id: PropTypes.string,
		}),
	}).isRequired,
	scheduleEvents: PropTypes.arrayOf(
		PropTypes.shape({
			_id: PropTypes.string,
			eventDate: PropTypes.string,
			eventNotes: PropTypes.string,
			eventType: PropTypes.string,
			employeeResponse: PropTypes.string,
			employeeNotes: PropTypes.string,
			notes: PropTypes.string,
			opponent: PropTypes.string,
			response: PropTypes.string,
			team: PropTypes.string,
			schedule: PropTypes.arrayOf(
				PropTypes.shape({
					_id: PropTypes.string,
					title: PropTypes.string,
					employeeIds: PropTypes.arrayOf(
						PropTypes.shape({
							_id: PropTypes.string,
							firstName: PropTypes.string,
							lastName: PropTypes.string,
						}),
					),
				}),
			),
		}),
	),
};

export default CustomCalendar;
