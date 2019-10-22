import React from "react";
import {
	InfoText,
	List,
	ListItem,
	TextContainer,
	WarningText,
} from "components/Body";

const listItemStyle = {
	paddingLeft: 5,
	paddingTop: 20,
	paddingBototm: 20,
	fontSize: 15,
};

const AutomatedServices = () => (
	<TextContainer>
		<InfoText>
			The three services that have been automated are:{" "}
			<strong>creating Sharks home games</strong>,{" "}
			<strong>creating monthly A/P forms</strong>, and{" "}
			<strong>creating monthly schedules</strong>. Unfortunately, Barracuda home
			games do have a consumable API (access program interface) available to the
			public, so they&#39;ll need to be manually created before the A/P form is
			sent out.
		</InfoText>
		<br />
		<br />
		<InfoText>Here&#39;s a breakdown of the automated services:</InfoText>
		<List>
			<ListItem style={listItemStyle}>
				- On October <strong>20th</strong>, Sharks home games for the month of
				December will be created; as well as, an A/P form for December 1st -
				December 31st.
			</ListItem>
			<ListItem style={listItemStyle}>
				- On October <strong>26th</strong>, schedules for the month of November
				will be emailed to all active members.
			</ListItem>
			<ListItem style={listItemStyle}>
				- On November <strong>1st</strong>, the December A/P form will be
				emailed to all active members.
			</ListItem>
			<ListItem style={listItemStyle}>
				- On November <strong>15th</strong>, the December A/P form will expire
				and availability responses will no longer be accepted.
			</ListItem>
		</List>
		<WarningText>
			Be advised that these services are automated and expect: The schedule to
			completed by the 25th of each month -- missing this deadline may result in
			missing/incomplete schedules being emailed. And, currently only supports
			creating Sharks home games -- Barracuda home games will need to be
			manually created before the 1st of each prior month.
		</WarningText>
	</TextContainer>
);

export default AutomatedServices;
