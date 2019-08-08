import React, { Fragment } from "react";
import PropTypes from "prop-types";
import Helmet from "react-helmet";
import isEmpty from "lodash/isEmpty";
import { connect } from "react-redux";
import { push } from "connected-react-router";
import { Card } from "antd";
import { FaUserPlus } from "react-icons/fa";
import { Button, DisplayDate, FlexEnd, Table } from "components/Body";
import { fetchEvents } from "actions/Events";

const title = "View Events";

const columns = [
	{ title: "Season Id", dataIndex: "seasonId", key: "seasonId" },
	{ title: "League", dataIndex: "league", key: "league" },
	{ title: "Event Type", dataIndex: "eventType", key: "eventType" },
	{ title: "Location", dataIndex: "location", key: "location" },
	{ title: "Uniform", dataIndex: "uniform", key: "uniform" },
	{
		title: "Notes",
		dataIndex: "notes",
		key: "notes",
		render: notes => (notes ? <span>{notes}</span> : "-"),
	},
	{
		title: "Start Date",
		dataIndex: "startDate",
		key: "startDate",
		render: date => <DisplayDate date={date} />,
	},
	{
		title: "End Date",
		dataIndex: "endDate",
		key: "endDate",
		render: date => <DisplayDate date={date} />,
	},
	{
		title: "Call Times",
		dataIndex: "callTimes",
		key: "callTimes",
		width: 200,
		render: times =>
			!isEmpty(times)
				? times.map((time, key) => (
						<div
							key={key}
							style={{ wordWrap: "break-word", wordBreak: "break-all" }}
						>
							{time}
						</div>
				  ))
				: "(not assigned)",
	},
	{
		title: "Employee Responses",
		dataIndex: "employeeResponses",
		key: "employeeResponses",
	},
	{
		title: "Scheduled Employees",
		dataIndex: "scheduledEmployees",
		key: "scheduledEmployees",
	},
];

export const ViewEvents = ({
	// deleteToken,
	data,
	fetchEvents,
	isLoading,
	push,
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
					<FaUserPlus style={{ position: "relative", top: 2 }} />
					&nbsp; Add Event
				</Button>
			</FlexEnd>
			<Table
				columns={columns}
				data={data}
				// deleteAction={deleteToken}
				fetchData={fetchEvents}
				isLoading={isLoading}
				push={push}
				editLocation="event/edit"
			/>
		</Card>
	</Fragment>
);

ViewEvents.propTypes = {
	// deleteToken: PropTypes.func,
	fetchEvents: PropTypes.func.isRequired,
	isLoading: PropTypes.bool.isRequired,
	push: PropTypes.func,
	data: PropTypes.arrayOf(
		PropTypes.shape({
			_id: PropTypes.string,
			league: PropTypes.string,
			eventType: PropTypes.string,
			location: PropTypes.string,
			callTimes: PropTypes.arrayOf(PropTypes.string),
			uniform: PropTypes.string,
			seasonId: PropTypes.string,
			startDate: PropTypes.string,
			endDate: PropTypes.string,
			notes: PropTypes.string,
			employeeResponses: PropTypes.number,
			scheduledEmployees: PropTypes.number,
		}),
	),
};

const mapStateToProps = state => ({
	data: state.events.data,
	isLoading: state.events.isLoading,
});

const mapDispatchToProps = {
	// deleteToken,
	fetchEvents,
	push,
};

export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(ViewEvents);
