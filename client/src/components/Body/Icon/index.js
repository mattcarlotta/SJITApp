/* istanbul ignore file */
import styled from "styled-components";
import Icon from "./Icon";

export default styled(Icon)`
	display: flex;
	position: absolute;
	padding-left: 16px;
	transition: all 0.2s ease;
	z-index: 2;

	svg {
		color: ${({ color }) => color || "#d3dce6"};
	}
`;
