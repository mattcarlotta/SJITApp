import React from "react";
import PropTypes from "prop-types";
import { Layout, Menu, Icon } from "antd";
import { FaThLarge, FaClock, FaFileSignature, FaCogs } from "react-icons/fa";
import SharksLogo from "images/sharksLogo.svg";
import HockeySticks from "images/hockeySticks";
import { Center, Tab, Title } from "components/Body";

const Sider = Layout.Sider;
const MenuItem = Menu.Item;

const tabs = [
	{ component: FaThLarge, tab: "dashboard" },
	{ component: HockeySticks, tab: "games" },
	{ component: FaFileSignature, tab: "forms" },
	{ component: FaClock, tab: "schedule" },
	{ component: FaCogs, tab: "settings" },
];

const SideMenu = ({ isCollapsed, onHandleTabClick, selectedKey }) => (
	<Sider width={240} trigger={null} collapsible collapsed={isCollapsed}>
		<Center style={{ height: 60 }}>
			<div style={{ paddingTop: isCollapsed ? 10 : 20 }}>
				{isCollapsed ? (
					<img src={SharksLogo} width="50px" />
				) : (
					<Title style={{ color: "#fff", margin: 0 }}>Sharks Ice Team</Title>
				)}
			</div>
		</Center>
		<Menu
			theme="dark"
			mode="inline"
			selectedKeys={selectedKey}
			onSelect={onHandleTabClick}
		>
			{tabs.map(({ component, tab }) => (
				<MenuItem key={tab}>
					<Icon component={component} />
					<Tab>{tab}</Tab>
				</MenuItem>
			))}
		</Menu>
	</Sider>
);

SideMenu.propTypes = {
	isCollapsed: PropTypes.bool.isRequired,
	onHandleTabClick: PropTypes.func.isRequired,
	selectedKey: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default SideMenu;
