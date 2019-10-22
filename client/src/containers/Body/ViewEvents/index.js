import React, { Fragment } from "react";
import PropTypes from "prop-types";
import Helmet from "react-helmet";
import { connect } from "react-redux";
import { push } from "connected-react-router";
import { Card } from "antd";
import { MdEventNote } from "react-icons/md";
import {
	Button,
	DisplayEmailReminder,
	DisplayTime,
	DisplayTeam,
	FlexEnd,
	FormatDate,
	Table,
} from "components/Body";
import { deleteEvent, fetchEvents, resendMail } from "actions/Events";

const title = "View Events";

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
	},
	{
		title: "Scheduled Employees",
		dataIndex: "schedule",
		key: "schedule",
	},
	{
		title: "Sent Email Reminders",
		dataIndex: "sentEmailReminders",
		key: "sentEmailReminders",
		render: reminder => <DisplayEmailReminder reminder={reminder} />,
	},
];

export const ViewEvents = ({
	data,
	deleteEvent,
	fetchEvents,
	push,
	resendMail,
}) => (
	<Fragment>
		<Helmet title={title} />
		<Card title={title}>
			<FlexEnd>
				<Button
					primary
					width="180px"
					marginRight="0px"
					padding="5px 10px"
					style={{ marginBottom: 20 }}
					onClick={() => push("/employee/events/create")}
				>
					<MdEventNote style={{ position: "relative", top: 4 }} />
					&nbsp; Add Event
				</Button>
			</FlexEnd>
			<Table
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
			employeeResponses: PropTypes.number,
			schedule: PropTypes.number,
			sentEmailReminders: PropTypes.bool,
		}),
	),
	resendMail: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
	data: state.events.data,
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
