import styled from "styled-components";

export default styled.div`
	color: #282c34;
	padding: ${({ icon }) => (icon ? "14px 0 14px 48px" : "8px 8px 8px 14px")};
	font-size: 20px;
	-webkit-box-align: center;
	align-items: center;
	display: flex;
	flex-wrap: wrap;
	position: relative;
	box-sizing: border-box;
	flex: 1 1 0%;
	overflow: hidden;
	${({ value }) => (value ? "color: #282c34 !important;" : null)};
`;
