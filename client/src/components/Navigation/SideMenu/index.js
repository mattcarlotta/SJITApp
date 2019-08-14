import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { Layout, Menu, Icon } from "antd";
import SharksLogo from "images/misc/sharksLogo.png";
import { Center, Legal, Tab, Title } from "components/Body";
import { Link } from "components/Navigation";
import Tabs from "./Tabs";

const Sider = Layout.Sider;
const MenuItem = Menu.Item;
const SubMenu = Menu.SubMenu;
const Divider = Menu.Divider;

const SideMenu = ({
	isCollapsed,
	onHandleTabClick,
	onHandleOpenMenuChange,
	openKeys,
	selectedKey,
}) => (
	<Sider width={266} trigger={null} collapsible collapsed={isCollapsed}>
		<Center style={{ height: 60 }}>
			<Link to="/" style={{ padding: 0, margin: 0 }}>
				{isCollapsed ? (
					<img
						alt="sharksLogo.png"
						src={SharksLogo}
						width="50px"
						style={{ paddingTop: 10 }}
					/>
				) : (
					<Title style={{ color: "#fff", paddingTop: 20, margin: 0 }}>
						Sharks Ice Team
					</Title>
				)}
			</Link>
		</Center>
		<Menu
			theme="dark"
			mode="inline"
			openKeys={openKeys}
			onOpenChange={onHandleOpenMenuChange}
			onSelect={onHandleTabClick}
			selectedKeys={selectedKey}
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
	onHandleOpenMenuChange: PropTypes.func.isRequired,
	onHandleTabClick: PropTypes.func.isRequired,
	openKeys: PropTypes.arrayOf(PropTypes.string),
	selectedKey: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default SideMenu;
