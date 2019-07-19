import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import Helmet from "react-helmet";
import { connect } from "react-redux";
import { push } from "connected-react-router";
import { Divider, Table, Input, Icon, Card } from "antd";
import { FaCalendarPlus } from "react-icons/fa";
import moment from "moment";
import { Button, Float } from "components/Body";
import { fetchSeasons } from "actions/Seasons";

const title = "View Seasons";

const displayDate = date => <span>{moment(date).format("l")}</span>;

class ViewSeasons extends Component {
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
		const { data, isLoading } = this.props;

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
				title: "Action",
				key: "action",
				render: () => (
					<span>
						<a href="javascript:;">Edit</a>
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
					<div
						style={{
							display: "flex",
							justifyContent: "flex-end",
							width: "100%",
						}}
					>
						<Button
							primary
							width="180px"
							marginRight="0px"
							padding="5px 10px"
							style={{ marginBottom: 10 }}
							onClick={() => this.props.push("/employee/seasons/create")}
						>
							<FaCalendarPlus style={{ position: "relative", top: 2 }} />
							&nbsp; New Season
						</Button>
					</div>
					{isLoading ? (
						<p>Loading...</p>
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
	fetchSeasons: PropTypes.func.isRequired,
	isLoading: PropTypes.bool.isRequired,
	push: PropTypes.func,
};

const mapStateToProps = state => ({
	isLoading: state.seasons.isLoading,
	data: state.seasons.data,
});

const mapDispatchToProps = {
	fetchSeasons,
	push,
};

export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(ViewSeasons);
