import styled from "styled-components";

const Nav = styled.ul`
	@media (max-width: 768px) {
		display: flex;
		flex-flow: row;
		flex-direction: row;
		-ms-flex-flow: row;
		-ms-flex-align: center;
		align-items: center;
	}

	display: flex;
	flex-flow: row wrap;
	flex-direction: row;
	-ms-flex-flow: row wrap;
	-ms-flex-align: center;
	align-items: center;
	list-style-type: none;
	margin: 0;
	padding-left: 0;
	margin-bottom: 0;
	margin-right: auto;
`;

export default Nav;
