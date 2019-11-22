import React from "react";
import DynamicImport from "components/Body/DynamicImport";

const DashboardPage = props => (
	<DynamicImport {...props} file="Body/ViewDashboard" />
);

export default DashboardPage;
