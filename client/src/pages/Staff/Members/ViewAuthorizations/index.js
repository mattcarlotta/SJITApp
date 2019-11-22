import React from "react";
import DynamicImport from "components/Body/DynamicImport";

const ViewAuthorizationsPage = props => (
	<DynamicImport {...props} file="Body/ViewAuthorizations" />
);

export default ViewAuthorizationsPage;
