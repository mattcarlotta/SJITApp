import React from "react";
import { MdAccessTime } from "react-icons/md";
import { CalendarContainer, FlexCenter } from "components/Body";

const style = {
	backgroundColor: "#f7f6f6",
	color: "#909090",
	flexDirection: "column",
};

const NoAvailability = () => (
	<CalendarContainer>
		<FlexCenter style={style}>
			<p css="margin: 60px 0 0 0;padding: 0;">
				<MdAccessTime style={{ fontSize: 70 }} />
			</p>
			<p css="margin: 0;padding: 0;">No availability this month</p>
		</FlexCenter>
	</CalendarContainer>
);

export default NoAvailability;
