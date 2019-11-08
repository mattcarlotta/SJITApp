import React, { Fragment } from "react";
import PropTypes from "prop-types";
import Helmet from "react-helmet";
import { connect } from "react-redux";
import { push } from "connected-react-router";
import { Card } from "antd";
import { FaFolderPlus, FaFolderOpen } from "react-icons/fa";
import { Button, FormatDate, FlexEnd, Table } from "components/Body";
import { deleteSeason, fetchSeasons } from "actions/Seasons";

const title = "Seasons";
const iconStyle = {
	verticalAlign: "middle",
	marginRight: 10,
	fontSize: 20,
};

const columns = [
	{ title: "Season Id", dataIndex: "seasonId", key: "seasonId" },
	{
		title: "Start Date",
		dataIndex: "startDate",
		key: "startDate",
		render: date => (
			<FormatDate
				format="MM/DD/YYYY"
				style={{ padding: 0, margin: 0 }}
				date={date}
			/>
		),
	},
	{
		title: "End Date",
		dataIndex: "endDate",
		key: "endDate",
		render: date => (
			<FormatDate
				format="MM/DD/YYYY"
				style={{ padding: 0, margin: 0 }}
				date={date}
			/>
		),
	},
];

export const ViewSeasons = ({
	data,
	deleteSeason,
	fetchSeasons,
	push,
	...rest
}) => (
	<Fragment>
		<Helmet title={title} />
		<Card
			title={
				<Fragment>
					<FaFolderOpen style={iconStyle} />
					<span css="vertical-align: middle;">{title}</span>
				</Fragment>
			}
		>
			<FlexEnd>
				<Button
					primary
					width="180px"
					marginRight="0px"
					padding="5px 10px"
					style={{ marginBottom: 20 }}
					onClick={() => push("/employee/seasons/create")}
				>
					<FaFolderPlus style={{ position: "relative", top: 2 }} />
					&nbsp; New Season
				</Button>
			</FlexEnd>
			<Table
				{...rest}
				columns={columns}
				data={data}
				deleteAction={deleteSeason}
				editLocation="seasons"
				fetchData={fetchSeasons}
				push={push}
			/>
		</Card>
	</Fragment>
);

ViewSeasons.propTypes = {
	data: PropTypes.arrayOf(
		PropTypes.shape({
			_id: PropTypes.any,
			seasonId: PropTypes.string,
			startDate: PropTypes.string,
			endDate: PropTypes.string,
		}),
	),
	deleteSeason: PropTypes.func,
	fetchSeasons: PropTypes.func.isRequired,
	isLoading: PropTypes.bool.isRequired,
	push: PropTypes.func,
	totalDocs: PropTypes.number.isRequired,
};

const mapStateToProps = state => ({
	data: state.seasons.data,
	isLoading: state.seasons.isLoading,
	totalDocs: state.seasons.totalDocs,
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
