import React from "react";
// import { EventScheduleForm } from "containers/Forms";
import { DynamicImport } from "components/Body";

// const EventScheduleFormPage = props => <EventScheduleForm {...props} />;

const EventScheduleFormPage = props => (
	<DynamicImport {...props} file="Forms/Event/EventScheduleForm" />
);

export default EventScheduleFormPage;
