import React, { Fragment } from "react";
import PropTypes from "prop-types";
import Helmet from "react-helmet";
import { connect } from "react-redux";
import { push } from "connected-react-router";
import { Card } from "antd";
import { FaUserPlus } from "react-icons/fa";
import {
	Button,
	DisplayTime,
	DisplayTeam,
	FlexEnd,
	FormatDate,
	Table,
} from "components/Body";
import { deleteEvent, fetchEvents } from "actions/Events";

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
		width: 200,
		render: date => (
			<FormatDate
				style={{ wordWrap: "break-word", wordBreak: "break-word" }}
				format="MMM Do @ h:mm a"
				date={date}
			/>
		),
	},
	{
		title: "Call Times",
		dataIndex: "callTimes",
		key: "callTimes",
		width: 120,
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
];

export const ViewEvents = ({ data, deleteEvent, fetchEvents, push }) => (
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
					<FaUserPlus style={{ position: "relative", top: 2 }} />
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
		}),
	),
};

const mapStateToProps = state => ({
	data: state.events.data,
});

const mapDispatchToProps = {
	deleteEvent,
	fetchEvents,
	push,
};

export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(ViewEvents);
