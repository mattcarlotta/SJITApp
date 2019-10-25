import React, { Fragment } from "react";
import PropTypes from "prop-types";
import Helmet from "react-helmet";
import { connect } from "react-redux";
import { push } from "connected-react-router";
import { Card } from "antd";
import { FaMailBulk, FaPaperPlane, FaSync } from "react-icons/fa";
import {
	Button,
	DisplaySendToList,
	EmailStatus,
	FormatDate,
	Flex,
	FlexEnd,
	FlexStart,
	Table,
} from "components/Body";
import { deleteMail, fetchMails, resendMail } from "actions/Mail";

const title = "Mail";
const titleIconStyle = {
	verticalAlign: "middle",
	marginRight: 10,
	fontSize: 20,
};

const iconStyle = { position: "relative", top: 2 };

const columns = [
	{
		title: "Status",
		dataIndex: "status",
		key: "status",
		render: status => <EmailStatus status={status} />,
	},
	{
		title: "Send To",
		dataIndex: "sendTo",
		key: "sendTo",
		render: emails => <DisplaySendToList emails={emails} />,
	},
	{
		title: "Send From",
		dataIndex: "sendFrom",
		key: "sendFrom",
	},
	{
		title: "Send Date",
		dataIndex: "sendDate",
		key: "sendDate",
		render: date => <FormatDate format="MM/DD/YYYY @ hh:mm a" date={date} />,
	},
	{
		title: "Subject",
		dataIndex: "subject",
		key: "subject",
	},
];

export const ViewMail = ({
	data,
	deleteMail,
	fetchMails,
	push,
	resendMail,
}) => (
	<Fragment>
		<Helmet title={title} />
		<Card
			title={
				<Fragment>
					<FaMailBulk style={titleIconStyle} />
					<span css="vertical-align: middle;">{title}</span>
				</Fragment>
			}
		>
			<Flex>
				<FlexStart>
					<Button
						primary
						width="180px"
						marginRight="0px"
						padding="5px 10px"
						style={{ marginBottom: 20 }}
						onClick={() => fetchMails()}
					>
						<FaSync style={iconStyle} />
						&nbsp; Refresh
					</Button>
				</FlexStart>
				<FlexEnd>
					<Button
						primary
						width="180px"
						marginRight="0px"
						padding="5px 10px"
						style={{ marginBottom: 20 }}
						onClick={() => push("/employee/mail/create")}
					>
						<FaPaperPlane style={iconStyle} />
						&nbsp; Send Mail
					</Button>
				</FlexEnd>
			</Flex>
			<Table
				columns={columns}
				data={data}
				deleteAction={deleteMail}
				editLocation="mail"
				fetchData={fetchMails}
				push={push}
				sendMail={resendMail}
			/>
		</Card>
	</Fragment>
);

ViewMail.propTypes = {
	data: PropTypes.arrayOf(
		PropTypes.shape({
			_id: PropTypes.any,
			message: PropTypes.string,
			sendTo: PropTypes.arrayOf(PropTypes.string),
			sendFrom: PropTypes.string,
			sendDate: PropTypes.string,
			status: PropTypes.string,
			subject: PropTypes.string,
		}),
	),
	deleteMail: PropTypes.func,
	fetchMails: PropTypes.func.isRequired,
	push: PropTypes.func,
	resendMail: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
	data: state.mail.data,
});

const mapDispatchToProps = {
	deleteMail,
	fetchMails,
	push,
	resendMail,
};

export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(ViewMail);
