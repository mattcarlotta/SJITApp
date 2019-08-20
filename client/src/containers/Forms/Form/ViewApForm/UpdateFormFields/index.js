import React, { Fragment } from "react";
import { DisplayFullDate, DisplayTeam } from "components/Body";

export default (result, field, events) => {
	switch (field.type) {
		case "radiogroup": {
			const initializedFields = events.map(event => {
				const { _id, team, opponent, eventDate, eventType, notes } = event;
				return {
					...field,
					name: _id,
					label: (
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
					),
					disabled: false,
					notes,
					selectOptions: [
						"I want to work.",
						"Available to work.",
						"Prefer not to work.",
						"Not available to work.",
					],
				};
			});
			return [...result, ...initializedFields];
		}
		default: {
			return [...result, { ...field, disabled: false }];
		}
	}
};
