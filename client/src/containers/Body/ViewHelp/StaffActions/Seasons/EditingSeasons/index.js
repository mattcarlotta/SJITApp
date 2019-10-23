import React from "react";
import { FaEdit } from "react-icons/fa";
import { Button, InfoText, TextContainer, WarningText } from "components/Body";
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

const EditingSeasons = () => (
	<TextContainer>
		<InfoText>
			To edit a season, go to the{" "}
			<Link
				blue
				style={linkStyle}
				to="/employee/seasons/viewall"
				target="_blank"
			>
				View Seasons
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
			<FaEdit style={iconStyle} />
		</Button>
		&nbsp;
		<InfoText>
			(edit) buttons located under the <strong>Table Actions</strong> column.
			Edit the <strong>Season Duration</strong> field and click the
		</InfoText>
		&nbsp;
		<Button
			primary
			width="150px"
			padding="0px"
			marginRight="0px"
			style={btnStyle}
			onClick={null}
		>
			Update Season
		</Button>
		&nbsp;
		<InfoText>button to save your changes.</InfoText>
		<WarningText>
			Be advised that editing a season will update any events and forms that
			share its Season ID.
		</WarningText>
	</TextContainer>
);

export default EditingSeasons;
