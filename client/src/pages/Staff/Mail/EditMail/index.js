import React from "react";
import { DynamicImport } from "components/Body";
// import { EditMailForm } from "containers/Forms";

// const EditEmailPage = props => <EditMailForm {...props} />;

const EditEmailPage = props => (
	<DynamicImport {...props} file="Forms/Mail/EditMailForm" />
);

export default EditEmailPage;
