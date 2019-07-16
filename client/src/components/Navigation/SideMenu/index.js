import React, { Component } from "react";
import { Layout, Menu, Icon } from "antd";
import {
	FaThLarge,
	FaClock,
	FaHockeyPuck,
	FaFileSignature,
} from "react-icons/fa";
import SharksLogo from "images/SharksLogo.png";
import { Center, Tab, Title } from "components/Body";

class SideMenu extends Component {
	state = { selectedKey: ["1"] };

	handleMenuClick = key => {
		this.setState({ selectedKey: [key] });
	};

	render = () => {
		const { isCollapsed } = this.props;

		return (
			<Layout.Sider
				width={240}
				trigger={null}
				collapsible
				collapsed={isCollapsed}
			>
				<Center style={{ height: 60 }}>
					<div style={{ paddingTop: isCollapsed ? 10 : 20 }}>
						{isCollapsed ? (
							<img src={SharksLogo} width="50px" />
						) : (
							<Title style={{ color: "#fff", margin: 0 }}>
								Sharks Ice Team
							</Title>
						)}
					</div>
				</Center>
				<Menu theme="dark" mode="inline" defaultSelectedKeys={["1"]}>
					<Menu.Item key="1">
						<Icon component={FaThLarge} />
						<Tab>Dashboard</Tab>
					</Menu.Item>
					<Menu.Item key="2">
						<Icon component={FaHockeyPuck} />
						<Tab>Games</Tab>
					</Menu.Item>
					<Menu.Item key="3">
						<Icon component={FaFileSignature} />
						<Tab>Forms</Tab>
					</Menu.Item>
					<Menu.Item key="4">
						<Icon component={FaClock} />
						<Tab>Schedule</Tab>
					</Menu.Item>
				</Menu>
			</Layout.Sider>
		);
	};
}

export default SideMenu;
