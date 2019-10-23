import React from "react";
import { InfoText, TextContainer } from "components/Body";
import { Link } from "components/Navigation";

const linkStyle = {
	margin: 0,
	padding: 0,
};

const ViewingAllSeasons = () => (
	<TextContainer>
		<InfoText>
			To view all available seasons, go to the{" "}
			<Link
				blue
				style={linkStyle}
				to="/employee/seasons/viewall"
				target="_blank"
			>
				View Seasons
			</Link>{" "}
			page.
		</InfoText>
	</TextContainer>
);

export default ViewingAllSeasons;
