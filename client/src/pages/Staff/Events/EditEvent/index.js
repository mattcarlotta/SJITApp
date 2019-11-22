import React from "react";
import DynamicImport from "components/Body/DynamicImport";

const EditEventPage = props => (
	<DynamicImport {...props} file="Forms/Event/EditEventForm" />
);

export default EditEventPage;
