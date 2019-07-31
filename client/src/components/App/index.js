import React, { Component } from "react";
import PropTypes from "prop-types";
import { Layout } from "antd";
import { AppRoutes } from "routes";
import { LeftMenu, RightMenu, SideMenu } from "components/Navigation";

const Header = Layout.Header;
const Content = Layout.Content;

const TABS = [
	"dashboard",
	"events/create",
	"events/viewall",
	"forms/create",
	"forms/viewall",
	"members/create",
	"members/viewall",
	"schedule",
	"seasons/create",
	"seasons/viewall",
	"templates/create",
	"templates/viewall",
	"settings",
	"help",
	"contact",
];

const ROOTTABS = ["events", "forms", "members", "seasons", "templates"];

const selectedTab = path => TABS.filter(tab => path.indexOf(tab) >= 1);

class App extends Component {
	state = {
		isCollapsed: false,
		openKeys: [""],
		selectedKey: selectedTab(this.props.location.pathname),
	};

	static getDerivedStateFromProps = props => ({
		selectedKey: selectedTab(props.location.pathname),
	});

	onHandleOpenMenuChange = currentKeys => {
		this.setState({
			openKeys: currentKeys.length > 1 ? [currentKeys[1]] : [""],
		});
	};

	onHandleTabClick = ({ key }) => {
		this.setState(prevState => {
			this.props.push(`/employee/${key}`);

			return {
				openKeys: ROOTTABS.some(tab => key.includes(tab))
					? prevState.openKeys
					: [""],
			};
		});
	};

	toggleSideMenu = () =>
		this.setState(prevState => ({
			openKeys: [""],
			isCollapsed: !prevState.isCollapsed,
		}));

	render = () => (
		<div id="app">
			<Layout>
				<SideMenu
					{...this.state}
					onHandleTabClick={this.onHandleTabClick}
					onHandleOpenMenuChange={this.onHandleOpenMenuChange}
				/>
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
	}),
	push: PropTypes.func.isRequired,
	match: PropTypes.shape({
		url: PropTypes.string,
	}).isRequired,
	role: PropTypes.string.isRequired,
};

export default App;
