import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import isEmpty from "lodash/isEmpty";
import moment from "moment";
import { Empty } from "antd";
import {
	Bar,
	BarChart,
	CartesianGrid,
	Cell,
	Legend,
	Pie,
	PieChart,
	XAxis,
	YAxis,
} from "recharts";
import { Badge, ScheduleHeader } from "components/Body";

const COLORS = ["#247BA0", "#2A9D8F", "#F4A261", "#FF8060", "#BFBFBF"];

const RADIAN = Math.PI / 180;

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

	renderLegend = () => {
		const { memberAvailability } = this.props;

		return memberAvailability.memberResponseCount.map(({ name }) => (
			<Badge key={name} response={name} style={{ fontSize: 17 }}>
				{name}
			</Badge>
		));
	};

	renderCustomizedLabel = ({
		cx,
		cy,
		midAngle,
		innerRadius,
		outerRadius,
		percent,
		index,
	}) => {
		const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
		const x = cx + radius * Math.cos(-midAngle * RADIAN);
		const y = cy + radius * Math.sin(-midAngle * RADIAN);
		const { memberAvailability } = this.props;
		const needsLabel = memberAvailability.memberResponseCount[index].value > 0;

		return needsLabel ? (
			<text
				x={x}
				y={y}
				fill="white"
				textAnchor="middle"
				dominantBaseline="central"
			>
				{`${(percent * 100).toFixed(0)}%`}
			</text>
		) : null;
	};

	renderCustomXAxis = ({ x, y, payload }) => (
		<g transform={`translate(${x},${y})`}>
			<text x={0} y={0} dy={16} textAnchor="middle" fill="#666">
				{payload.value}
			</text>
		</g>
	);

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

				{!isEmpty(memberAvailability.memberResponseCount) ? (
					<div
						css={`
							display: flex;
							align-items: center;
							justify-content: center;
							margin-top: 30px;
						`}
					>
						<div
							css={`
								width: 200px;
							`}
						>
							{memberAvailability.memberResponseCount.map(({ name }) => (
								<Badge key={name} response={name} style={{ fontSize: 17 }}>
									{name}
								</Badge>
							))}
						</div>
						<PieChart width={300} height={300}>
							<Pie
								data={memberAvailability.memberResponseCount}
								cx="50%"
								cy="50%"
								dataKey="value"
								nameKey="name"
								labelLine={false}
								label={this.renderCustomizedLabel}
								innerRadius={65}
								startAngle={180}
								endAngle={-180}
							>
								{memberAvailability.memberResponseCount.map(
									({ name }, index) => (
										<Cell key={name} fill={COLORS[index]} />
									),
								)}
							</Pie>
						</PieChart>
						<BarChart
							width={500}
							height={300}
							dataKey="value"
							nameKey="name"
							data={memberAvailability.memberScheduleEvents}
							margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
						>
							<CartesianGrid strokeDasharray="3 3" />
							<XAxis dataKey="name" height={60} tick={this.renderCustomXAxis} />
							<YAxis allowDecimals={false} />
							<Legend layout="vertical" verticalAlign="middle" align="left" />
							<Bar dataKey="Scheduled" fill="#247BA0" />
							<Bar dataKey="Available" fill="#2A9D8F" />
						</BarChart>
					</div>
				) : (
					<Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
				)}
			</Fragment>
		);
	};
}

MemberAvailability.propTypes = {
	id: PropTypes.string,
	fetchAction: PropTypes.func.isRequired,
	memberAvailability: PropTypes.shape({
		memberScheduleEvents: PropTypes.arrayOf(
			PropTypes.shape({
				name: PropTypes.string,
				Scheduled: PropTypes.number,
				Available: PropTypes.number,
			}),
		),
		memberResponseCount: PropTypes.arrayOf(
			PropTypes.shape({
				name: PropTypes.string,
				value: PropTypes.number,
			}),
		),
	}),
};

export default MemberAvailability;
