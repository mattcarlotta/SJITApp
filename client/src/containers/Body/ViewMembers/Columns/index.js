import React from "react";
import { DisplayStatus, FormatDate } from "components/Body";

export default [
	{
		title: "Account Status",
		dataIndex: "status",
		key: "status",
		render: status => <DisplayStatus status={status} />,
	},
	{ title: "First Name", dataIndex: "firstName", key: "firstName" },
	{ title: "Last Name", dataIndex: "lastName", key: "lastName" },
	{ title: "Role", dataIndex: "role", key: "role" },
	{ title: "Email", dataIndex: "email", key: "email" },
	{
		title: "Registered",
		dataIndex: "registered",
		key: "registered",
		render: date => <FormatDate format="MM/DD/YYYY @ hh:mm a" date={date} />,
	},
];
