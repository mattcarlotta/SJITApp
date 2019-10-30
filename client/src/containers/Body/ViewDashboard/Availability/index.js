import React, { Fragment, PureComponent } from "react";
import PropTypes from "prop-types";
import moment from "moment";
import isEmpty from "lodash/isEmpty";
import { connect } from "react-redux";
import { Card, Col } from "antd";
import { FaUserClock } from "react-icons/fa";
import { LoadingPanel, MemberAvailabilityAverage } from "components/Body";
import { fetchAvailability } from "actions/Dashboard";
import columns from "../Columns";

const iconStyle = {
	verticalAlign: "middle",
	marginRight: 10,
	fontSize: 22,
};

const format = "MM/DD/YYYY";

class Availability extends PureComponent {
	componentDidMount = () => {
		this.props.fetchAvailability();
	};

	render = () => {
		const { months, isLoading } = this.props;

		return (
			<Col {...columns}>
				<Card
					bodyStyle={{ minHeight: "300px" }}
					title={
						<Fragment>
							<FaUserClock style={iconStyle} />
							<span css="vertical-align: middle;">Availability</span>
						</Fragment>
					}
					extra={
						!isEmpty(months) ? (
							<span css="color: #fff; font-size: 16px;">
								{moment(months[0]).format(format)} -{" "}
								{moment(months[1]).format(format)}
							</span>
						) : null
					}
				>
					{isLoading ? (
						<LoadingPanel />
					) : (
						<MemberAvailabilityAverage {...this.props} />
					)}
				</Card>
			</Col>
		);
	};
}

Availability.propTypes = {
	eventAvailability: PropTypes.arrayOf(
		PropTypes.shape({
			id: PropTypes.string,
			label: PropTypes.string,
			value: PropTypes.number,
			color: PropTypes.string,
		}),
	),
	months: PropTypes.arrayOf(PropTypes.string),
	fetchAvailability: PropTypes.func.isRequired,
	isLoading: PropTypes.bool.isRequired,
};

const mapStateToProps = state => ({
	eventAvailability: state.dashboard.eventAvailability.data,
	months: state.dashboard.eventAvailability.months,
	isLoading: state.dashboard.eventAvailability.isLoading,
});

const mapDispatchToProps = {
	fetchAvailability,
};

export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(Availability);
