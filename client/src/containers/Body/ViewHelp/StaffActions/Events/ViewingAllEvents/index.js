import React from "react";
import { InfoText, TextContainer } from "components/Body";
import { Link } from "components/Navigation";

const linkStyle = {
	margin: 0,
	padding: 0,
};

const ViewingAllEvents = () => (
	<TextContainer>
		<InfoText>
			To view all available events (games, promotionals, or misc.), go to the{" "}
			<Link
				blue
				style={linkStyle}
				to="/employee/events/viewall"
				target="_blank"
			>
				View Events
			</Link>{" "}
			page.
		</InfoText>
	</TextContainer>
);

export default ViewingAllEvents;
