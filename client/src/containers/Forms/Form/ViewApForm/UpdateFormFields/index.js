import React, { Fragment } from "react";
import PropTypes from "prop-types";
import get from "lodash/get";
import { DisplayFullDate, DisplayTeam } from "components/Body";

export const Label = ({ eventType, eventDate, opponent, team }) => (
	<Fragment>
		<DisplayFullDate date={eventDate} /> -{" "}
		<DisplayTeam folder="lowres" team={team} />{" "}
		{opponent && (
			<Fragment>
				<span style={{ margin: "0 5px" }}>vs.</span>
				<DisplayTeam folder="lowres" team={opponent} />
				&nbsp;
			</Fragment>
		)}
		({eventType})
	</Fragment>
);

Label.propTypes = {
	team: PropTypes.string,
	opponent: PropTypes.string,
	eventType: PropTypes.string,
	eventDate: PropTypes.string,
};

export default (result, field, events, eventResponses) => {
	const initializedFields = events.reduce((acc, event, key) => {
		const { _id, team, opponent, eventDate, eventType, notes } = event;
		const response = get(eventResponses[key], ["response"]);
		const eventNotes = get(eventResponses[key], ["notes"]);

		const radioFields = {
			...field,
			id: _id,
			name: _id,
			label: (
				<Label
					eventType={eventType}
					eventDate={eventDate}
					opponent={opponent}
					team={team}
				/>
			),
			disabled: false,
			value: response || "",
			updateEvent: !!response,
			notes,
		};

		const noteFields = {
			id: _id,
			name: `${_id}-notes`,
			type: "textarea",
			value: eventNotes || "",
			errors: "",
			placeholder:
				"(Optional) Include any special notes for the above event...",
			required: false,
			disabled: false,
			width: "350px",
			rows: 3,
		};

		return [...acc, radioFields, noteFields];
	}, []);

	return [...result, ...initializedFields];
};
