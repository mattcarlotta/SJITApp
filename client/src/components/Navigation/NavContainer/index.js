import styled from 'styled-components';

const NavContainer = styled.div`
	@media (max-width: 725px) {
		display: block;
	}

	display: -ms-flexbox;
	display: flex;
	-ms-flex-preferred-size: auto;
	flex-basis: auto;
	-ms-flex-preferred-size: 100%;
	flex-basis: 100%;
	-ms-flex-positive: 1;
	flex-grow: 1;
	-ms-flex-align: center;
	align-items: center;
`;

export default NavContainer;
