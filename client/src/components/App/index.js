import React from "react";
// import PropTypes from 'prop-types';
import { FaBars } from "react-icons/fa";
import { Layout, Icon } from "antd";
// import { Switch, Route } from 'react-router-dom';
import { SideMenu, Title } from "components/Body";
import { RightMenu } from "components/Navigation";

const { Content, Header } = Layout;

const App = ({ firstName, lastName }) => (
	<Layout>
		<SideMenu />
		<Layout>
			<Header style={{ background: "#fff", padding: 0 }}>
				<FaBars />
				<RightMenu />
			</Header>
			<Content>
				<Title>
					Welcome {firstName}
					{lastName}!
				</Title>
			</Content>
		</Layout>
	</Layout>
);

// App.propTypes = {
//   collapseSideNav: PropTypes.bool.isRequired,
//   saveSidebarState: PropTypes.func.isRequired,
//   children: PropTypes.node,
// };

export default App;
