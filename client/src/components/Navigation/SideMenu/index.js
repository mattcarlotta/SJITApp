import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { Layout, Menu, Icon } from "antd";
import { Center, FadeIn, Legal, Tab, Title } from "components/Body";
import { Link } from "components/Navigation";
import { StaffRoutes, EmployeeRoutes } from "./Tabs";

const Sider = Layout.Sider;
const MenuItem = Menu.Item;
const SubMenu = Menu.SubMenu;
const Divider = Menu.Divider;

const SideMenu = ({
	role,
	isCollapsed,
	onHandleBreakpoint,
	onHandleTabClick,
	onHandleOpenMenuChange,
	openKeys,
	selectedKey,
}) => {
	const TABS = role !== "employee" ? StaffRoutes : EmployeeRoutes;
	return (
		<Sider
			breakpoint="xl"
			width={266}
			trigger={null}
			onBreakpoint={onHandleBreakpoint}
			collapsible
			collapsed={isCollapsed}
		>
			<Center
				style={{
					height: 64,
					backgroundColor: "#025f6d",
					borderBottom: "1px solid #3d8792",
				}}
			>
				<Link to="/" style={{ padding: 0, margin: 0 }}>
					<div css="text-align:center;padding: 12px 18px 0 18px;">
						{isCollapsed ? (
							<FadeIn timing="0.4s">
								<div css="border: 1px solid #fff;">
									<Title
										style={{
											color: "#fff",
											margin: 0,
											padding: "4px 0",
											fontSize: 26,
										}}
									>
										IT
									</Title>
								</div>
							</FadeIn>
						) : (
							<Title
								style={{
									color: "#fff",
									margin: 0,
									padding: "4px 0",
									fontSize: 26,
								}}
							>
								Ice Team
							</Title>
						)}
					</div>
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
				{TABS.map(({ component, divider, key, tab, submenu }) =>
					divider ? (
						<Divider
							key={key}
							style={{ backgroundColor: "#3d8792", margin: "20px 0" }}
						/>
					) : !submenu ? (
						<MenuItem value={key} key={key}>
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
							{submenu.map(({ component, disabled, tab, value, key }) => (
								<MenuItem disabled={disabled} value={value} key={key}>
									<Icon component={component} />
									<Tab>{tab}</Tab>
								</MenuItem>
							))}
						</SubMenu>
					),
				)}
			</Menu>
			{!isCollapsed && <Legal>© 2019 Matt Carlotta</Legal>}
		</Sider>
	);
};

SideMenu.propTypes = {
	isCollapsed: PropTypes.bool.isRequired,
	onHandleBreakpoint: PropTypes.func.isRequired,
	onHandleOpenMenuChange: PropTypes.func.isRequired,
	onHandleTabClick: PropTypes.func.isRequired,
	openKeys: PropTypes.arrayOf(PropTypes.string),
	role: PropTypes.string.isRequired,
	selectedKey: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default SideMenu;
