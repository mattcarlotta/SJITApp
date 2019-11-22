import React from "react";
import DynamicImport from "components/Body/DynamicImport";

const ContactUsPage = props => (
	<DynamicImport {...props} file="Forms/Mail/ContactForm" />
);

export default ContactUsPage;
