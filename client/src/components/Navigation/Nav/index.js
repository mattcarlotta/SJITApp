import styled from 'styled-components';

const Nav = styled.ul`
	@media (max-width: 768px) {
		display: flex;
		flex-direction: row;
		-ms-flex-flow: row;
		flex-flow: row;
		-ms-flex-align: center;
		align-items: center;
	}
	display: flex;
	flex-direction: row;
	-ms-flex-flow: row wrap;
	flex-flow: row wrap;
	-ms-flex-align: center;
	align-items: center;
	list-style-type: none;
	margin: 0;
	padding-left: 0;
	margin-bottom: 0;
	list-style: none;
	margin-right: auto;
`;

export default Nav;
