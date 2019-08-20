import React, { Fragment, PureComponent } from "react";
import PropTypes from "prop-types";
import isEmpty from "lodash/isEmpty";
import Helmet from "react-helmet";
import { push } from "connected-react-router";
import { connect } from "react-redux";
import { Card, Icon, Tabs } from "antd";
import { FaUserCircle, FaChartBar, FaReply, FaClock } from "react-icons/fa";
import { hideServerMessage } from "actions/Messages";
import { fetchMember, updateMemberStatus } from "actions/Members";
import { BackButton, PaneBody, Spinner } from "components/Body";
import Profile from "./Profile";

const Pane = Tabs.TabPane;

const title = "Member Profile";

const profile = (
	<span>
		<Icon component={FaUserCircle} />
		Profile
	</span>
);

const analytics = (
	<span>
		<Icon component={FaChartBar} />
		Analytics
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
		const { push, viewMember, updateMemberStatus } = this.props;

		const { eventResponses, schedule, status } = viewMember;

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
								<Profile
									viewMember={viewMember}
									updateMemberStatus={updateMemberStatus}
								/>
							</Pane>
							<Pane tab={analytics} key="analytics">
								<PaneBody>
									<p>Analytics: {status}</p>
								</PaneBody>
							</Pane>
							<Pane tab={responses} key="responses">
								<PaneBody>
									<p>Responses: {JSON.stringify(eventResponses)}</p>
								</PaneBody>
							</Pane>
							<Pane tab={scheduling} key="schedule">
								<PaneBody>
									<p>Schedule: {JSON.stringify(schedule)}</p>
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
	fetchMember: PropTypes.func.isRequired,
	hideServerMessage: PropTypes.func.isRequired,
	match: PropTypes.shape({
		params: PropTypes.shape({
			id: PropTypes.string,
		}),
	}),
	push: PropTypes.func.isRequired,
	viewMember: PropTypes.shape({
		_id: PropTypes.string,
		email: PropTypes.string,
		events: PropTypes.number,
		firstName: PropTypes.string,
		lastName: PropTypes.string,
		registered: PropTypes.string,
		role: PropTypes.string,
		schedule: PropTypes.any,
		status: PropTypes.string,
		eventResponses: PropTypes.arrayOf(
			PropTypes.shape({
				eventDate: PropTypes.string,
				notes: PropTypes.string,
				opponent: PropTypes.string,
				response: PropTypes.string,
				team: PropTypes.string,
			}),
		),
	}),
	updateMemberStatus: PropTypes.func.isRequired,
	serverMessage: PropTypes.string,
};

const mapStateToProps = state => ({
	viewMember: state.members.viewMember,
	serverMessage: state.server.message,
});

const mapDispatchToProps = {
	fetchMember,
	hideServerMessage,
	push,
	updateMemberStatus,
};

export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(ViewMemberProfile);
