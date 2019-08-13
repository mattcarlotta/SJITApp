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
	"members/authorizations/viewall",
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

const openedKey = path => {
	const opened = ROOTTABS.find(tab => path.includes(tab));

	return opened ? [opened] : [""];
};

class App extends Component {
	constructor(props) {
		super(props);

		const {
			location: { pathname },
		} = props;

		this.state = {
			isCollapsed: false,
			openKeys: openedKey(pathname),
			storedKeys: openedKey(pathname),
			selectedKey: selectedTab(pathname),
		};
	}

	static getDerivedStateFromProps = props => ({
		selectedKey: selectedTab(props.location.pathname),
	});

	handleOpenMenuChange = currentKeys => {
		const openKeys = currentKeys.length > 1 ? [currentKeys[1]] : [""];

		this.setState({
			openKeys,
			storedKeys: openKeys,
		});
	};

	handleTabClick = ({ key }) => {
		this.setState(prevState => {
			this.props.push(`/employee/${key}`);

			const openKeys = ROOTTABS.some(tab => key.includes(tab))
				? prevState.openKeys
				: [""];

			return {
				openKeys,
				storedKeys: openKeys,
			};
		});
	};

	toggleSideMenu = () =>
		this.setState(prevState => ({
			openKeys: !prevState.isCollapsed ? [""] : prevState.storedKeys,
			isCollapsed: !prevState.isCollapsed,
		}));

	render = () => (
		<div id="app">
			<Layout>
				<SideMenu
					{...this.state}
					onHandleTabClick={this.handleTabClick}
					onHandleOpenMenuChange={this.handleOpenMenuChange}
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
