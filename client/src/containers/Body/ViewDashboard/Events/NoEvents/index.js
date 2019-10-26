import React from "react";
import PropTypes from "prop-types";
import { MdEvent } from "react-icons/md";

const NoEvents = ({ selectedToday }) => (
	<div css="text-align: center; color: #909090;">
		<p css="margin: 10px 0 0 0;padding: 0;">
			<MdEvent style={{ fontSize: 70 }} />
		</p>
		<p css="margin: 0;padding: 0;">
			{!selectedToday ? "No upcoming events" : "No events today"}
		</p>
	</div>
);

NoEvents.propTypes = {
	selectedToday: PropTypes.bool.isRequired,
};

export default NoEvents;
