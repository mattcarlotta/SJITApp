import React from "react";
import PropTypes from "prop-types";
import { MdEvent } from "react-icons/md";
import { FlexCenter } from "components/Body";

const NoEvents = ({ selectedToday }) => (
	<FlexCenter
		style={{ color: "#909090", flexDirection: "column", marginTop: 5 }}
	>
		<p css="margin: 0;padding: 0;">
			<MdEvent style={{ fontSize: 70 }} />
		</p>
		<p css="margin: 0;padding: 0;">
			{!selectedToday ? "No upcoming events" : "No events today"}
		</p>
	</FlexCenter>
);

NoEvents.propTypes = {
	selectedToday: PropTypes.bool.isRequired,
};

export default NoEvents;
