import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import Helmet from "react-helmet";
import moment from "moment";
import { connect } from "react-redux";
import { push } from "connected-react-router";
import { Card, Divider, Icon, Input, Popconfirm, Table } from "antd";
import {
	FaCalendarPlus,
	FaEdit,
	FaExclamationCircle,
	FaSearch,
	FaTrash,
} from "react-icons/fa";
import { Button, FlexEnd, LoadingTable } from "components/Body";
import { deleteSeason, fetchSeasons } from "actions/Seasons";

const title = "View Seasons";

const displayDate = date => <span>{moment(date).format("l")}</span>;

export class ViewSeasons extends Component {
	state = {
		searchText: "",
	};

	componentDidMount = () => {
		if (this.props.isLoading) this.props.fetchSeasons();
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

	handleSearch = (selectedKeys, confirm) => {
		confirm();
		this.setState({ searchText: selectedKeys[0] });
	};

	handleReset = clearFilters => {
		clearFilters();
		this.setState({ searchText: "" });
	};

	render = () => {
		const { data, isLoading, push } = this.props;

		const columns = [
			{
				title: "Season Id",
				dataIndex: "seasonId",
				key: "seasonId",
				...this.getColumnSearchProps("seasonId"),
			},
			{
				title: "Start Date",
				dataIndex: "startDate",
				key: "startDate",
				render: displayDate,
				...this.getColumnSearchProps("startDate"),
			},
			{
				title: "End Date",
				dataIndex: "endDate",
				key: "endDate",
				render: displayDate,
				...this.getColumnSearchProps("endDate"),
			},
			{
				title: "Members",
				dataIndex: "members",
				key: "members",
				...this.getColumnSearchProps("members"),
			},
			{
				title: "Actions",
				key: "action",
				render: (_, record) => (
					<Fragment>
						<Button
							primary
							display="inline-block"
							width="100px"
							padding="2px 0px 0 3px"
							marginRight="0px"
							onClick={() =>
								this.props.push(`/employee/seasons/edit/${record.seasonId}`)
							}
						>
							<FaEdit style={{ position: "relative", top: 2 }} /> Edit
						</Button>
						<Divider type="vertical" />
						<Popconfirm
							placement="top"
							title="Are you sure? This is irreversible."
							icon={
								<Icon
									component={FaExclamationCircle}
									style={{ color: "red" }}
								/>
							}
							onConfirm={() => this.props.deleteSeason(record.seasonId)}
						>
							<Button
								danger
								display="inline-block"
								width="110px"
								padding="2px 0 0 0px"
								marginRight="0px"
							>
								<FaTrash style={{ position: "relative", top: 2 }} /> Delete
							</Button>
						</Popconfirm>
					</Fragment>
				),
			},
		];

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
							onClick={() => push("/employee/seasons/create")}
						>
							<FaCalendarPlus style={{ position: "relative", top: 2 }} />
							&nbsp; New Season
						</Button>
					</FlexEnd>
					{isLoading ? (
						<LoadingTable />
					) : (
						<Table
							columns={columns}
							dataSource={data}
							pagination={false}
							bordered={true}
							rowKey="_id"
						/>
					)}
				</Card>
			</Fragment>
		);
	};
}

ViewSeasons.propTypes = {
	data: PropTypes.arrayOf(
		PropTypes.shape({
			_id: PropTypes.any,
			members: PropTypes.number,
			seasonId: PropTypes.string,
			startDate: PropTypes.string,
			endDate: PropTypes.string,
		}),
	),
	deleteSeason: PropTypes.func,
	fetchSeasons: PropTypes.func.isRequired,
	isLoading: PropTypes.bool.isRequired,
	push: PropTypes.func,
};

const mapStateToProps = state => ({
	isLoading: state.seasons.isLoading,
	data: state.seasons.data,
});

const mapDispatchToProps = {
	deleteSeason,
	fetchSeasons,
	push,
};

export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(ViewSeasons);
