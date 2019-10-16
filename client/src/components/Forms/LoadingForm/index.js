/* istanbul ignore file */
import styled from "styled-components";
import LoadingForm from "./LoadingForm";

export default styled(LoadingForm)`
	min-height: 500px;
	width: 100%;

	& .input {
		height: 72px;
		width: 100%;
		margin: 20px 0;
		background-color: #fafafa;
		-webkit-animation: pulse 1.2s infinite;
		animation: pulse 1.2s infinite;
	}
`;
