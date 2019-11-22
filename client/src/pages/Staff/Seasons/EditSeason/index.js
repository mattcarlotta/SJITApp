import React from "react";
import DynamicImport from "components/Body/DynamicImport";

const EditSeasonPage = props => (
	<DynamicImport {...props} file="Forms/Season/EditSeasonForm" />
);

export default EditSeasonPage;
