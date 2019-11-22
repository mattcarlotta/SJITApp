import React from "react";
import DynamicImport from "components/Body/DynamicImport";

const ViewLicensePage = props => (
	<DynamicImport {...props} file="Body/ViewLicense" />
);

export default ViewLicensePage;
