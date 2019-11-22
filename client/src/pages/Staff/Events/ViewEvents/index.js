import React from "react";
import DynamicImport from "components/Body/DynamicImport";

const ViewEventsPage = props => (
	<DynamicImport {...props} file="Body/ViewEvents" />
);

export default ViewEventsPage;
