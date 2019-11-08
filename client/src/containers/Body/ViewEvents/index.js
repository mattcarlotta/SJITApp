import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import Helmet from "react-helmet";
import isEmpty from "lodash/isEmpty";
import qs from "qs";
import { connect } from "react-redux";
import { push } from "connected-react-router";
import { Card, DatePicker } from "antd";
import { MdEventNote } from "react-icons/md";
import { FaCalendarPlus } from "react-icons/fa";
import {
	Button,
	DisplayEmailReminder,
	DisplayScheduledEmployees,
	DisplayTime,
	DisplayTeam,
	Flex,
	FlexEnd,
	FlexStart,
	FormatDate,
	Table,
} from "components/Body";
import { deleteEvent, fetchEvents, resendMail } from "actions/Events";

const RangePicker = DatePicker.RangePicker;

const title = "Events";
const iconStyle = {
	verticalAlign: "middle",
	marginRight: 10,
	fontSize: 22,
};

const columns = [
	{ title: "Season Id", dataIndex: "seasonId", key: "seasonId" },
	{
		title: "Team",
		dataIndex: "team",
		key: "team",
		render: team => <DisplayTeam folder="lowres" team={team} />,
	},
	{
		title: "Opponent",
		dataIndex: "opponent",
		key: "opponent",
		render: team => (team ? <DisplayTeam folder="lowres" team={team} /> : "-"),
	},
	{ title: "Event Type", dataIndex: "eventType", key: "eventType" },
	{ title: "Location", dataIndex: "location", key: "location" },
	{ title: "Uniform", dataIndex: "uniform", key: "uniform" },
	{
		title: "Event Date",
		dataIndex: "eventDate",
		key: "eventDate",
		render: date => (
			<FormatDate
				style={{ wordWrap: "break-word", wordBreak: "break-word", width: 175 }}
				format="MMM Do @ h:mm a"
				date={date}
			/>
		),
	},
	{
		title: "Call Times",
		dataIndex: "callTimes",
		key: "callTimes",
		render: times => <DisplayTime times={times} />,
	},
	{
		title: "Employee Responses",
		dataIndex: "employeeResponses",
		key: "employeeResponses",
		render: responses => <span css="cursor: default;">{responses.length}</span>,
	},
	{
		title: "Scheduled Employees",
		dataIndex: "scheduledIds",
		key: "scheduledIds",
		render: employees => <DisplayScheduledEmployees employees={employees} />,
	},
	{
		title: "Sent Email Reminders",
		dataIndex: "sentEmailReminders",
		key: "sentEmailReminders",
		render: reminder => <DisplayEmailReminder reminder={reminder} />,
	},
];

const format = "MM-DD-YYYY";

const stringifyQuery = query => qs.stringify(query, { skipNulls: true });

const parseQuery = query => {
	const queries = qs.parse(query, {
		ignoreQueryPrefix: true,
	});

	return {
		...queries,
		page: parseInt(queries.page || 1, 10),
	};
};

export class ViewEvents extends Component {
	state = {
		queries: parseQuery(this.props.location.search),
		queryString: this.props.location.search.replace(/[?]/g, ""),
	};

	componentDidUpdate = prevProps => {
		const { location } = this.props;
		if (location.search !== prevProps.location.search) {
			const queries = parseQuery(this.props.location.search);
			this.setState({
				queries,
				queryString: stringifyQuery(queries),
			});
		}
	};

	handleQueries = query => {
		const {
			location: { pathname, search },
		} = this.props;

		const currentQueries = qs.parse(search, {
			ignoreQueryPrefix: true,
		});

		const queryString = stringifyQuery({
			...currentQueries,
			...query,
			page: 1,
		});

		this.props.push(`${pathname}?${queryString}`);
	};

	render = () => {
		const {
			data,
			deleteEvent,
			fetchEvents,
			push,
			resendMail,
			...rest
		} = this.props;

		return (
			<Fragment>
				<Helmet title={title} />
				<Card
					title={
						<Fragment>
							<MdEventNote style={iconStyle} />
							<span css="vertical-align: middle;">{title}</span>
						</Fragment>
					}
				>
					<Flex>
						<FlexStart style={{ alignItems: "center" }}>
							<div>Event Dates:</div>
							<RangePicker
								format={format}
								onChange={value =>
									this.handleQueries({
										startDate: !isEmpty(value) ? value[0].format(format) : null,
										endDate: !isEmpty(value) ? value[1].format(format) : null,
									})
								}
								style={{ width: 500 }}
							/>
						</FlexStart>
						<FlexEnd>
							<Button
								primary
								width="180px"
								marginRight="0px"
								padding="5px 10px"
								style={{ marginBottom: 20 }}
								onClick={() => push("/employee/events/create")}
							>
								<FaCalendarPlus
									style={{ position: "relative", top: 1, fontSize: 16 }}
								/>
								&nbsp; Add Event
							</Button>
						</FlexEnd>
					</Flex>
					<Table
						{...this.state}
						{...rest}
						columns={columns}
						data={data}
						deleteAction={deleteEvent}
						fetchData={fetchEvents}
						push={push}
						editLocation="events"
						assignLocation="events"
						sendMail={resendMail}
					/>
				</Card>
			</Fragment>
		);
	};
}

ViewEvents.propTypes = {
	deleteEvent: PropTypes.func,
	fetchEvents: PropTypes.func.isRequired,
	push: PropTypes.func,
	data: PropTypes.arrayOf(
		PropTypes.shape({
			_id: PropTypes.string,
			team: PropTypes.string,
			opponent: PropTypes.string,
			eventType: PropTypes.string,
			location: PropTypes.string,
			callTimes: PropTypes.arrayOf(PropTypes.string),
			seasonId: PropTypes.string,
			eventDate: PropTypes.string,
			employeeResponses: PropTypes.arrayOf(
				PropTypes.shape({
					_id: PropTypes.string,
					response: PropTypes.string,
					notes: PropTypes.string,
				}),
			),
			scheduledIds: PropTypes.arrayOf(
				PropTypes.shape({
					_id: PropTypes.string,
					firstName: PropTypes.string,
					lastName: PropTypes.string,
				}),
			),
			schedule: PropTypes.number,
			sentEmailReminders: PropTypes.bool,
		}),
	),
	isLoading: PropTypes.bool.isRequired,
	location: PropTypes.shape({
		pathname: PropTypes.string,
		search: PropTypes.string,
	}),
	resendMail: PropTypes.func.isRequired,
	totalDocs: PropTypes.number,
};

const mapStateToProps = state => ({
	data: state.events.data,
	isLoading: state.events.isLoading,
	totalDocs: state.events.totalDocs,
});

const mapDispatchToProps = {
	deleteEvent,
	fetchEvents,
	push,
	resendMail,
};

export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(ViewEvents);
