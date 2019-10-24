import React, { Fragment, PureComponent } from "react";
// import PropTypes from 'prop-types';
import { connect } from "react-redux";
import { Card, Col } from "antd";
import { FaUserClock } from "react-icons/fa";
import columns from "../Columns";

const iconStyle = {
	verticalAlign: "middle",
	marginRight: 10,
	fontSize: 22,
};

class Availability extends PureComponent {
	componentDidMount = () => {
		// TODO: API call to gather today's event
	};

	render = () => (
		<Col {...columns}>
			<Card
				bodyStyle={{ minHeight: "300px" }}
				title={
					<Fragment>
						<FaUserClock style={iconStyle} />
						<span css="vertical-align: middle;">Availability</span>
					</Fragment>
				}
			>
				Availability
			</Card>
		</Col>
	);
}

export default connect(null)(Availability);
