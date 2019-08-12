/* istanbul ignore file */
import styled from "styled-components";
import LoadingTable from "./LoadingTable";

export default styled(LoadingTable)`
	height: 290px;
	width: 100%;
	border: 1px solid #e8e8e8;
	margin-bottom: 40px;
	-webkit-animation: fadeIn 1s 0s ease-in-out forwards;
	animation: fadeIn 1s 0s ease-in-out forwards;

	& .thead {
		height: 60px;
		width: 100%;
		background-color: #fafafa;
	}

	& .tbody {
		height: 230px;
		width: 100%;
		-webkit-animation: pulse 1.2s infinite;
		animation: pulse 1.2s infinite;
	}
`;
