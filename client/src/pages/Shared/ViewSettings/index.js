import React from "react";
import DynamicImport from "components/Body/DynamicImport";

const ViewSettingsPage = props => (
	<DynamicImport {...props} file="Body/ViewSettings" />
);

export default ViewSettingsPage;
