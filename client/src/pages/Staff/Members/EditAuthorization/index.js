import React from "react";
import DynamicImport from "components/Body/DynamicImport";

const EditAuthorizationPage = props => (
	<DynamicImport {...props} file="Forms/Member/EditAuthorizationForm" />
);

export default EditAuthorizationPage;
