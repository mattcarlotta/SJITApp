import React from "react";
import DynamicImport from "components/Body/DynamicImport";

const ViewSchedulePage = props => (
	<DynamicImport {...props} file="Body/ViewSchedule" />
);

export default ViewSchedulePage;
