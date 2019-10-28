/* eslint-disable react/jsx-boolean-value */
import React from "react";
import PropTypes from "prop-types";
import isEmpty from "lodash/isEmpty";
import { ResponsivePie } from "@nivo/pie";
import { MdAccessTime } from "react-icons/md";
import { CalendarContainer, FlexCenter } from "components/Body";

const COLORS = ["#58AFFF", "#BBB"];
const styles = {
	position: "absolute",
	top: 0,
	left: 0,
	right: 0,
	bottom: 0,
	display: "flex",
	flexDirection: "column",
	alignItems: "center",
	justifyContent: "center",
	fontSize: 16,
	color: "#025f6d",
	textAlign: "center",
	pointerEvents: "none",
};

const MemberAvailabilityAverage = ({ eventAvailability }) =>
	!isEmpty(eventAvailability) ? (
		<div css="height: 250px;width: 250px; margin-left: auto; margin-right: auto; position: relative;">
			<ResponsivePie
				indexBy="id"
				colors={COLORS}
				data={eventAvailability}
				innerRadius={0.8}
				startAngle={360}
				endAngle={0}
				enableRadialLabels={false}
				enableSlicesLabels={false}
				tooltipFormat={value => `${value}%`}
				animate={true}
				motionStiffness={90}
				motionDamping={15}
			/>
			<div style={styles}>
				<span>{eventAvailability[0].value}%</span>
				<span>Availability</span>
			</div>
		</div>
	) : (
		<CalendarContainer>
			<FlexCenter
				style={{
					backgroundColor: "#f7f6f6",
					color: "#909090",
					flexDirection: "column",
				}}
			>
				<p css="margin: 60px 0 0 0;padding: 0;">
					<MdAccessTime style={{ fontSize: 70 }} />
				</p>
				<p css="margin: 0;padding: 0;">No availability this month</p>
			</FlexCenter>
		</CalendarContainer>
	);

MemberAvailabilityAverage.propTypes = {
	eventAvailability: PropTypes.arrayOf(
		PropTypes.shape({
			id: PropTypes.string,
			label: PropTypes.string,
			value: PropTypes.number,
			color: PropTypes.string,
		}),
	),
};

export default MemberAvailabilityAverage;
/* eslint-enable react/jsx-boolean-value */
