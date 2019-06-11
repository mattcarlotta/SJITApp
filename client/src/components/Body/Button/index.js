import styled from "styled-components";
import StyledButton from "./Button";

const Button = styled(StyledButton)`
	cursor: pointer;
	color: ${props => (!props.primary && !props.danger ? "#025f6d" : "#ffffff")};
	background-color: ${props => {
		if (props.primary) return "#025f6d";
		if (props.danger) return "#f56342";
		return "transparent";
	}};
	text-decoration: none;
	margin-right: 20px;
	transition: all 0.2s ease-in-out;
	border-radius: 4px;
	border: 2px solid
		${props => {
			if (props.primary) return "#025f6d";
			if (props.danger) return "#f56342";
			return "#025f6d";
		}};
	width: 100%;
	padding: 16px 18px 17px;
	font-size: 18px;
	letter-spacing: 1px;

	&:hover {
		color: ${props =>
			!props.primary && !props.danger ? "#04515d" : "#ffffff"};
		background-color: ${props => {
			if (props.primary) return "#04515d";
			if (props.danger) return "#d24b2e";
			return "transparent";
		}};
		border: 2px solid ${props => (props.danger ? "#d24b2e" : "#04515d")};
	}

	&:focus {
		outline: 0;
	}
`;

export default Button;
