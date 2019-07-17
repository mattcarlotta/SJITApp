import React, { Component } from "react";
import PropTypes from "prop-types";
import { Layout } from "antd";
import AppRoutes from "routes/appRoutes";
import { LeftMenu, RightMenu, SideMenu } from "components/Navigation";

const Header = Layout.Header;
const Content = Layout.Content;

const TABS = ["dashboard", "games", "forms", "schedule", "settings"];

const selectedTab = path => TABS.filter(tab => path.indexOf(tab) >= 1);

class App extends Component {
	state = {
		isCollapsed: false,
		selectedKey: selectedTab(this.props.location.pathname),
	};

	shouldComponentUpdate = (nextProps, nextState) =>
		this.state.isCollapsed !== nextState.isCollapsed ||
		this.props.location.pathname !== nextProps.location.pathname ||
		this.state.selectedKey !== nextState.selectedKey;

	static getDerivedStateFromProps = props => ({
		selectedKey: selectedTab(props.location.pathname),
	});

	onHandleTabClick = ({ key }) => {
		this.props.push(`/employee/${key}`);
	};

	toggleSideMenu = () =>
		this.setState(prevState => ({
			isCollapsed: !prevState.isCollapsed,
		}));

	render = () => (
		<div className="app">
			<Layout>
				<SideMenu {...this.state} onHandleTabClick={this.onHandleTabClick} />
				<Layout>
					<Header>
						<LeftMenu toggleSideMenu={this.toggleSideMenu} />
						<RightMenu {...this.props} />
					</Header>
					<Content>
						<AppRoutes {...this.props} />
					</Content>
				</Layout>
			</Layout>
		</div>
	);
}

App.propTypes = {
	firstName: PropTypes.string.isRequired,
	lastName: PropTypes.string.isRequired,
	location: PropTypes.shape({
		pathname: PropTypes.string,
	}).isRequired,
	match: PropTypes.shape({
		url: PropTypes.string,
	}).isRequired,
};

export default App;
