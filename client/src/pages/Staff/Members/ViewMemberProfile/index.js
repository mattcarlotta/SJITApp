import React from "react";
import DynamicImport from "components/Body/DynamicImport";

const ViewMemberProfilePage = props => (
	<DynamicImport {...props} file="Body/ViewMemberProfile" />
);

export default ViewMemberProfilePage;
