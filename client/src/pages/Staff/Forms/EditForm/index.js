import React from "react";
import DynamicImport from "components/Body/DynamicImport";

const EditFormPage = props => (
	<DynamicImport {...props} file="Forms/Form/EditForm" />
);

export default EditFormPage;
