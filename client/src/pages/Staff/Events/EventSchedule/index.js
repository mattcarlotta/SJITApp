import React from "react";
import DynamicImport from "components/Body/DynamicImport";

const EventScheduleFormPage = props => (
	<DynamicImport {...props} file="Forms/Event/EventScheduleForm" />
);

export default EventScheduleFormPage;
