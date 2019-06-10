import React from 'react';
import SapLogoCenter from 'images/SAPCenterLogo.png';
import SharksLogo from 'images/SharksLogo.png';
import {
	Link,
	NavBar,
	NavBarContainer,
	NavContainer,
	Nav,
	NavItem,
	NavTitle,
} from '../index.js';

const navitems = [
	{ to: '/', text: 'Home' },
	{ to: '/about', text: 'About' },
	{ to: '/contact', text: 'Contact' },
	{ to: '/employee', text: 'Employee Portal' },
];

const Header = () => (
	<NavBarContainer>
		<NavBar>
			<NavTitle>
				<Link to="/">Sharks Ice Team</Link>
			</NavTitle>
			<NavContainer>
				<Nav>
					{navitems.map(({ to, text }) => (
						<NavItem key={text}>
							<Link color="primary" to={to}>
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
