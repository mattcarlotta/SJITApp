import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { Layout, Menu, Icon } from "antd";
import {
	FaThLarge,
	FaClock,
	FaFileSignature,
	FaCogs,
	FaCalendarAlt,
	FaCalendarPlus,
	FaUsers,
	FaEnvelope,
	FaMailBulk,
	FaQuestionCircle,
	FaConciergeBell,
} from "react-icons/fa";
import { MdEvent, MdNoteAdd } from "react-icons/md";
import SharksLogo from "images/sharksLogo.svg";
import { Center, Legal, Tab, Title } from "components/Body";

const Sider = Layout.Sider;
const MenuItem = Menu.Item;
const SubMenu = Menu.SubMenu;
const Divider = Menu.Divider;

const tabs = [
	{ component: FaThLarge, key: "dashboard", tab: "dashboard" },
	{ component: MdEvent, key: "events", tab: "events" },
	{ component: FaFileSignature, key: "forms", tab: "forms" },
	{ component: FaClock, key: "schedule", tab: "schedule" },
	{
		component: FaCalendarAlt,
		key: "seasons",
		tab: "seasons",
		options: [
			{
				key: "seasons/create",
				component: FaCalendarPlus,
				tab: "New Season",
			},
			{
				key: "seasons/members",
				component: FaUsers,
				tab: "Members",
			},
		],
	},
	{
		component: FaEnvelope,
		key: "templates",
		tab: "templates",
		options: [
			{
				key: "templates/create",
				component: MdNoteAdd,
				tab: "New Template",
			},
			{
				key: "templates/view",
				component: FaMailBulk,
				tab: "All Templates",
			},
		],
	},
	{ divider: true, key: "accounting" },
	{ component: FaCogs, key: "settings", tab: "settings" },
	{ component: FaQuestionCircle, key: "help", tab: "help" },
	{ component: FaConciergeBell, key: "contact", tab: "contact us" },
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
			{tabs.map(({ component, divider, key, tab, options }) =>
				divider ? (
					<Divider
						key={key}
						style={{ backgroundColor: "#3d8792", margin: "20px 0" }}
					/>
				) : !options ? (
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
						{options.map(({ component, tab, key }) => (
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
