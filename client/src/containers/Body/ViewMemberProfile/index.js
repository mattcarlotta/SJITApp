import React, { Fragment, PureComponent } from "react";
import PropTypes from "prop-types";
import isEmpty from "lodash/isEmpty";
import Helmet from "react-helmet";
import { push } from "connected-react-router";
import { connect } from "react-redux";
import { Card, Icon, Tabs } from "antd";
import { FaUserCircle, FaChartBar, FaReply, FaClock } from "react-icons/fa";
import { hideServerMessage } from "actions/Messages";
import {
	fetchMember,
	fetchMemberAvailability,
	fetchMemberEvents,
	updateMemberStatus,
} from "actions/Members";
import { fetchScheduleEvents } from "actions/Events";
import {
	BackButton,
	Calendar,
	Line,
	MemberAvailability,
	PaneBody,
	Spinner,
	Title,
} from "components/Body";
import Profile from "./Profile";

const Pane = Tabs.TabPane;

const title = "Member Profile";

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

const scheduling = (
	<span>
		<Icon component={FaClock} />
		Schedule
	</span>
);

export class ViewMemberProfile extends PureComponent {
	componentDidMount = () => {
		const { hideServerMessage, fetchMember, match, serverMessage } = this.props;

		const { id } = match.params;
		fetchMember(id);

		if (serverMessage) hideServerMessage();
	};

	render = () => {
		const {
			eventResponses,
			fetchMemberAvailability,
			fetchMemberEvents,
			push,
			viewMember,
		} = this.props;

		const { _id, firstName, lastName } = viewMember;

		return (
			<Fragment>
				<Helmet title={title} />
				<Card
					style={{ minHeight: 800 }}
					extra={
						<BackButton push={push} location="/employee/members/viewall" />
					}
					title={title}
				>
					{isEmpty(viewMember) ? (
						<Spinner />
					) : (
						<Tabs tabPosition="left">
							<Pane tab={profile} key="profile">
								<Profile {...this.props} />
							</Pane>
							<Pane tab={availability} key="availability">
								<PaneBody>
									<Title centered>
										{firstName} {lastName}&#39;s Availability
									</Title>
									<Line centered width="400px" />
									<MemberAvailability
										{...this.props}
										id={_id}
										fetchAction={fetchMemberAvailability}
									/>
								</PaneBody>
							</Pane>
							<Pane tab={responses} key="responses">
								<PaneBody>
									<Title centered>
										{firstName} {lastName}&#39;s Responses
									</Title>
									<Line centered width="400px" />
									<Calendar
										{...this.props}
										id={_id}
										scheduleEvents={eventResponses}
										fetchAction={fetchMemberEvents}
									/>
								</PaneBody>
							</Pane>
							<Pane tab={scheduling} key="schedule">
								<PaneBody>
									<Title centered>
										{firstName} {lastName}&#39;s Schedule
									</Title>
									<Line centered width="400px" />
									<Calendar
										{...this.props}
										fetchAction={this.props.fetchScheduleEvents}
										title="View Member Schedule"
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

ViewMemberProfile.propTypes = {
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
	fetchMember: PropTypes.func.isRequired,
	fetchMemberAvailability: PropTypes.func.isRequired,
	fetchMemberEvents: PropTypes.func.isRequired,
	fetchScheduleEvents: PropTypes.func.isRequired,
	hideServerMessage: PropTypes.func.isRequired,
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
	push: PropTypes.func.isRequired,
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
	scheduleEvents: PropTypes.arrayOf(
		PropTypes.shape({
			_id: PropTypes.string,
			eventDate: PropTypes.string,
			eventNotes: PropTypes.string,
			eventType: PropTypes.string,
			notes: PropTypes.string,
			opponent: PropTypes.string,
			response: PropTypes.string,
			team: PropTypes.string,
			schedule: PropTypes.arrayOf(
				PropTypes.shape({
					_id: PropTypes.string,
					title: PropTypes.string,
					employeeIds: PropTypes.arrayOf(
						PropTypes.shape({
							_id: PropTypes.string,
							firstName: PropTypes.string,
							lastName: PropTypes.string,
						}),
					),
				}),
			),
		}),
	),
};

const mapStateToProps = state => ({
	eventResponses: state.members.eventResponses,
	memberAvailability: state.members.memberAvailiability,
	viewMember: state.members.viewMember,
	scheduleEvents: state.events.scheduleEvents,
	serverMessage: state.server.message,
});

const mapDispatchToProps = {
	fetchMember,
	fetchMemberAvailability,
	fetchMemberEvents,
	fetchScheduleEvents,
	hideServerMessage,
	push,
	updateMemberStatus,
};

export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(ViewMemberProfile);
