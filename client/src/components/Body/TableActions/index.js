/* eslint-disable react/forbid-prop-types */
import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { Icon, Popconfirm, Tooltip } from "antd";
import {
	FaEdit,
	FaShareSquare,
	FaTrash,
	FaSearchPlus,
	FaClipboardCheck,
} from "react-icons/fa";
import { GoStop } from "react-icons/go";
import { Button, FlexCenter, Spacer } from "components/Body";

const iconStyle = {
	position: "relative",
	top: 2,
};

const TableActions = ({
	assignLocation,
	deleteAction,
	editLocation,
	handleClickAction,
	push,
	record,
	sendMail,
	viewLocation,
}) => (
	<FlexCenter direction="column">
		{assignLocation && (
			<Fragment>
				<Tooltip placement="top" title={<span>View & Assign Schedule</span>}>
					<Button
						primary
						padding="3px 0 0 0"
						marginRight="0px"
						onClick={() =>
							push(`/employee/${assignLocation}/assign/${record._id}`)
						}
					>
						<FaClipboardCheck style={{ ...iconStyle, fontSize: 17 }} />
						&nbsp;
						<span>Schedule</span>
					</Button>
				</Tooltip>
				<Spacer />
			</Fragment>
		)}
		{viewLocation && (
			<Fragment>
				<Tooltip placement="top" title={<span>View</span>}>
					<Button
						primary
						padding="3px 0 0 0"
						marginRight="0px"
						onClick={() => push(`/employee/${viewLocation}/view/${record._id}`)}
					>
						<FaSearchPlus style={{ ...iconStyle, fontSize: 16 }} />
						&nbsp;
						<span>View</span>
					</Button>
				</Tooltip>
				<Spacer />
			</Fragment>
		)}
		{editLocation && (
			<Fragment>
				<Tooltip placement="top" title={<span>Edit</span>}>
					<Button
						primary
						padding="3px 0px 0 3px"
						marginRight="0px"
						onClick={() => push(`/employee/${editLocation}/edit/${record._id}`)}
					>
						<FaEdit style={iconStyle} />
						&nbsp;
						<span>Edit</span>
					</Button>
				</Tooltip>
				<Spacer />
			</Fragment>
		)}
		{sendMail && (
			<Fragment>
				<Tooltip placement="top" title={<span>Send/Resend Mail</span>}>
					<Button
						primary
						padding="3px 0 0 0"
						marginRight="0px"
						onClick={() => handleClickAction(sendMail, record)}
					>
						<FaShareSquare style={{ ...iconStyle, fontSize: 18 }} />
						&nbsp;
						<span>Send</span>
					</Button>
				</Tooltip>
				<Spacer />
			</Fragment>
		)}
		{deleteAction && (
			<Tooltip placement="top" title={<span>Delete</span>}>
				<Popconfirm
					placement="top"
					title="Are you sure? This action is irreversible."
					icon={<Icon component={GoStop} style={{ color: "red" }} />}
					onConfirm={() => handleClickAction(deleteAction, record)}
				>
					<Button danger padding="5px 0 1px 0" marginRight="0px">
						<FaTrash style={{ ...iconStyle, fontSize: 16 }} />
						&nbsp;
						<span>Delete</span>
					</Button>
				</Popconfirm>
			</Tooltip>
		)}
	</FlexCenter>
);

TableActions.propTypes = {
	assignLocation: PropTypes.string,
	deleteAction: PropTypes.func,
	editLocation: PropTypes.string,
	handleClickAction: PropTypes.func.isRequired,
	push: PropTypes.func.isRequired,
	record: PropTypes.any.isRequired,
	sendMail: PropTypes.func,
	viewLocation: PropTypes.string,
};

export default TableActions;
/* eslint-enable react/forbid-prop-types */