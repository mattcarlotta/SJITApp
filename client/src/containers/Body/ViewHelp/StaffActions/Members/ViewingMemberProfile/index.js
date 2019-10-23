import React from "react";
import { FaSearchPlus } from "react-icons/fa";
import { Button, InfoText, TextContainer } from "components/Body";
import { Link } from "components/Navigation";

const iconStyle = {
	position: "relative",
	top: 2,
};

const linkStyle = {
	margin: 0,
	padding: 0,
};

const btnStyle = {
	display: "inline-block",
};

const ViewingMemberProfile = () => (
	<TextContainer>
		<InfoText>
			To view a member&#39;s profile, go to the{" "}
			<Link
				blue
				style={linkStyle}
				to="/employee/members/viewall"
				target="_blank"
			>
				View Members
			</Link>{" "}
			page and click on one of the
		</InfoText>
		&nbsp;
		<Button
			primary
			width="50px"
			padding="0px"
			marginRight="0px"
			style={btnStyle}
			onClick={null}
		>
			<FaSearchPlus style={iconStyle} />
		</Button>
		&nbsp;
		<InfoText>
			(view) buttons located under the <strong>Table Actions</strong> column.
			Here you&#39;ll have access to their <strong>Profile</strong>,{" "}
			<strong>Availabilty</strong>, <strong>Responses</strong>, and{" "}
			<strong>Schedule</strong>.
		</InfoText>
	</TextContainer>
);

export default ViewingMemberProfile;
