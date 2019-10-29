import React, { Fragment } from "react";
import Helmet from "react-helmet";
import { Row } from "antd";
import Events from "./Events";
import Forms from "./Forms";
import Availability from "./Availability";
import EventDistribution from "./EventDistribution";

const ViewDashboard = () => (
	<Fragment>
		<Helmet title="Dashboard" />
		<Row gutter={[32, 32]}>
			<Events />
			<Forms />
			<Availability />
			<EventDistribution />
		</Row>
	</Fragment>
);

export default ViewDashboard;
