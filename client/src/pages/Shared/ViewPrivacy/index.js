import React from "react";
import DynamicImport from "components/Body/DynamicImport";

const ViewPrivacyPage = props => (
	<DynamicImport {...props} file="Body/ViewPrivacy" />
);

export default ViewPrivacyPage;
