/* eslint-disable react/forbid-prop-types, react/jsx-boolean-value */
import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { Divider, Icon, Input, Popconfirm, Table, Tooltip } from "antd";
import {
	FaEdit,
	FaShareSquare,
	FaSearch,
	FaTrash,
	FaSearchPlus,
	FaClipboardCheck,
} from "react-icons/fa";
import { GoStop } from "react-icons/go";
import { Button, FadeIn, FlexCenter, LoadingTable } from "components/Body";

class CustomTable extends Component {
	state = {
		isLoading: true,
	};

	componentDidMount = () => {
		this.props.fetchData();
		this.setTimer();
	};

	shouldComponentUpdate = (nextProps, nextState) =>
		nextProps.data !== this.props.data ||
		nextState.isLoading !== this.state.isLoading;

	componentDidUpdate = prevProps => {
		if (this.props.data !== prevProps.data && this.state.isLoading)
			this.clearTimer();
	};

	/* istanbul ignore next */
	componentWillUnmount = () => {
		this.cancelClearTimer = true;
		clearTimeout(this.timeout);
	};

	handleClickAction = (action, record) =>
		this.setState({ isLoading: true }, () => action(record._id));

	/* istanbul ignore next */
	clearTimer = () => {
		if (!this.cancelClearTimer)
			this.setState({ isLoading: false }, () => clearTimeout(this.timeout));
	};

	setTimer = () => (this.timeout = setTimeout(this.clearTimer, 3000));

	handleSearch = (_, confirm) => confirm();

	handleReset = clearFilters => clearFilters();

	handleSelectKeys = (value, setSelectedKeys) =>
		setSelectedKeys(value ? [value] : []);

	/* istanbul ignore next */
	getColumnSearchProps = dataIndex => ({
		filterDropdown: ({
			setSelectedKeys,
			selectedKeys,
			confirm,
			clearFilters,
		}) => (
			<div style={{ padding: 8 }}>
				<Input
					ref={node => (this.searchInput = node)}
					placeholder={`Search ${dataIndex}`}
					value={selectedKeys[0]}
					onChange={({ target: { value } }) =>
						this.handleSelectKeys(value, setSelectedKeys)
					}
					onPressEnter={() => this.handleSearch(selectedKeys, confirm)}
					style={{ marginBottom: 8, display: "block" }}
				/>
				<Button
					primary
					width="100px"
					padding="2px 0"
					display="inline-block"
					marginRight="5px"
					onClick={() => this.handleSearch(selectedKeys, confirm)}
				>
					Search
				</Button>
				<Button
					danger
					display="inline-block"
					width="100px"
					padding="2px 0"
					marginRight="0px"
					onClick={() => this.handleReset(clearFilters)}
				>
					Reset
				</Button>
			</div>
		),
		filterIcon: filtered => (
			<Icon
				component={FaSearch}
				style={{ color: filtered ? "#1890ff" : undefined }}
			/>
		),
		onFilter: (value, record) =>
			record[dataIndex]
				.toString()
				.toLowerCase()
				.includes(value.toLowerCase()),
		onFilterDropdownVisibleChange: visible => {
			if (visible) {
				setTimeout(() => this.searchInput.select());
			}
		},
	});

	createTableColumns = () => {
		const {
			assignLocation,
			columns,
			deleteAction,
			editLocation,
			push,
			role,
			sendMail,
			viewLocation,
		} = this.props;

		const notEmployee = role !== "employee";

		const tableColumns = columns.map(props => ({
			...props,
			...this.getColumnSearchProps(props.dataIndex),
		}));

		tableColumns.push({
			title: "Actions",
			key: "action",
			render: (_, record) => (
				<FlexCenter>
					{assignLocation && notEmployee && (
						<Fragment>
							<Tooltip placement="top" title={<span>View & Assign</span>}>
								<Button
									primary
									display="inline-block"
									width="50px"
									padding="3px 0 0 0"
									marginRight="0px"
									onClick={() =>
										push(`/employee/${assignLocation}/assign/${record._id}`)
									}
								>
									<FaClipboardCheck style={{ fontSize: 17 }} />
								</Button>
							</Tooltip>
							<Divider type="vertical" />
						</Fragment>
					)}
					{viewLocation && (
						<Fragment>
							<Tooltip placement="top" title={<span>View</span>}>
								<Button
									primary
									display="inline-block"
									width="50px"
									padding="3px 0 0 0"
									marginRight="0px"
									onClick={() =>
										push(`/employee/${viewLocation}/view/${record._id}`)
									}
								>
									<FaSearchPlus style={{ fontSize: 16 }} />
								</Button>
							</Tooltip>
							{notEmployee && <Divider type="vertical" />}
						</Fragment>
					)}
					{editLocation && notEmployee && (
						<Fragment>
							<Tooltip placement="top" title={<span>Edit</span>}>
								<Button
									primary
									display="inline-block"
									width="50px"
									padding="3px 0px 0 3px"
									marginRight="0px"
									onClick={() =>
										push(`/employee/${editLocation}/edit/${record._id}`)
									}
								>
									<FaEdit />
								</Button>
							</Tooltip>
							<Divider type="vertical" />
						</Fragment>
					)}
					{sendMail && notEmployee && (
						<Fragment>
							<Tooltip placement="top" title={<span>Send/Resend Mail</span>}>
								<Button
									primary
									display="inline-block"
									width="50px"
									padding="3px 0 0 0"
									marginRight="0px"
									onClick={() => this.handleClickAction(sendMail, record)}
								>
									<FaShareSquare style={{ fontSize: 18 }} />
								</Button>
							</Tooltip>
							<Divider type="vertical" />
						</Fragment>
					)}
					{deleteAction && notEmployee && (
						<Tooltip placement="top" title={<span>Delete</span>}>
							<Popconfirm
								placement="top"
								title="Are you sure? This action is irreversible."
								icon={<Icon component={GoStop} style={{ color: "red" }} />}
								onConfirm={() => this.handleClickAction(deleteAction, record)}
							>
								<Button
									danger
									display="inline-block"
									width="50px"
									padding="5px 0 1px 0"
									marginRight="0px"
									style={{ fontSize: "16px" }}
								>
									<FaTrash />
								</Button>
							</Popconfirm>
						</Tooltip>
					)}
				</FlexCenter>
			),
			fixed: "right",
			width: 100,
		});

		return tableColumns;
	};

	render = () =>
		this.state.isLoading ? (
			<LoadingTable />
		) : (
			<FadeIn>
				<Table
					columns={this.createTableColumns()}
					dataSource={this.props.data}
					pagination={false}
					bordered={true}
					rowKey="_id"
					scroll={{ x: 1300 }}
				/>
			</FadeIn>
		);
}

CustomTable.propTypes = {
	assignLocation: PropTypes.string,
	columns: PropTypes.arrayOf(
		PropTypes.shape({
			title: PropTypes.string.isRequired,
			dataIndex: PropTypes.string.isRequired,
			key: PropTypes.string.isRequired,
			render: PropTypes.func,
		}),
	).isRequired,
	data: PropTypes.any.isRequired,
	deleteAction: PropTypes.func,
	editLocation: PropTypes.string,
	fetchData: PropTypes.func.isRequired,
	push: PropTypes.func.isRequired,
	role: PropTypes.string,
	sendMail: PropTypes.func,
	viewLocation: PropTypes.string,
};

export default CustomTable;
/* eslint-enable react/forbid-prop-types, react/jsx-boolean-value */
