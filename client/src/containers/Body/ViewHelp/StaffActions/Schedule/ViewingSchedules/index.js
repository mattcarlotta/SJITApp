import React from "react";
import { InfoText, TextContainer } from "components/Body";
import { Link } from "components/Navigation";

const linkStyle = {
	margin: 0,
	padding: 0,
};

const ViewingSchedule = () => (
	<TextContainer>
		<InfoText>
			To view the schedule, go to the{" "}
			<Link blue style={linkStyle} to="/employee/schedule" target="_blank">
				Schedule
			</Link>{" "}
			page. By default, this will display the current month and years schedule;
			however, you can change the calendar dates to update the schedule
			according to the <strong>Month</strong> and <strong>Year</strong> that has
			been selected.
		</InfoText>
	</TextContainer>
);

export default ViewingSchedule;
