import React, { Component, Fragment } from "react";
import Helmet from "react-helmet";
import { Divider, Table, Input, Icon, Card } from "antd";
import { Button } from "components/Body";
import Highlighter from "react-highlight-words";

const title = "View Seasons";

const data = [
	{
		key: "1",
		seasonId: "John Brown",
		startDate: 32,
		endDate: "New York No. 1 Lake Park",
		members: 1,
	},
	{
		key: "2",
		seasonId: "Joe Black",
		startDate: 42,
		endDate: "London No. 1 Lake Park",
		members: 1,
	},
	{
		key: "3",
		seasonId: "Jim Green",
		startDate: 32,
		endDate: "Sidney No. 1 Lake Park",
		members: 1,
	},
	{
		key: "4",
		seasonId: "Jim Red",
		startDate: 32,
		endDate: "London No. 2 Lake Park",
		members: 1,
	},
];

class ViewSeasons extends Component {
	state = {
		searchText: "",
	};

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
						setSelectedKeys(value ? [value] : [])
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
			<Icon type="search" style={{ color: filtered ? "#1890ff" : undefined }} />
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
		render: text => (
			<Highlighter
				highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
				searchWords={[this.state.searchText]}
				autoEscape
				textToHighlight={text.toString()}
			/>
		),
	});

	handleSearch = (selectedKeys, confirm) => {
		confirm();
		this.setState({ searchText: selectedKeys[0] });
	};

	handleReset = clearFilters => {
		clearFilters();
		this.setState({ searchText: "" });
	};

	render = () => {
		const columns = [
			{
				title: "SeasonId",
				dataIndex: "seasonId",
				key: "seasonId",
				...this.getColumnSearchProps("seasonId"),
			},
			{
				title: "Start Date",
				dataIndex: "startDate",
				key: "startDate",
				...this.getColumnSearchProps("startDate"),
			},
			{
				title: "End Date",
				dataIndex: "endDate",
				key: "endDate",
				...this.getColumnSearchProps("endDate"),
			},
			{
				title: "Members",
				dataIndex: "members",
				key: "members",
				...this.getColumnSearchProps("members"),
			},
			{
				title: "Action",
				key: "action",
				render: (_, record) => (
					<span>
						<a href="javascript:;">Invite {record.name}</a>
						<Divider type="vertical" />
						<a href="javascript:;">Delete</a>
					</span>
				),
			},
		];

		return (
			<Fragment>
				<Helmet title={title} />
				<Card title={title}>
					<Table
						columns={columns}
						dataSource={data}
						pagination={false}
						bordered={true}
					/>
				</Card>
			</Fragment>
		);
	};
}

export default ViewSeasons;
