import styled from "styled-components";

const NavTitle = styled.div`
	@media (max-width: 725px) {
		display: block;
		width: 100%;
		margin-bottom: 20px;
	}

	letter-spacing: 1px;
	display: flex;
	-ms-flex-direction: column;
	flex-direction: column;
	-ms-flex-pack: center;
	justify-content: center;
	-ms-flex-align: center;
	align-items: center;
	margin-right: 140px;
`;

export default NavTitle;
