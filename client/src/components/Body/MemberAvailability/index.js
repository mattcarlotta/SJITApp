import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import moment from "moment";
import { Cell, Legend, Pie, PieChart } from "recharts";
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
			// TODO -- AJAX call to retrieve next availability
			// this.props.fetchMemberAvailiabilty(moment(
			// `${this.state.selectedMonth} ${this.state.selectedYear}`,
			// "MMM YYYY",
			// ).format(),)
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
		const needLabel = memberAvailability.memberResponseCount[index].value > 0;

		return needLabel ? (
			<text
				x={x}
				y={y}
				fill="white"
				textAnchor={x > cx ? "start" : "end"}
				dominantBaseline="central"
			>
				{`${(percent * 100).toFixed(0)}%`}
			</text>
		) : null;
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
				<PieChart width={450} height={400}>
					<Legend verticalAlign="middle" content={this.renderLegend} />
					<Pie
						data={memberAvailability.memberResponseCount}
						cx={300}
						cy={200}
						dataKey="value"
						nameKey="name"
						labelLine={false}
						label={this.renderCustomizedLabel}
						outerRadius={100}
					>
						{memberAvailability.memberResponseCount.map(({ name }, index) => (
							<Cell key={name} fill={COLORS[index % COLORS.length]} />
						))}
					</Pie>
				</PieChart>
			</Fragment>
		);
	};
}

MemberAvailability.propTypes = {
	memberAvailability: PropTypes.shape({
		events: PropTypes.number,
		memberResponseCount: PropTypes.arrayOf(
			PropTypes.shape({
				name: PropTypes.string,
				value: PropTypes.number,
			}),
		),
		availability: PropTypes.number,
	}),
};

export default MemberAvailability;
