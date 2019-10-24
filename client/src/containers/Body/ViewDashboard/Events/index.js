import React, { Fragment, Component } from "react";
// import PropTypes from 'prop-types';
import { connect } from "react-redux";
import { Card, Col } from "antd";
import { MdEvent } from "react-icons/md";
import columns from "../Columns";

const iconStyle = {
	verticalAlign: "middle",
	marginRight: 10,
	fontSize: 25,
};

class Events extends Component {
	// state = { selected: "today" };

	componentDidMount = () => {
		// TODO: API call to gather today's event
	};

	render = () => (
		<Col {...columns}>
			<Card
				bodyStyle={{ minHeight: "300px" }}
				title={
					<Fragment>
						<MdEvent style={iconStyle} />
						<span css="vertical-align: middle;">Events</span>
					</Fragment>
				}
			>
				Events
			</Card>
		</Col>
	);
}

export default connect(null)(Events);
