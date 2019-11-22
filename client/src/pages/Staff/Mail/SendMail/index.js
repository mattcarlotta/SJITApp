import React from "react";
// import { SendMailForm } from "containers/Forms";
import { DynamicImport } from "components/Body";

const SendMailPage = props => (
	<DynamicImport {...props} file="Forms/Mail/SendMailForm" />
);

export default SendMailPage;
