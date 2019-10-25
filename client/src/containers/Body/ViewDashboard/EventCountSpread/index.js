import React, { Component, Fragment } from "react";
// import PropTypes from 'prop-types';
import { connect } from "react-redux";
import { Card, Col } from "antd";
import { FaChartBar } from "react-icons/fa";
import columns from "../Columns";

const newcolumns = {
	...columns,
	xl: 24,
	xxl: 24,
};

const iconStyle = {
	verticalAlign: "middle",
	marginRight: 10,
	fontSize: 22,
};

class EventCountSpreadsheet extends Component {
	componentDidMount = () => {
		// TODO: API call to gather today's event
	};

	render = () => (
		<Col {...newcolumns}>
			<Card
				bodyStyle={{ minHeight: "500px" }}
				title={
					<Fragment>
						<FaChartBar style={iconStyle} />
						<span css="vertical-align: middle;">Event Count Spreadsheet</span>
					</Fragment>
				}
			>
				Event Count Spreadsheet
			</Card>
		</Col>
	);
}

export default connect(null)(EventCountSpreadsheet);
