import React from "react";
import {
	InfoText,
	List,
	ListItem,
	TextContainer,
	WarningText,
} from "components/Body";
import { Link } from "components/Navigation";

const linkStyle = {
	margin: 0,
	padding: 0,
};

const listItemStyle = {
	paddingLeft: 5,
	paddingTop: 20,
	paddingBototm: 20,
	fontSize: 15,
};

const SendingForms = () => (
	<TextContainer>
		<InfoText>
			On the <strong>20th</strong> of each month,{" "}
			<strong>2 months prior</strong> to month in question, an automated service
			will create events and an A/P form for you. On the 20th, an automated
			service will create events for the month that is 2 months before the
			current date; as well as, generate a 2 months from current date A/P form.
			The generated A/P form, by default, will automatically send email
			notifications on the <strong>1st of each prior month</strong>. By default,
			employees will have until the <strong>15th of each prior month</strong> to
			fill out their availabilty. This pattern will stay active for the duration
			of the season.
		</InfoText>
		<br />
		<br />
		<InfoText>Here&#39;s a breakdown example:</InfoText>
		<List>
			<ListItem style={listItemStyle}>
				- On October <strong>20th</strong>, events for the month of December
				will be created; as well as, an A/P form for December 1st - December
				31st.
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
		<br />
		<InfoText>
			If you need to include any additional events, you can go to the{" "}
			<Link blue style={linkStyle} to="/employee/events/create" target="_blank">
				Create Event
			</Link>{" "}
			page, create a new event, and that event will automatically be added to
			the A/P form.
		</InfoText>
		<WarningText>
			Be advised that this service is automated and only currently supports
			creating Sharks home games. The Barracuda home games will need to be
			manually created before the 1st of each prior month.
		</WarningText>
	</TextContainer>
);

export default SendingForms;
