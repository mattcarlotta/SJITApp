import React from "react";
import DynamicImport from "components/Body/DynamicImport";

const ViewApFormPage = props => (
	<DynamicImport {...props} file="Forms/Form/ViewApForm" />
);

export default ViewApFormPage;
