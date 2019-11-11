import React from "react";
import {
	DisplayEmailReminder,
	DisplayScheduledEmployees,
	DisplayTime,
	DisplayTeam,
	FormatDate,
} from "components/Body";

export default [
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
