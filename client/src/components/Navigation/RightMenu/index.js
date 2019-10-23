import React from "react";
import { Float } from "components/Body";
import { AccountButton } from "containers/Auth";

const RightMenu = props => (
	<Float
		style={{
			marginLeft: "auto",
			overflow: "hidden",
		}}
		direction="right"
	>
		<AccountButton {...props} />
	</Float>
);

export default RightMenu;
