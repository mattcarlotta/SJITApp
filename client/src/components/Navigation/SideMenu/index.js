import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { Layout, Menu, Icon } from "antd";
import SharksLogo from "images/sharksLogo.svg";
import { Center, Legal, Tab, Title } from "components/Body";
import Tabs from "./Tabs";

const Sider = Layout.Sider;
const MenuItem = Menu.Item;
const SubMenu = Menu.SubMenu;
const Divider = Menu.Divider;

const SideMenu = ({ isCollapsed, onHandleTabClick, selectedKey }) => (
	<Sider width={256} trigger={null} collapsible collapsed={isCollapsed}>
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
			{Tabs.map(({ component, divider, key, tab, submenu }) =>
				divider ? (
					<Divider
						key={key}
						style={{ backgroundColor: "#3d8792", margin: "20px 0" }}
					/>
				) : !submenu ? (
					<MenuItem key={key}>
						<Icon component={component} />
						<Tab>{tab}</Tab>
					</MenuItem>
				) : (
					<SubMenu
						key={key}
						title={
							<Fragment>
								<Icon component={component} />
								<Tab>{tab}</Tab>
							</Fragment>
						}
					>
						{submenu.map(({ component, tab, key }) => (
							<MenuItem key={key}>
								<Icon component={component} />
								<Tab>{tab}</Tab>
							</MenuItem>
						))}
					</SubMenu>
				),
			)}
		</Menu>
		{!isCollapsed && <Legal>© 2019 Carlotta Corp, LLC.</Legal>}
	</Sider>
);

SideMenu.propTypes = {
	isCollapsed: PropTypes.bool.isRequired,
	onHandleTabClick: PropTypes.func.isRequired,
	selectedKey: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default SideMenu;
