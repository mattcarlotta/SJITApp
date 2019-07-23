import React, { PureComponent, Fragment } from "react";
import PropTypes from "prop-types";
import Helmet from "react-helmet";
import moment from "moment";
import { connect } from "react-redux";
import { push } from "connected-react-router";
import { Card } from "antd";
import { FaCalendarPlus } from "react-icons/fa";
import { Button, FlexEnd } from "components/Body";
import { Table } from "containers/Body";
import { deleteSeason, fetchSeasons } from "actions/Seasons";

const title = "View Seasons";

const displayDate = date => <span>{moment(date).format("l")}</span>;

const columns = [
	{
		title: "Season Id",
		dataIndex: "seasonId",
		key: "seasonId",
	},
	{
		title: "Start Date",
		dataIndex: "startDate",
		key: "startDate",
		render: displayDate,
	},
	{
		title: "End Date",
		dataIndex: "endDate",
		key: "endDate",
		render: displayDate,
	},
	{
		title: "Members",
		dataIndex: "members",
		key: "members",
	},
];

export class ViewSeasons extends PureComponent {
	componentDidMount = () => {
		if (this.props.isLoading) this.props.fetchSeasons();
	};

	render = () => {
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
							onClick={() => this.props.push("/employee/seasons/create")}
						>
							<FaCalendarPlus style={{ position: "relative", top: 2 }} />
							&nbsp; New Season
						</Button>
					</FlexEnd>
					<Table
						columns={columns}
						data={this.props.data}
						deleteAction={this.props.deleteSeason}
						editLocation="seasons"
						isLoading={this.props.isLoading}
						push={this.props.push}
					/>
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
