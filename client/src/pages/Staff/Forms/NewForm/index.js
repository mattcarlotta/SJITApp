import React from "react";
import DynamicImport from "components/Body/DynamicImport";

const NewFormPage = props => (
	<DynamicImport {...props} file="Forms/Form/NewForm" />
);

export default NewFormPage;
