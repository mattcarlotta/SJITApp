import React from "react";
// import PropTypes from 'prop-types';
import { FaBars } from "react-icons/fa";
import { Layout, Icon } from "antd";
// import { Switch, Route } from 'react-router-dom';
import { Title } from "components/Body";
import { RightMenu, SideMenu } from "components/Navigation";

const App = ({ firstName, lastName }) => (
	<Layout>
		<SideMenu />
		<Layout>
			<Layout.Header style={{ background: "#fff", padding: 0 }}>
				<FaBars />
				<RightMenu />
			</Layout.Header>
			<Layout.Content>
				<Title>
					Welcome {firstName}
					{lastName}!
				</Title>
			</Layout.Content>
		</Layout>
	</Layout>
);

// App.propTypes = {
//   collapseSideNav: PropTypes.bool.isRequired,
//   saveSidebarState: PropTypes.func.isRequired,
//   children: PropTypes.node,
// };

export default App;
