import React from "react";
import DynamicImport from "components/Body/DynamicImport";

const NewEventPage = props => (
	<DynamicImport {...props} file="Forms/Event/NewEventForm" />
);

export default NewEventPage;
