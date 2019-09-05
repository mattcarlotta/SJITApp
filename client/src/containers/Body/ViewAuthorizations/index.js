import React, { Fragment } from "react";
import PropTypes from "prop-types";
import Helmet from "react-helmet";
import { connect } from "react-redux";
import { push } from "connected-react-router";
import { Card } from "antd";
import { FaUserPlus } from "react-icons/fa";
import {
	Button,
	FormatDate,
	FlexEnd,
	Table,
	TokenStatus,
} from "components/Body";
import { deleteToken, fetchTokens } from "actions/Members";

const title = "View Authorizations";

const columns = [
	{
		title: "Registration Status",
		dataIndex: "email",
		key: "email",
		render: email => <TokenStatus email={email} />,
	},
	{
		title: "Authorized Email",
		dataIndex: "authorizedEmail",
		key: "authorizedEmail",
	},
	{ title: "Role", dataIndex: "role", key: "role" },
	{ title: "Season ID", dataIndex: "seasonId", key: "seasonId" },
	{ title: "Token", dataIndex: "token", key: "token" },
	{
		title: "Expiration Date",
		dataIndex: "expiration",
		key: "expiration",
		render: (date, { email }) =>
			!email ? <FormatDate format="MM/DD/YYYY" date={date} /> : <span>-</span>,
	},
];

export const ViewAuthorizations = ({
	deleteToken,
	fetchTokens,
	push,
	tokens,
}) => (
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
					onClick={() => push("/employee/members/create")}
				>
					<FaUserPlus style={{ position: "relative", top: 2 }} />
					&nbsp; Add Member
				</Button>
			</FlexEnd>
			<Table
				columns={columns}
				data={tokens}
				deleteAction={deleteToken}
				fetchData={fetchTokens}
				push={push}
				editLocation="members/authorizations"
			/>
		</Card>
	</Fragment>
);

ViewAuthorizations.propTypes = {
	deleteToken: PropTypes.func,
	fetchTokens: PropTypes.func.isRequired,
	push: PropTypes.func,
	tokens: PropTypes.arrayOf(
		PropTypes.shape({
			_id: PropTypes.any,
			authorizedEmail: PropTypes.string,
			email: PropTypes.string,
			role: PropTypes.string,
			seasonId: PropTypes.string,
			token: PropTypes.string,
		}),
	),
};

const mapStateToProps = state => ({
	tokens: state.members.tokens,
});

const mapDispatchToProps = {
	deleteToken,
	fetchTokens,
	push,
};

export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(ViewAuthorizations);
