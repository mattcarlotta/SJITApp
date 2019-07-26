import styled from "styled-components";

export default styled.div`
	cursor: pointer;
	display: inline-block;
	height: 57px;
	width: 100%;
	background-color: white;
	display: flex;
	min-height: 57px;
	box-sizing: border-box;
	border-radius: 4px;
	border: 1px solid ${({ isVisible }) => (isVisible ? "#1e90ff" : "#e5e5e5")};
	transition: all 100ms ease 0s;

	svg {
		color: ${({ isVisible }) => (isVisible ? "#1e90ff" : "#d3dce6")};
	}

	&:hover {
		border: 1px solid ${({ isVisible }) => (isVisible ? "#1e90ff" : "#bfbebe")};
	}

	&:focus {
		border: 1px solid #1e90ff;
		outline: 0;
	}
`;
