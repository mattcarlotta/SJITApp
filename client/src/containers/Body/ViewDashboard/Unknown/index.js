import React, { PureComponent } from "react";
// import PropTypes from 'prop-types';
import { connect } from "react-redux";
import { Card, Col } from "antd";
import columns from "../Columns";

const newcolumns = {
	...columns,
	xl: 24,
	xxl: 24,
};

class Unknown extends PureComponent {
	componentDidMount = () => {
		// TODO: API call to gather today's event
	};

	render = () => (
		<Col {...newcolumns}>
			<Card bodyStyle={{ minHeight: "500px" }} title="Unknown">
				Unknown
			</Card>
		</Col>
	);
}

export default connect(null)(Unknown);
