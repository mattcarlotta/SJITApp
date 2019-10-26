import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import moment from "moment";
import { connect } from "react-redux";
import { Card, Col, DatePicker } from "antd";
import { FaChartBar } from "react-icons/fa";
import { fetchEventDistribution } from "actions/Dashboard";
import { FadeIn, LoadingPanel, MemberEventCountChart } from "components/Body";
import columns from "../Columns";

const { RangePicker } = DatePicker;

const newcolumns = {
	...columns,
	xl: 24,
	xxl: 24,
};

const iconStyle = {
	verticalAlign: "middle",
	marginRight: 10,
	fontSize: 22,
};

const format = "MM/DD/YYYY";

class EventDistribution extends Component {
	state = {
		startDate: moment().startOf("month"),
		endDate: moment().endOf("month"),
	};

	componentDidMount = () => {
		const { startDate, endDate } = this.state;
		this.props.fetchEventDistribution({
			startDate: startDate.format(format),
			endDate: endDate.format(format),
		});
	};

	handleSelection = dates => {
		const [startDate, endDate] = dates;
		this.setState({ startDate, endDate }, () =>
			this.props.fetchEventDistribution({
				startDate: startDate.format(format),
				endDate: endDate.format(format),
			}),
		);
	};

	render = () => (
		<Col {...newcolumns}>
			<Card
				bodyStyle={{ minHeight: "500px" }}
				title={
					<Fragment>
						<FaChartBar style={iconStyle} />
						<span css="vertical-align: middle;">Event Distribution</span>
					</Fragment>
				}
				extra={
					<RangePicker
						allowClear={false}
						format="MM/DD/YYYY"
						className="dashboard-range-picker"
						value={[this.state.startDate, this.state.endDate]}
						onChange={this.handleSelection}
					/>
				}
			>
				{this.props.isLoading ? (
					<LoadingPanel height="650px" />
				) : (
					<FadeIn>
						<MemberEventCountChart {...this.props} />
					</FadeIn>
				)}
			</Card>
		</Col>
	);
}

EventDistribution.propTypes = {
	members: PropTypes.arrayOf(
		PropTypes.shape({
			name: PropTypes.string,
			"Event Count": PropTypes.number,
		}),
	),
	fetchEventDistribution: PropTypes.func.isRequired,
	isLoading: PropTypes.bool.isRequired,
};

const mapStateToProps = state => ({
	members: state.dashboard.eventCounts.data,
	isLoading: state.dashboard.eventCounts.isLoading,
	loggedinUserId: state.auth.id,
});

const mapDispatchToProps = {
	fetchEventDistribution,
};

export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(EventDistribution);
