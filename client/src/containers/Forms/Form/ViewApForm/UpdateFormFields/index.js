import React, { Fragment } from "react";
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

export default (result, field, events, eventResponses) => {
	switch (field.type) {
		case "radiogroup": {
			const initializedFields = events.map((event, key) => {
				const { _id, team, opponent, eventDate, eventType, notes } = event;
				const response = get(eventResponses[key], ["response"]);

				return {
					...field,
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
			});

			return [...result, ...initializedFields];
		}
		default: {
			const eventNotes = get(eventResponses[0], ["notes"]);
			return [
				...result,
				{
					...field,
					value: eventNotes || "",
					disabled: false,
				},
			];
		}
	}
};
