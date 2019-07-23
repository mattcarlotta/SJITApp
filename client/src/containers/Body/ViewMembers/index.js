import React, { PureComponent, Fragment } from "react";
import PropTypes from "prop-types";
import Helmet from "react-helmet";
import moment from "moment";
import { connect } from "react-redux";
import { push } from "connected-react-router";
import { Card } from "antd";
import { FaUserPlus } from "react-icons/fa";
import { Button, FlexEnd } from "components/Body";
import { Table } from "containers/Body";
import { deleteMember, fetchMembers } from "actions/Members";

const title = "View Members";

const displayDate = date => <span>{moment(date).format("l")}</span>;

const columns = [
	{
		title: "First Name",
		dataIndex: "firstName",
		key: "firstName",
	},
	{
		title: "Last Name",
		dataIndex: "lastName",
		key: "lastName",
	},
	{
		title: "Role",
		dataIndex: "role",
		key: "role",
	},
	{
		title: "Status",
		dataIndex: "status",
		key: "status",
	},
	{
		title: "Email",
		dataIndex: "email",
		key: "email",
	},
	{
		title: "Registered",
		dataIndex: "registered",
		key: "registered",
		render: displayDate,
	},
	{
		title: "Events",
		dataIndex: "events",
		key: "events",
	},
];

export class ViewMembers extends PureComponent {
	componentDidMount = () => {
		if (this.props.isLoading) this.props.fetchMembers();
	};

	render = () => {
		return (
			<Fragment>
				<Helmet title={title} />
				<Card title={title}>
					<FlexEnd>
						<Button
							primary
							width="180px"
							marginRight="0px"
							padding="5px 10px"
							style={{ marginBottom: 20 }}
							onClick={() => this.props.push("/employee/members/create")}
						>
							<FaUserPlus style={{ position: "relative", top: 2 }} />
							&nbsp; Add Member
						</Button>
					</FlexEnd>
					<Table
						columns={columns}
						data={this.props.data}
						deleteAction={this.props.deleteMember}
						isLoading={this.props.isLoading}
						push={this.props.push}
						viewLocation="members"
						editLocation="members"
					/>
				</Card>
			</Fragment>
		);
	};
}

ViewMembers.propTypes = {
	data: PropTypes.arrayOf(
		PropTypes.shape({
			_id: PropTypes.any,
			role: PropTypes.string,
			status: PropTypes.string,
			registered: PropTypes.string,
			email: PropTypes.string,
			firstName: PropTypes.string,
			lastName: PropTypes.string,
			events: PropTypes.number,
		}),
	),
	deleteMember: PropTypes.func,
	fetchMembers: PropTypes.func.isRequired,
	isLoading: PropTypes.bool.isRequired,
	push: PropTypes.func,
};

const mapStateToProps = state => ({
	isLoading: state.members.isLoading,
	data: state.members.data,
});

const mapDispatchToProps = {
	deleteMember,
	fetchMembers,
	push,
};

export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(ViewMembers);
