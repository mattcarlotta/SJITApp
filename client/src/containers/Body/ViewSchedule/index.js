import React, { Fragment, Component } from "react";
import PropTypes from "prop-types";
import isEmpty from "lodash/isEmpty";
import moment from "moment";
import Helmet from "react-helmet";
import { connect } from "react-redux";
import { Calendar, Card, Select } from "antd";
import {
	Badge,
	Bold,
	Button,
	DisplayTeam,
	FlexEnd,
	List,
	ListItem,
	Modal,
} from "components/Body";
import { fetchScheduleEvents } from "actions/Events";

const Option = Select.Option;
const title = "View Schedule";

const setValidRange = date => [
	moment(date).startOf("month"),
	moment(date).endOf("month"),
];

export class ViewSchedule extends Component {
	state = {
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
		selectedGames: "All Games",
		selectedMonth: moment().format("MMM"),
		selectedYear: parseInt(moment().format("YYYY"), 10),
	};

	componentDidMount = () => {
		this.props.fetchScheduleEvents();
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
		const newCalendarDate =
			name === "selectedMonth"
				? calendarDate.clone().month(value)
				: calendarDate.clone().year(value);

		updateCalendarDate(newCalendarDate);

		this.setState(
			{ [name]: value, validRange: setValidRange(newCalendarDate) },
			() => {
				this.props.fetchScheduleEvents({
					selectedDate: moment(
						`${this.state.selectedMonth} ${this.state.selectedYear}`,
						"MMM YYYY",
					).format(),
					selectedGames: this.state.selectedGames,
				});
			},
		);
	};

	handleRenderHeader = ({
		value: calendarDate,
		onChange: updateCalendarDate,
	}) => (
		<FlexEnd style={{ padding: "8px 20px" }}>
			<Select
				size="large"
				onChange={value => {
					this.handleSelection({
						name: "selectedGames",
						value,
						calendarDate,
						updateCalendarDate,
					});
				}}
				value={this.state.selectedGames}
			>
				{["All Games", "My Games"].map(game => (
					<Option key={game} value={game}>
						{game}
					</Option>
				))}
			</Select>
			<Select
				size="large"
				onChange={value => {
					this.handleSelection({
						name: "selectedMonth",
						value,
						calendarDate,
						updateCalendarDate,
					});
				}}
				value={this.state.selectedMonth}
			>
				{this.state.months.map(month => (
					<Option key={month} value={month}>
						{month}
					</Option>
				))}
			</Select>
			<Select
				size="large"
				value={this.state.selectedYear}
				onChange={value => {
					this.handleSelection({
						name: "selectedYear",
						value,
						calendarDate,
						updateCalendarDate,
					});
				}}
			>
				{this.state.years.map(year => (
					<Option key={year} value={year}>
						{year}
					</Option>
				))}
			</Select>
		</FlexEnd>
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
			<List>
				{!isEmpty(content) &&
					content.map(item => (
						<Button
							key={item._id}
							primary={item.team === "San Jose Sharks"}
							danger={item.team === "San Jose Barracuda"}
							padding="2px 0"
							style={{ margin: "2px 0" }}
							onClick={() => this.handleShowModal(item)}
						>
							<ListItem style={{ margin: 0 }}>
								<DisplayTeam folder="calendar" team={item.team} />
								{item.opponent && (
									<Fragment>
										<span
											css={`
												margin: 0 5px;
											`}
										>
											vs.
										</span>
										<DisplayTeam folder="calendar" team={item.opponent} />
									</Fragment>
								)}
							</ListItem>
						</Button>
					))}
			</List>
		);
	};

	render = () => (
		<Fragment>
			<Helmet title={title} />
			<Card title={title}>
				<Calendar
					mode="month"
					validRange={this.state.validRange}
					headerRender={this.handleRenderHeader}
					dateCellRender={this.handleDateCellRender}
				/>
			</Card>
			{this.state.isVisible && (
				<Modal maxWidth="600px" onClick={this.handleCloseModal}>
					{this.state.modalChildren.map(
						({
							eventDate,
							eventNotes,
							eventType,
							location,
							team,
							opponent,
							notes,
							scheduledIds,
						}) => (
							<Fragment key="modal-content">
								<List style={{ padding: 10 }}>
									<ListItem>
										<Bold>Date: </Bold>{" "}
										{moment(eventDate).format("MMMM Do, YYYY @ h:mm a")}
									</ListItem>
									<ListItem>
										<Bold>Event Type: </Bold> {eventType}
									</ListItem>
									<ListItem>
										<Bold>Location: </Bold> {location}
									</ListItem>
									{eventNotes && (
										<ListItem>
											<Bold>Event Notes: </Bold> {eventNotes}
										</ListItem>
									)}
									<ListItem>
										<Bold>Event: </Bold>
										{team}
										{opponent && (
											<Fragment>
												<span
													css={`
														margin: 0 5px;
													`}
												>
													vs.
												</span>
												{opponent}
											</Fragment>
										)}
									</ListItem>
									{notes && (
										<ListItem>
											<Bold>Employee Notes:</Bold> {notes}
										</ListItem>
									)}
									{this.props.role !== "employee" && (
										<ListItem>
											<Bold>Scheduled Employees:</Bold>
											{!isEmpty(scheduledIds) ? (
												scheduledIds.map(({ _id, firstName, lastName }) => (
													<div key={_id}>
														<Badge response="Scheduled.">
															{firstName} {lastName}
														</Badge>
													</div>
												))
											) : (
												<span>&#40;none&#41;</span>
											)}
										</ListItem>
									)}
								</List>
							</Fragment>
						),
					)}
				</Modal>
			)}
		</Fragment>
	);
}

ViewSchedule.propTypes = {
	fetchScheduleEvents: PropTypes.func.isRequired,
	role: PropTypes.string.isRequired,
	scheduleEvents: PropTypes.arrayOf(
		PropTypes.shape({
			_id: PropTypes.string,
			eventDate: PropTypes.string,
			eventNotes: PropTypes.string,
			eventType: PropTypes.string,
			notes: PropTypes.string,
			opponent: PropTypes.string,
			response: PropTypes.string,
			team: PropTypes.string,
			scheduledEmployees: PropTypes.arrayOf(
				PropTypes.shape({
					_id: PropTypes.string,
					firstName: PropTypes.string,
					lastName: PropTypes.string,
				}),
			),
		}),
	),
};

const mapStateToProps = state => ({
	role: state.auth.role,
	scheduleEvents: state.events.scheduleEvents,
});

const mapDispatchToProps = {
	fetchScheduleEvents,
};

export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(ViewSchedule);
