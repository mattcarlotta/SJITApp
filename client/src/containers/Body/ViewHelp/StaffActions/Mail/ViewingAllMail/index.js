import React from "react";
import { InfoText, TextContainer } from "components/Body";
import { Link } from "components/Navigation";

const linkStyle = {
	margin: 0,
	padding: 0,
};

const ViewingAllMail = () => (
	<TextContainer>
		<InfoText>
			To view all available mail, go to the{" "}
			<Link blue style={linkStyle} to="/employee/mail/viewall" target="_blank">
				View Mail
			</Link>{" "}
			page.
		</InfoText>
	</TextContainer>
);

export default ViewingAllMail;
