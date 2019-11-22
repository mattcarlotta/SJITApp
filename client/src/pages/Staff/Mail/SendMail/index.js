import React from "react";
import DynamicImport from "components/Body/DynamicImport";

const SendMailPage = props => (
	<DynamicImport {...props} file="Forms/Mail/SendMailForm" />
);

export default SendMailPage;
