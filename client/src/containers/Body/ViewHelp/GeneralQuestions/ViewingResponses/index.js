import React from "react";
import { InfoText, TextContainer } from "components/Body";
import { Link } from "components/Navigation";

const linkStyle = {
	margin: 0,
	padding: 0,
};

const ViewingResponses = () => (
	<TextContainer>
		<InfoText>
			To view your month to month A/P form responses, go to the
		</InfoText>
		&nbsp;
		<Link blue style={linkStyle} to="/employee/settings">
			Settings
		</Link>
		&nbsp;
		<InfoText>
			page and click on the <strong>Responses</strong> tab. You can change the
			month and year to reflect which month and year you&#39;d wish to view. If
			you&#39;ve filled out the A/P form for the selected month, a series of
			games will be rendered within the calendar. If you wish to see what your
			responses was for a particular game, simply click the game to display the
			its details, as well as your response.
		</InfoText>
	</TextContainer>
);

export default ViewingResponses;
