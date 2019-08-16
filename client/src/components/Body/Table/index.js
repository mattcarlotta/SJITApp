/* eslint-disable react/forbid-prop-types, react/jsx-boolean-value */
import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import isEmpty from "lodash/isEmpty";
import { Divider, Icon, Input, Popconfirm, Table, Tooltip } from "antd";
import { FaEdit, FaSearch, FaTrash, FaSearchPlus } from "react-icons/fa";
import { GoStop } from "react-icons/go";
import { Button, FlexCenter, LoadingTable } from "components/Body";

class CustomTable extends Component {
	state = {
		isLoading: true,
	};

	static getDerivedStateFromProps = ({ data }, state) => {
		if (state.isLoading && !isEmpty(data)) {
			return {
				isLoading: false,
			};
		}

		return null;
	};

	componentDidMount = () => {
		this.props.fetchData();
		this.setTimer();
	};

	shouldComponentUpdate = (nextProps, nextState) =>
		nextProps.data !== this.props.data ||
		nextState.isLoading !== this.state.isLoading;

	/* istanbul ignore next */
	componentWillUnmount = () => clearTimeout(this.timeout);

	clearTimer = () => {
		this.setState({ isLoading: false }, () => clearTimeout(this.timeout));
	};

	setTimer = () => (this.timeout = setTimeout(this.clearTimer, 3000));

	handleSearch = (_, confirm) => {
		confirm();
	};

	handleReset = clearFilters => {
		clearFilters();
	};

	handleSelectKeys = (value, setSelectedKeys) => {
		setSelectedKeys(value ? [value] : []);
	};

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
			columns,
			deleteAction,
			editLocation,
			push,
			viewLocation,
		} = this.props;

		const tableColumns = columns.map(props => ({
			...props,
			...this.getColumnSearchProps(props.dataIndex),
		}));

		tableColumns.push({
			title: "Actions",
			key: "action",
			render: (_, record) => (
				<FlexCenter>
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
							<Divider type="vertical" />
						</Fragment>
					)}
					{editLocation && (
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
					<Tooltip placement="top" title={<span>Delete</span>}>
						<Popconfirm
							placement="top"
							title="Are you sure? This action is irreversible."
							icon={<Icon component={GoStop} style={{ color: "red" }} />}
							onConfirm={() => deleteAction(record._id)}
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
				</FlexCenter>
			),
		});

		return tableColumns;
	};

	render = () =>
		this.state.isLoading ? (
			<LoadingTable />
		) : (
			<Table
				columns={this.createTableColumns()}
				dataSource={this.props.data}
				pagination={false}
				bordered={true}
				rowKey="_id"
			/>
		);
}

CustomTable.propTypes = {
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
	viewLocation: PropTypes.string,
};

export default CustomTable;
/* eslint-enable react/forbid-prop-types, react/jsx-boolean-value */
