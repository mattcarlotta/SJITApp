import React, { Component } from "react";
import PropTypes from "prop-types";
import { Layout } from "antd";
import { AppRoutes } from "routes";
import { BuildVersion } from "components/Body";
import { LeftMenu, RightMenu, SideMenu } from "components/Navigation";

const Header = Layout.Header;
const Content = Layout.Content;

const TABS = [
	"dashboard",
	"events/create",
	"events/edit",
	"events/viewall",
	"forms/create",
	"forms/viewall",
	"members/authorizations/viewall",
	"members/create",
	"members/viewall",
	"schedule",
	"seasons/create",
	"seasons/viewall",
	"mail/create",
	"mail/viewall",
	"settings",
	"help",
	"contact-us",
	"privacy",
	"licensing",
];

const ROOTTABS = ["events", "forms", "mail", "members", "seasons"];

const selectedTab = path => TABS.filter(tab => path.indexOf(tab) >= 1);

const openedKey = path => {
	const opened = ROOTTABS.find(tab => path.includes(tab));

	return opened ? [opened] : [];
};

class App extends Component {
	constructor(props) {
		super(props);

		const {
			location: { pathname },
		} = props;

		this.state = {
			isCollapsed: false,
			hideSideBar: false,
			openKeys: openedKey(pathname),
			storedKeys: openedKey(pathname),
			selectedKey: selectedTab(pathname),
		};
	}

	componentDidUpdate = (prevProps, prevState) => {
		const { pathname } = this.props.location;
		const { isCollapsed } = this.state;

		if (prevProps.location.pathname !== pathname) {
			this.setState(prevState => ({
				openKeys: !prevState.isCollapsed ? openedKey(pathname) : [],
				selectedKey: selectedTab(pathname),
			}));
		}

		if (prevState.isCollapsed !== isCollapsed && !isCollapsed) {
			this.setState({
				openKeys: openedKey(pathname),
			});
		}
	};

	handleBreakpoint = isBroken => {
		this.setState(prevState => ({
			...prevState,
			isCollapsed: isBroken,
			hideSideBar: isBroken,
			openKeys: isBroken ? [] : prevState.storedKeys,
		}));
	};

	handleOpenMenuChange = openKeys => {
		const latestOpenKey = openKeys.find(
			key => this.state.openKeys.indexOf(key) === -1,
		);

		const containsLatestKey = ROOTTABS.indexOf(latestOpenKey) === -1;

		this.setState({ openKeys: containsLatestKey ? openKeys : [latestOpenKey] });
	};

	handleTabClick = ({
		key,
		item: {
			props: { value },
		},
	}) => {
		this.setState(() => {
			this.props.push(`/employee/${value}`);
			const openKeys = ROOTTABS.find(tab => key.includes(tab));

			return {
				openKeys: openKeys ? [openKeys] : [],
			};
		});
	};

	toggleSideMenu = () =>
		this.setState(prevState => ({
			openKeys: [],
			isCollapsed: !prevState.isCollapsed,
		}));

	render = () => (
		<div id="app">
			<Layout>
				<SideMenu
					{...this.state}
					role={this.props.role}
					onHandleBreakpoint={this.handleBreakpoint}
					onHandleTabClick={this.handleTabClick}
					onHandleOpenMenuChange={this.handleOpenMenuChange}
				/>
				<Layout>
					<Header>
						{!this.state.hideSideBar && (
							<LeftMenu toggleSideMenu={this.toggleSideMenu} />
						)}
						<RightMenu {...this.props} />
					</Header>
					<Content>
						<AppRoutes {...this.props} />
						<BuildVersion />
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
