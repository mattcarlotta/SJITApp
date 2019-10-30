/* eslint-disable react/jsx-boolean-value */
import React from "react";
import PropTypes from "prop-types";
import isEmpty from "lodash/isEmpty";
import { ResponsivePie } from "@nivo/pie";
import { NoAvailability } from "components/Body";

const COLORS = ["#2979FF", "#BBBBBB"];
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
		<NoAvailability />
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
