import React from "react";
import { InfoText, TextContainer } from "components/Body";
import { Link } from "components/Navigation";

const linkStyle = {
	margin: 0,
	padding: 0,
};

const ViewMemberAuthorizations = () => (
	<TextContainer>
		<InfoText>
			To view all member authorizations (as well as their registration status),
			go to the{" "}
			<Link
				blue
				style={linkStyle}
				to="/employee/members/authorizations/viewall"
				target="_blank"
			>
				View Authorizations
			</Link>{" "}
			page.
		</InfoText>
	</TextContainer>
);

export default ViewMemberAuthorizations;
