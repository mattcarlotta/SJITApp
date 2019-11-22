import React from "react";
import DynamicImport from "components/Body/DynamicImport";

const EditEmailPage = props => (
	<DynamicImport {...props} file="Forms/Mail/EditMailForm" />
);

export default EditEmailPage;
