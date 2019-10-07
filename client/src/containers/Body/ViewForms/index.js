import React, { Fragment } from "react";
import PropTypes from "prop-types";
import Helmet from "react-helmet";
import { connect } from "react-redux";
import { push } from "connected-react-router";
import { Card } from "antd";
import { MdNoteAdd } from "react-icons/md";
import {
	Button,
	DisplayEmailReminder,
	FormatDate,
	FlexEnd,
	Table,
} from "components/Body";
import { deleteForm, fetchForms, resendMail } from "actions/Forms";

const title = "View Forms";

const columns = [
	{ title: "Season Id", dataIndex: "seasonId", key: "seasonId" },
	{
		title: "Start Month",
		dataIndex: "startMonth",
		key: "startMonth",
		render: date => <FormatDate format="MM/DD/YYYY" date={date} />,
	},
	{
		title: "End Month",
		dataIndex: "endMonth",
		key: "endMonth",
		render: date => <FormatDate format="MM/DD/YYYY" date={date} />,
	},
	{
		title: "Expiration Date",
		dataIndex: "expirationDate",
		key: "expirationDate",
		render: date => <FormatDate format="MM/DD/YY @ hh:mm a" date={date} />,
	},
	{
		title: "Form Id",
		dataIndex: "_id",
		key: "_id",
	},
	{
		title: "Send Email Notifications",
		dataIndex: "sendEmailNotificationsDate",
		key: "sendEmailNotificationsDate",
		render: date => <FormatDate format="MMMM Do, YYYY" date={date} />,
	},
	{
		title: "Sent Emails",
		dataIndex: "sentEmails",
		key: "sentEmails",
		render: reminder => <DisplayEmailReminder reminder={reminder} />,
	},
];

export const ViewForms = ({
	data,
	deleteForm,
	fetchForms,
	push,
	resendMail,
}) => (
	<Fragment>
		<Helmet title={title} />
		<Card title={title}>
			<FlexEnd>
				<Button
					primary
					width="200px"
					marginRight="0px"
					padding="5px 10px"
					style={{ marginBottom: 20 }}
					onClick={() => push("/employee/forms/create")}
				>
					<MdNoteAdd style={{ position: "relative", top: 4, fontSize: 20 }} />
					&nbsp; Create AP Form
				</Button>
			</FlexEnd>
			<Table
				columns={columns}
				data={data}
				deleteAction={deleteForm}
				fetchData={fetchForms}
				push={push}
				editLocation="forms"
				viewLocation="forms"
				sendMail={resendMail}
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
			sendEmailNotificationsDate: PropTypes.string,
			sentEmails: PropTypes.bool,
		}),
	),
	resendMail: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
	data: state.forms.data,
});

const mapDispatchToProps = {
	deleteForm,
	fetchForms,
	push,
	resendMail,
};

export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(ViewForms);
