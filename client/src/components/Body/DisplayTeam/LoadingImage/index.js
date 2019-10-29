/* istanbul ignore file */
import styled from "styled-components";

export default styled.div`
	height: ${({ height }) => height || "40px"};
	width: ${({ width }) => width || "40px"};
	display: -webkit-inline-box;
	display: -ms-inline-flexbox;
	display: inline-flex;
	vertical-align: middle;
`;
