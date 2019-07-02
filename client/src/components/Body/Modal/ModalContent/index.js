import styled from "styled-components";

const ModalContent = styled.div`
	max-width: ${({ maxWidth }) => maxWidth || "500px"};
	flex: 0 1 auto;
	max-height: calc(100% - 96px);
	padding: 25px;
	display: flex;
	position: relative;
	overflow-y: auto;
	flex-direction: column;
	box-shadow: 0px 11px 15px -7px rgba(0, 0, 0, 0.2),
		0px 24px 38px 3px rgba(0, 0, 0, 0.14), 0px 9px 46px 8px rgba(0, 0, 0, 0.12);
	border-radius: 10px;
	background-color: #fff;
	text-align: left;
`;

export default ModalContent;
