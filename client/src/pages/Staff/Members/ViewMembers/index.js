import React from "react";
import DynamicImport from "components/Body/DynamicImport";

const ViewMembersPage = props => (
	<DynamicImport {...props} file="Body/ViewMembers" />
);

export default ViewMembersPage;
