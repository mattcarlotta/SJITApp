import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import Helmet from "react-helmet";
import isEmpty from "lodash/isEmpty";
import moment from "moment";
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

	static getDerivedStateFromProps({ location }) {
		const queries = parseQuery(location.search);
		return {
			queries,
			queryString: stringifyQuery(queries),
		};
	}

	getCurrentQueries = (query, page) => {
		const {
			location: { pathname, search },
		} = this.props;

		const currentQueries = qs.parse(search, {
			ignoreQueryPrefix: true,
		});

		const queryString = stringifyQuery({
			...currentQueries,
			...query,
			page,
		});

		return { queryString, pathname };
	};

	handleQueries = query => {
		const { queryString, pathname } = this.getCurrentQueries(query, 1);

		this.props.push(`${pathname}?${queryString}`);
	};

	handlePageChange = ({ current: page }) => {
		const { queryString, pathname } = this.getCurrentQueries({}, page);

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

		const { queries } = this.state;

		const startDate = queries.startDate
			? moment(queries.startDate, format)
			: null;
		const endDate = queries.endDate ? moment(queries.endDate, format) : null;

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
							&nbsp;
							<RangePicker
								className="dashboard-range-picker"
								value={[startDate, endDate]}
								format={format}
								onChange={value =>
									this.handleQueries({
										startDate: !isEmpty(value) ? value[0].format(format) : null,
										endDate: !isEmpty(value) ? value[1].format(format) : null,
									})
								}
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
						handlePageChange={this.handlePageChange}
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
