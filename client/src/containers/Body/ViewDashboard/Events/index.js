import React, { Fragment, Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import isEmpty from "lodash/isEmpty";
import get from "lodash/get";
import moment from "moment";
import { Card, Col, Select } from "antd";
import { MdEvent } from "react-icons/md";
import { LoadingPanel, ScheduleModal, ScheduleList } from "components/Body";
import { fetchEvents } from "actions/Dashboard";
import CalendarContainer from "./CalendarContainer";
import CalendarDate from "./CalendarDate";
import NoEvents from "./NoEvents";
import columns from "../Columns";

const Option = Select.Option;
const format = "MM DD YYYY, hh:mm a";

const iconStyle = {
	verticalAlign: "middle",
	marginRight: 10,
	fontSize: 25,
};

class Events extends Component {
	state = {
		selectedEvent: "Today",
		isVisible: false,
		modalChildren: null,
	};

	componentDidMount = () => {
		this.props.fetchEvents(this.state.selectedEvent);
	};

	handleSelection = selectedEvent => {
		this.setState({ selectedEvent }, () =>
			this.props.fetchEvents(selectedEvent),
		);
	};

	handleCloseModal = () => {
		this.setState({
			isVisible: false,
			modalChildren: null,
		});
	};

	handleShowModal = modalChildren => {
		this.setState({
			isVisible: true,
			modalChildren: [modalChildren],
		});
	};

	render = () => {
		const { selectedEvent } = this.state;
		const { events, isLoading } = this.props;
		const eventDate = get(events[0], ["eventDate"]);
		const endOfDay = moment(eventDate)
			.endOf("day")
			.format(format);
		const selectedToday = selectedEvent === "Today";
		const currentDate = moment(eventDate).format("MMM DD");

		return (
			<Fragment>
				<Col {...columns}>
					<Card
						bodyStyle={{ minHeight: "300px" }}
						title={
							<Fragment>
								<MdEvent style={iconStyle} />
								<span css="vertical-align: middle;">Events</span>
							</Fragment>
						}
						extra={
							<Select
								size="large"
								onChange={this.handleSelection}
								defaultValue={selectedEvent}
								value={selectedEvent}
								style={{ width: 120 }}
							>
								{["Today", "Upcoming"].map(game => (
									<Option key={game} value={game}>
										{game}
									</Option>
								))}
							</Select>
						}
					>
						<CalendarContainer>
							<CalendarDate>{currentDate}</CalendarDate>
							{isLoading ? (
								<LoadingPanel
									style={{
										margin: "30px auto 0",
										width: "350px",
										borderRadius: 3,
									}}
									height="140px"
								/>
							) : (
								<div css="padding: 30px 20px;">
									{!isEmpty(events) ? (
										events.map(props =>
											moment(props.eventDate).format(format) < endOfDay ? (
												<ScheduleList
													key={props._id}
													content={[props]}
													listStyle={{ padding: 3 }}
													spacing={20}
													folder="lowres"
													handleShowModal={this.handleShowModal}
													loggedinUserId={this.props.loggedinUserId}
													scheduleIconStyle={{
														fontSize: 17,
														verticalAlign: "middle",
													}}
												/>
											) : null,
										)
									) : (
										<NoEvents selectedToday={selectedToday} />
									)}
								</div>
							)}
						</CalendarContainer>
					</Card>
				</Col>
				<ScheduleModal
					{...this.state}
					loggedinUserId={this.props.loggedinUserId}
					handleCloseModal={this.handleCloseModal}
				/>
			</Fragment>
		);
	};
}

Events.propTypes = {
	events: PropTypes.arrayOf(
		PropTypes.shape({
			_id: PropTypes.string,
			eventDate: PropTypes.string,
			eventNotes: PropTypes.string,
			eventType: PropTypes.string,
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
	isLoading: PropTypes.bool.isRequired,
	fetchEvents: PropTypes.func.isRequired,
	loggedinUserId: PropTypes.string,
};

const mapStateToProps = state => ({
	events: state.dashboard.events.data,
	isLoading: state.dashboard.events.isLoading,
	loggedinUserId: state.auth.id,
});

const mapDispatchToProps = {
	fetchEvents,
};

export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(Events);
