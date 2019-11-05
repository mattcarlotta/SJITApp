import React from "react";
import {
	Link,
	NavBar,
	NavBarContainer,
	NavContainer,
	Nav,
	NavItem,
	NavTitle,
} from "components/Navigation";

const navitems = [
	{ to: "/", text: "Home" },
	{ to: "/about", text: "About" },
	{ to: "/contact", text: "Contact" },
	{ to: "/employee/login", text: "Employee Portal" },
];

const Header = () => (
	<NavBarContainer>
		<NavBar>
			<NavTitle>
				<Link to="/">SJS Ice Team</Link>
			</NavTitle>
			<NavContainer>
				<Nav>
					{navitems.map(({ to, text }) => (
						<NavItem key={text}>
							<Link white to={to}>
								{text}
							</Link>
						</NavItem>
					))}
				</Nav>
			</NavContainer>
		</NavBar>
	</NavBarContainer>
);

export default Header;
