import React from "react";
import DynamicImport from "components/Body/DynamicImport";

const NewSeasonPage = props => (
	<DynamicImport {...props} file="Forms/Season/NewSeasonForm" />
);

export default NewSeasonPage;
