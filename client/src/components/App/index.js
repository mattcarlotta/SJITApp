import React from "react";
import { Center } from "components/Body";

const App = ({ firstName, lastName }) => (
	<Center>
		<h1>
			Welcome, {firstName} {lastName}!
		</h1>
	</Center>
);

export default App;
