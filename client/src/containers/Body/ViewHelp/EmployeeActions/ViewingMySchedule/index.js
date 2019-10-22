import React from "react";
import { FaCalendarCheck, FaClock } from "react-icons/fa";
import { InfoText, TextContainer } from "components/Body";
import { Link } from "components/Navigation";

const iconStyle = {
	position: "relative",
	top: 2,
};

const linkStyle = {
	margin: 0,
	padding: 0,
};

const ViewingMySchedule = () => (
	<TextContainer>
		<InfoText>To view your month to month schedule, go to the</InfoText>
		&nbsp;
		<Link blue style={linkStyle} to="/employee/schedule">
			Schedule
		</Link>
		&nbsp;
		<InfoText>
			page and change the selected <strong>All Games</strong> option to the{" "}
			<strong>My Games</strong> option. Optionally, you can also select a{" "}
			<strong>Month</strong> and <strong>Year</strong> to filter the calendar.
			If you&#39;ve been scheduled to work a game within the selected month and
			year, then you&#39;ll see a game button rendered within a calendar date.
			Click on the game button to view its details. Underneath one of the{" "}
			<strong>Scheduled Employees</strong> call times(
			<FaClock style={iconStyle} />
			), you&#39;ll see your name{" "}
			<strong
				style={{
					backgroundColor: "#006d75",
					color: "#fff",
					padding: "5px",
				}}
			>
				<FaCalendarCheck style={iconStyle} /> <span>highlighted</span>
			</strong>{" "}
			to delineate which call time you&#39;ve been assigned to.
		</InfoText>
	</TextContainer>
);

export default ViewingMySchedule;
