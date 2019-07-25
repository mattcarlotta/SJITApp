import React, { Fragment, PureComponent } from "react";
import PropTypes from "prop-types";
import isEmpty from "lodash/isEmpty";
import Helmet from "react-helmet";
import moment from "moment";
import { connect } from "react-redux";
import { Card, Icon, Tabs } from "antd";
import { FaUserCircle, FaChartBar, FaReply, FaClock } from "react-icons/fa";
import { fetchMember, fetchMembers } from "actions/Members";
import {
	Button,
	LightText,
	DisplayStatus,
	Spinner,
	Title,
} from "components/Body";
import { EditMemberForm } from "components/Forms";

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

class ViewMemberProfile extends PureComponent {
	componentDidMount = () => {
		const { id } = this.props.match.params;

		this.props.fetchMember(id);
	};

	renderRoleButton = () => {
		const { role } = this.props.viewMember;
		return (
			<Button primary onClick={null}>
				{role === "active" ? "Suspend" : "Activate"}
			</Button>
		);
	};

	render = () => {
		const { viewMember } = this.props;

		const {
			_id,
			events,
			firstName,
			lastName,
			registered,
			schedule,
			status,
		} = viewMember;

		return (
			<Fragment>
				<Helmet title={title} />
				<Card title={title}>
					{isEmpty(viewMember) ? (
						<Spinner />
					) : (
						<Tabs tabPosition="left">
							<Pane tab={profile} key="profile">
								<Title style={{ fontSize: 36, margin: 0 }}>
									{firstName} {lastName}
								</Title>
								<LightText>Unique id: {_id}</LightText>
								<LightText>Status: {DisplayStatus(status)}</LightText>
								<LightText>
									Registered: {moment(registered).format("l")}
								</LightText>
								<EditMemberForm viewMember={viewMember} />
							</Pane>
							<Pane tab={analytics} key="analytics">
								<p>Analytics: {status}</p>
							</Pane>
							<Pane tab={responses} key="responses">
								<p>Responses: {JSON.stringify(events)}</p>
							</Pane>
							<Pane tab={scheduling} key="schedule">
								<p>Schedule: {JSON.stringify(schedule)}</p>
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
	fetchMembers: PropTypes.func.isRequired,
	viewMember: PropTypes.shape({
		_id: PropTypes.string,
		email: PropTypes.string,
		events: PropTypes.any,
		firstName: PropTypes.string,
		lastName: PropTypes.string,
		registered: PropTypes.string,
		role: PropTypes.string,
		schedule: PropTypes.any,
		status: PropTypes.string,
	}),
};

const mapStateToProps = state => ({
	viewMember: state.members.viewMember,
});

const mapDispatchToProps = {
	fetchMember,
	fetchMembers,
};

export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(ViewMemberProfile);
