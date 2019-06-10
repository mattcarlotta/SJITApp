import styled from 'styled-components';

const NavBarContainer = styled.header`
	width: 100%;
	background-color: #f9f9f9;
	-webkit-box-shadow: 0 0.25rem 0.125rem 0 rgba(0, 0, 0, 0.05);
	box-shadow: 0 0.25rem 0.125rem 0 rgba(0, 0, 0, 0.05);
	position: fixed;
	top: 0;
	z-index: 1000;

	&::after {
		display: block;
		clear: both;
		content: '';
	}
`;

export default NavBarContainer;
