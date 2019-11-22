import React from "react";
import DynamicImport from "components/Body/DynamicImport";

const ViewFormsPage = props => (
	<DynamicImport {...props} file="Body/ViewForms" />
);

export default ViewFormsPage;
