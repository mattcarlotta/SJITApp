import React, { Fragment, PureComponent } from "react";
import PropTypes from "prop-types";
import moment from "moment";
import isEmpty from "lodash/isEmpty";
import { connect } from "react-redux";
import { Card, Col } from "antd";
import { FaUserClock } from "react-icons/fa";
import {
	Bold,
	CalendarContainer,
	Flex,
	FlexEnd,
	FlexStart,
	Float,
	List,
	ListItem,
	LoadingPanel,
	NoAvailability,
} from "components/Body";
import { fetchMembersAvailability } from "actions/Dashboard";
import columns from "../Columns";

const iconStyle = {
	verticalAlign: "middle",
	marginRight: 10,
	fontSize: 22,
};

const listItemStyle = {
	fontSize: 16,
};

const listStyle = { height: 200, overflowY: "auto", padding: "0 5px" };

const tableHeader = {
	backgroundColor: "#025f6d",
	color: "#fff",
	marginTop: 10,
	padding: "0 5px",
	borderRadius: 3,
	fontSize: 18,
};

const format = "MM/DD/YYYY";

class MembersAvailability extends PureComponent {
	componentDidMount = () => {
		this.props.fetchMembersAvailability();
	};

	render = () => {
		const { membersAvailability, months, isLoading } = this.props;

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
					) : !isEmpty(membersAvailability) ? (
						<CalendarContainer>
							<Flex style={tableHeader}>
								<FlexStart>Employee</FlexStart>
								<FlexEnd>Availability (%)</FlexEnd>
							</Flex>
							<List style={listStyle}>
								{membersAvailability.map(({ id, availability }, key) => (
									<ListItem
										key={id}
										style={{
											...listItemStyle,
											backgroundColor: key % 2 ? "#ebebeb" : "transparent",
										}}
									>
										<Bold>{id}</Bold>
										<Float direction="right">{availability}&#37;</Float>
									</ListItem>
								))}
							</List>
						</CalendarContainer>
					) : (
						<NoAvailability />
					)}
				</Card>
			</Col>
		);
	};
}

MembersAvailability.propTypes = {
	fetchMembersAvailability: PropTypes.func.isRequired,
	isLoading: PropTypes.bool.isRequired,
	membersAvailability: PropTypes.arrayOf(
		PropTypes.shape({
			id: PropTypes.string,
			availability: PropTypes.number,
		}),
	),
	months: PropTypes.arrayOf(PropTypes.string),
};

const mapStateToProps = state => ({
	isLoading: state.dashboard.membersAvailability.isLoading,
	membersAvailability: state.dashboard.membersAvailability.data,
	months: state.dashboard.membersAvailability.months,
});

const mapDispatchToProps = {
	fetchMembersAvailability,
};

export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(MembersAvailability);