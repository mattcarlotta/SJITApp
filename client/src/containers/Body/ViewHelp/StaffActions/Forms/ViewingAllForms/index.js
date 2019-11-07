import React from "react";
import { InfoText, TextContainer } from "components/Body";
import { Link } from "components/Navigation";

const linkStyle = {
	margin: 0,
	padding: 0,
};

const ViewingAllForms = () => (
	<TextContainer>
		<InfoText>
			To view all available forms (A/P forms), go to the{" "}
			<Link
				blue
				style={linkStyle}
				to="/employee/forms/viewall?page=1"
				target="_blank"
			>
				View Forms
			</Link>{" "}
			page.
		</InfoText>
	</TextContainer>
);

export default ViewingAllForms;
