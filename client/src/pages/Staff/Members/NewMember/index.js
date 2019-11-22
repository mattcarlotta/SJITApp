import React from "react";
import DynamicImport from "components/Body/DynamicImport";

const NewMemberPage = props => (
	<DynamicImport {...props} file="Forms/Member/NewMemberForm" />
);

export default NewMemberPage;
