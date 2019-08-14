import React, { Fragment } from "react";
import PropTypes from "prop-types";
import Helmet from "react-helmet";
import { connect } from "react-redux";
import { push } from "connected-react-router";
import { Card } from "antd";
import { FaUserPlus } from "react-icons/fa";
import {
	Button,
	DisplayDate,
	DisplayDateTime,
	FlexEnd,
	Table,
} from "components/Body";
import { deleteForm, fetchForms } from "actions/Forms";

const title = "View Forms";

const columns = [
	{ title: "Season Id", dataIndex: "seasonId", key: "seasonId" },
	{
		title: "Start Month",
		dataIndex: "startMonth",
		key: "startMonth",
		render: date => <DisplayDate date={date} />,
	},
	{
		title: "End Month",
		dataIndex: "endMonth",
		key: "endMonth",
		render: date => <DisplayDate date={date} />,
	},
	{
		title: "Expiration Date",
		dataIndex: "expirationDate",
		key: "expirationDate",
		render: date => <DisplayDateTime date={date} />,
	},
];

export const ViewForms = ({ data, deleteForm, fetchForms, push }) => (
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
					onClick={() => push("/employee/forms/create")}
				>
					<FaUserPlus style={{ position: "relative", top: 2 }} />
					&nbsp; Add Form
				</Button>
			</FlexEnd>
			<Table
				columns={columns}
				data={data}
				deleteAction={deleteForm}
				fetchData={fetchForms}
				push={push}
				editLocation="forms"
			/>
		</Card>
	</Fragment>
);

ViewForms.propTypes = {
	deleteForm: PropTypes.func,
	fetchForms: PropTypes.func.isRequired,
	push: PropTypes.func,
	data: PropTypes.arrayOf(
		PropTypes.shape({
			_id: PropTypes.string,
			seasonId: PropTypes.string,
			startMonth: PropTypes.string,
			endMonth: PropTypes.string,
			expirationDate: PropTypes.string,
			notes: PropTypes.string,
		}),
	),
};

const mapStateToProps = state => ({
	data: state.forms.data,
});

const mapDispatchToProps = {
	deleteForm,
	fetchForms,
	push,
};

export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(ViewForms);
