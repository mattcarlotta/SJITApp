import React from "react";
import PropTypes from "prop-types";
import { Tooltip } from "antd";

const displayList = emails =>
	emails.length > 1 ? "multiple email addresses" : emails[0];

const showFullList = emails =>
	emails.map(user => (
		<p key={user} style={{ margin: 0, padding: 0 }}>
			&#183; {user}
		</p>
	));

const DisplaySendToList = ({ emails }) => (
	<Tooltip
		arrowPointAtCenter
		title={() => showFullList(emails)}
		placement="top"
	>
		{displayList(emails)}
	</Tooltip>
);

DisplaySendToList.propTypes = {
	emails: PropTypes.arrayOf(PropTypes.string),
};

export default DisplaySendToList;
