/* eslint-disable react/forbid-prop-types, react/jsx-boolean-value */
import React, { Component } from "react";
import PropTypes from "prop-types";
import { Icon, Input, Popover, Table } from "antd";
import { FaSearch, FaTools } from "react-icons/fa";
import {
	Button,
	FadeIn,
	FlexCenter,
	LoadingTable,
	TableActions,
} from "components/Body";

const iconStyle = {
	position: "relative",
	top: 2,
};

class CustomTable extends Component {
	componentDidMount = () => {
		const { queryString } = this.props;
		this.props.fetchData(queryString);
	};

	shouldComponentUpdate = nextProps =>
		nextProps.isLoading !== this.props.isLoading ||
		nextProps.queries !== this.props.queries ||
		nextProps.queryString !== this.props.queryString;

	componentDidUpdate = prevProps => {
		const { queryString } = this.props;

		if (queryString !== prevProps.queryString)
			this.props.fetchData(this.props.queryString);
	};

	handleClickAction = (action, record) => action(record._id, record);

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
		const { columns } = this.props;

		const tableColumns = columns.map(props => ({
			...props,
			...this.getColumnSearchProps(props.dataIndex),
		}));

		tableColumns.push({
			title: "Actions",
			key: "action",
			render: (_, record) => (
				<Popover
					placement="bottom"
					title={<FlexCenter>Available Actions</FlexCenter>}
					content={
						<TableActions
							{...this.props}
							record={record}
							handleClickAction={this.handleClickAction}
						/>
					}
					trigger="click"
				>
					<Button padding="3px" marginRight="0px" onClick={null}>
						<FaTools style={iconStyle} />
					</Button>
				</Popover>
			),
			fixed: "right",
			width: 50,
		});

		return tableColumns;
	};

	render = () =>
		this.props.isLoading ? (
			<LoadingTable />
		) : (
			<FadeIn timing="0.4s">
				<Table
					columns={this.createTableColumns()}
					dataSource={this.props.data}
					pagination={{
						position: "bottom",
						current: this.props.queries.page,
						showTotal: /* istanbul ignore next */ total => (
							<span>{total}&nbsp;items</span>
						),
						total: this.props.totalDocs,
					}}
					bordered={true}
					rowKey="_id"
					scroll={{ x: 1300 }}
					onChange={this.props.handlePageChange}
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
	handlePageChange: PropTypes.func.isRequired,
	isLoading: PropTypes.bool.isRequired,
	queries: PropTypes.any,
	queryString: PropTypes.string,
	location: PropTypes.any,
	deleteAction: PropTypes.func,
	editLocation: PropTypes.string,
	fetchData: PropTypes.func.isRequired,
	push: PropTypes.func.isRequired,
	sendMail: PropTypes.func,
	totalDocs: PropTypes.number,
	viewLocation: PropTypes.string,
};

export default CustomTable;
/* eslint-enable react/forbid-prop-types, react/jsx-boolean-value */
