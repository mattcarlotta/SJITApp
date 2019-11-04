import React, { Fragment, PureComponent } from "react";
import PropTypes from "prop-types";
import isEmpty from "lodash/isEmpty";
import Helmet from "react-helmet";
import { connect } from "react-redux";
import { Card, Icon, Tabs } from "antd";
import { FaCogs, FaUserCircle, FaChartBar, FaReply } from "react-icons/fa";
import {
	fetchMemberSettings,
	fetchMemberSettingsAvailability,
	fetchMemberSettingsEvents,
	updateMemberStatus,
} from "actions/Members";
import {
	Calendar,
	Line,
	LoadingPanel,
	MemberAvailability,
	PaneBody,
	Title,
} from "components/Body";
import Profile from "./Profile";

const Pane = Tabs.TabPane;

const title = "Settings";
const iconStyle = {
	verticalAlign: "middle",
	marginRight: 10,
	fontSize: 20,
};

const profile = (
	<span>
		<Icon component={FaUserCircle} />
		Profile
	</span>
);

const availability = (
	<span>
		<Icon component={FaChartBar} />
		Availability
	</span>
);

const responses = (
	<span>
		<Icon component={FaReply} />
		Responses
	</span>
);

export class Settings extends PureComponent {
	componentDidMount = () => this.props.fetchMemberSettings();

	render = () => {
		const {
			eventResponses,
			fetchMemberSettingsAvailability,
			fetchMemberSettingsEvents,
			viewMember,
		} = this.props;

		const { _id, role } = viewMember;
		const isStaff = role !== "employee";

		return (
			<Fragment>
				<Helmet title={title} />
				<Card
					style={{ minHeight: 800 }}
					title={
						<Fragment>
							<FaCogs style={iconStyle} />
							<span css="vertical-align: middle;">{title}</span>
						</Fragment>
					}
				>
					{isEmpty(viewMember) ? (
						<LoadingPanel height="685px" />
					) : (
						<Tabs tabPosition="left">
							<Pane tab={profile} key="profile">
								<Profile {...this.props.viewMember} />
							</Pane>
							<Pane tab={availability} disabled={isStaff} key="availability">
								<PaneBody>
									<Title centered>My Availability</Title>
									<Line centered width="400px" />
									<MemberAvailability
										{...this.props}
										id={_id}
										fetchAction={fetchMemberSettingsAvailability}
									/>
								</PaneBody>
							</Pane>
							<Pane tab={responses} disabled={isStaff} key="responses">
								<PaneBody>
									<Title centered>My Event Responses</Title>
									<Line centered width="400px" />
									<Calendar
										{...this.props}
										id={_id}
										scheduleEvents={eventResponses}
										fetchAction={fetchMemberSettingsEvents}
									/>
								</PaneBody>
							</Pane>
						</Tabs>
					)}
				</Card>
			</Fragment>
		);
	};
}

Settings.propTypes = {
	eventResponses: PropTypes.arrayOf(
		PropTypes.shape({
			_id: PropTypes.string,
			eventDate: PropTypes.string,
			eventNotes: PropTypes.string,
			eventType: PropTypes.string,
			employeeResponse: PropTypes.string,
			employeeNotes: PropTypes.string,
			location: PropTypes.string,
			opponent: PropTypes.string,
			team: PropTypes.string,
		}),
	),
	fetchMemberSettingsAvailability: PropTypes.func.isRequired,
	fetchMemberSettingsEvents: PropTypes.func.isRequired,
	fetchMemberSettings: PropTypes.func.isRequired,
	match: PropTypes.shape({
		params: PropTypes.shape({
			id: PropTypes.string,
		}),
	}),
	memberAvailability: PropTypes.shape({
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
	viewMember: PropTypes.shape({
		_id: PropTypes.string,
		email: PropTypes.string,
		firstName: PropTypes.string,
		lastName: PropTypes.string,
		registered: PropTypes.string,
		role: PropTypes.string,
		schedule: PropTypes.any,
		status: PropTypes.string,
	}),
	updateMemberStatus: PropTypes.func.isRequired,
	serverMessage: PropTypes.string,
};

const mapStateToProps = state => ({
	eventResponses: state.members.eventResponses,
	memberAvailability: state.members.memberAvailability,
	viewMember: state.members.viewMember,
	serverMessage: state.server.message,
});

const mapDispatchToProps = {
	fetchMemberSettingsAvailability,
	fetchMemberSettingsEvents,
	fetchMemberSettings,
	updateMemberStatus,
};

export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(Settings);
