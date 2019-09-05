/* istanbul ignore file */
import styled from "styled-components";
import LoadingScheduleForm from "./LoadingScheduleForm";

export default styled(LoadingScheduleForm)`
	padding: 15px;
	margin-bottom: 25px;
	height: 100%;
	border-bottom: 1px solid rgb(232, 237, 242);

	& .loading {
		height: 190px;
		border-radius: 3px;
		-webkit-animation: pulse 1.2s infinite;
		animation: pulse 1.2s infinite;
		box-sizing: border-box;
	}

	& .legend {
		width: 225px;
		margin-left: 5px;
		margin-bottom: 10px;
	}

	& .gamedetails {
		webkit-flex: 1 0 auto;
		-ms-flex: 1 0 auto;
		flex: 1 0 auto;
		margin: 0px 20px 10px 20px;
	}

	& .form {
		width: 98%;
		height: 430px;
		display: -webkit-box;
		display: -webkit-flex;
		display: -ms-flexbox;
		display: flex;
		position: relative;
		white-space: normal;
		padding: 8px;
		margin: 5px;
	}
`;
