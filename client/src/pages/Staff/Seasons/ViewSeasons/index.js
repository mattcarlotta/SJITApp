import React from "react";
import DynamicImport from "components/Body/DynamicImport";

const ViewSeasonsPage = props => (
	<DynamicImport {...props} file="Body/ViewSeasons" />
);

export default ViewSeasonsPage;
