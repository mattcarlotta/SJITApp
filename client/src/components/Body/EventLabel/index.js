import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { FormatDate, DisplayTeam } from "components/Body";

const EventLabel = ({ eventType, eventDate, opponent, style, team }) => (
	<span style={style}>
		<div css="padding: 5px 0;">
			<DisplayTeam folder="lowres" team={team} />{" "}
			{opponent && (
				<Fragment>
					<span style={{ margin: "0 5px" }}>vs.</span>
					<DisplayTeam folder="lowres" team={opponent} />
					&nbsp;
				</Fragment>
			)}
			({eventType})
		</div>
		<div css="padding: 5px 0;">
			<FormatDate
				style={{ display: "inline" }}
				format="MMMM Do @ h:mm a"
				date={eventDate}
			/>
		</div>
	</span>
);

EventLabel.propTypes = {
	eventDate: PropTypes.string,
	eventType: PropTypes.string,
	opponent: PropTypes.string,
	style: PropTypes.objectOf(
		PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	),
	team: PropTypes.string,
};

export default EventLabel;
