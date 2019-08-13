import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Menu, Dropdown } from "antd";
import { FaUserCircle, FaSignOutAlt, FaCogs } from "react-icons/fa";
import { signoutUser } from "actions/Auth";
import { MenuButton, MenuItemContainer, MenuItemTitle } from "components/Body";

const MenuItem = Menu.Item;

export const AccountButton = ({ firstName, lastName, push, signoutUser }) => {
	const options = (
		<Menu style={{ padding: 0 }}>
			<MenuItem>
				<MenuButton height="30px" onClick={() => push("/employee/settings")}>
					<MenuItemContainer>
						<FaCogs />
						<MenuItemTitle>Settings</MenuItemTitle>
					</MenuItemContainer>
				</MenuButton>
			</MenuItem>
			<MenuItem>
				<MenuButton height="30px" onClick={signoutUser}>
					<MenuItemContainer>
						<FaSignOutAlt />
						<MenuItemTitle>Logout</MenuItemTitle>
					</MenuItemContainer>
				</MenuButton>
			</MenuItem>
		</Menu>
	);

	return (
		<Dropdown overlay={options} trigger={["click"]} placement="bottomRight">
			<MenuButton hoverable style={{ marginRight: 38 }}>
				<FaUserCircle style={{ position: "relative", top: 3 }} />
				<MenuItemTitle>
					{firstName} {lastName}
				</MenuItemTitle>
			</MenuButton>
		</Dropdown>
	);
};

AccountButton.propTypes = {
	firstName: PropTypes.string.isRequired,
	lastName: PropTypes.string.isRequired,
	push: PropTypes.func,
	signoutUser: PropTypes.func.isRequired,
};

export default connect(
	null,
	{ signoutUser },
)(AccountButton);
