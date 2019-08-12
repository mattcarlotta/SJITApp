import styled from "styled-components";
import Chevron from "./Chevron";

export default styled(Chevron)`
	display: flex;
	box-sizing: border-box;
	padding: 10px;

	svg {
		vertical-align: middle;
		transform: ${({ isVisible }) =>
			isVisible ? "rotate(90deg)" : "rotate(270deg)"};
		transition: 0.2s ease-in-out;
		transition-property: transform;
	}
`;
