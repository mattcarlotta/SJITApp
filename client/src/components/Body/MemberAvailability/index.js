/* eslint-disable react/jsx-boolean-value */
import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import isEmpty from "lodash/isEmpty";
import moment from "moment-timezone";
import { Empty } from "antd";
import { ResponsivePie } from "@nivo/pie";
import { ResponsiveBar } from "@nivo/bar";
import { Center, FlexCenter, ScheduleHeader } from "components/Body";

const COLORS = ["#247BA0", "#2A9D8F", "#F4A261", "#FF8060", "#BFBFBF"];

const styles = {
	position: "absolute",
	top: "-35px",
	left: "50px",
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

class MemberAvailability extends Component {
	state = {
		months: moment.monthsShort(),
		selectedMonth: moment().format("MMM"),
		selectedYear: parseInt(moment().format("YYYY"), 10),
		years: [
			...Array(11)
				.fill()
				.map(
					(_, key) =>
						parseInt(
							moment()
								.subtract(5, "year")
								.format("YYYY"),
							10,
						) + key,
				),
		],
	};

	handleSelection = ({ name, value }) => {
		this.setState({ [name]: value }, () => {
			this.props.fetchAction({
				id: this.props.id,
				selectedDate: moment(
					`${this.state.selectedMonth} ${this.state.selectedYear}`,
					"MMM YYYY",
				).format(),
			});
		});
	};

	render = () => {
		const { memberAvailability } = this.props;

		return (
			<Fragment>
				<ScheduleHeader
					{...this.state}
					id="0"
					onChange={null}
					handleSelection={this.handleSelection}
				/>
				{!isEmpty(memberAvailability) ? (
					<Fragment>
						<div css="height: 400px;width: 100%; max-width: 750px; margin-left: auto; margin-right: auto; margin-bottom: 30px;position: relative;">
							<ResponsivePie
								indexBy="id"
								colors={COLORS}
								data={memberAvailability.memberResponseCount}
								innerRadius={0.7}
								radialLabelsSkipAngle={10}
								radialLabelsTextXOffset={6}
								radialLabelsTextColor="#333333"
								radialLabelsLinkOffset={0}
								radialLabelsLinkDiagonalLength={16}
								radialLabelsLinkHorizontalLength={24}
								radialLabelsLinkStrokeWidth={1}
								radialLabelsLinkColor={{ from: "color" }}
								slicesLabelsSkipAngle={10}
								slicesLabelsTextColor="#fff"
								startAngle={-180}
								margin={{ top: 40, right: 0, bottom: 80, left: 50 }}
								legends={[
									{
										anchor: "bottom",
										direction: "row",
										translateY: 75,
										translateX: 0,
										itemWidth: 160,
										itemHeight: 28,
										itemTextColor: "#999",
										symbolSize: 18,
										symbolShape: "circle",
										effects: [
											{
												on: "hover",
												style: {
													itemTextColor: "#000",
												},
											},
										],
									},
								]}
							/>
							<div style={styles}>
								<span>{memberAvailability.eventAvailability[0].value}%</span>
								<span>Availability</span>
							</div>
							<Center
								style={{
									color: "rgb(187, 187, 187)",
									fontSize: 16,
									marginTop: 15,
									fontFamily: "sans-serif",
								}}
							>
								Responses
							</Center>
						</div>
						<div css="height: 450px;width: 100%; max-width: 500px; margin: 0 auto;">
							<ResponsiveBar
								borderColor={{ from: "color", modifiers: [["darker", 0.2]] }}
								colors={["#247BA0", "#2A9D8F"]}
								colorBy="index"
								indexBy="id"
								keys={["events"]}
								animate={true}
								motionStiffness={180}
								motionDamping={13}
								labelTextColor="#fefefe"
								data={memberAvailability.memberScheduleEvents}
								margin={{ top: 60, right: 60, left: 60, bottom: 60 }}
								axisBottom={{
									legend: "Events",
									legendPosition: "middle",
									legendOffset: 50,
								}}
								theme={{
									axis: {
										legend: {
											text: {
												fill: "#bbb",
												fontSize: 16,
											},
										},
										ticks: {
											text: {
												fill: "#888",
												fontSize: 16,
											},
										},
									},
									grid: {
										line: {
											stroke: "#d1d1d1",
											strokeWidth: 2,
											strokeDasharray: "4 4",
										},
									},
								}}
							/>
						</div>
					</Fragment>
				) : (
					<FlexCenter style={{ height: 880 }}>
						<Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
					</FlexCenter>
				)}
			</Fragment>
		);
	};
}

MemberAvailability.propTypes = {
	id: PropTypes.string,
	fetchAction: PropTypes.func.isRequired,
	memberAvailability: PropTypes.shape({
		eventAvailability: PropTypes.arrayOf(
			PropTypes.shape({
				id: PropTypes.string,
				label: PropTypes.string,
				value: PropTypes.number,
			}),
		),
		memberScheduleEvents: PropTypes.arrayOf(
			PropTypes.shape({
				id: PropTypes.string,
				events: PropTypes.number,
			}),
		),
		memberResponseCount: PropTypes.arrayOf(
			PropTypes.shape({
				id: PropTypes.string,
				color: PropTypes.string,
				label: PropTypes.string,
				value: PropTypes.number,
			}),
		),
	}),
};

export default MemberAvailability;
