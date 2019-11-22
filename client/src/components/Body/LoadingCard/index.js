/* istanbul ignore file */
import styled from "styled-components";
import LoadingCard from "./LoadingCard";

export default styled(LoadingCard)`
	height: ${({ height }) => height || "400px"};
	width: 100%;
	-webkit-animation: pulse 1.2s infinite;
	animation: pulse 1.2s infinite;
`;
