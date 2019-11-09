import React, { Fragment, PureComponent } from "react";
import PropTypes from "prop-types";
import Helmet from "react-helmet";
import { connect } from "react-redux";
import { push } from "connected-react-router";
import { Card } from "antd";
import { MdEventNote } from "react-icons/md";
import {
	DisplayEmailReminder,
	DisplayScheduledEmployees,
	DisplayTime,
	DisplayTeam,
	FormatDate,
	Table,
} from "components/Body";
import { QueryHandler } from "components/Navigation";
import { deleteEvent, fetchEvents, resendMail } from "actions/Events";
import { fetchTeamNames } from "actions/Teams";
import Filters from "./Filters";

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

export class ViewEvents extends PureComponent {
	componentDidMount = () => {
		this.props.fetchTeamNames();
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
					<QueryHandler {...this.props}>
						{props => (
							<Fragment>
								<Filters {...props} {...this.props} />
								<Table
									{...props}
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
							</Fragment>
						)}
					</QueryHandler>
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
	fetchTeamNames: PropTypes.func.isRequired,
	location: PropTypes.shape({
		pathname: PropTypes.string,
		search: PropTypes.string,
	}),
	resendMail: PropTypes.func.isRequired,
	teams: PropTypes.arrayOf(PropTypes.string),
	totalDocs: PropTypes.number,
};

const mapStateToProps = state => ({
	data: state.events.data,
	isLoading: state.events.isLoading,
	totalDocs: state.events.totalDocs,
	teams: state.teams.data,
});

const mapDispatchToProps = {
	deleteEvent,
	fetchEvents,
	fetchTeamNames,
	push,
	resendMail,
};

export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(ViewEvents);
