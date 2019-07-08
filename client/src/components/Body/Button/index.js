import styled from "styled-components";
import StyledButton from "./Button";

const Button = styled(StyledButton)`
	cursor: ${({ disabled }) => (!disabled ? "pointer" : "not-allowed")};
	color: ${props => (!props.primary && !props.danger ? "#025f6d" : "#fff")};
	background-color: ${props => {
		if (props.primary) return "#025f6d";
		if (props.danger) return "#f56342";
		return "transparent";
	}};
	text-transform: ${props => {
		if (props.uppercase) return "uppercase";
		if (props.lowercase) return "lowercase";
		if (props.capitalize) return "capitalize";
		return "none";
	}};
	text-decoration: none;
	margin-right: 20px;
	transition: color 0.2s ease-in-out, background 0.2s ease-in-out,
		border 0.2s ease-in-out;
	border-radius: 4px;
	border: 2px solid
		${props => {
			if (props.primary) return "#025f6d";
			if (props.danger) return "#f56342";
			return "transparent";
		}};
	width: 100%;
	padding: ${({ padding }) => padding || "16px 18px 17px"};
	font-size: ${({ fontSize }) => (fontSize ? fontSize : "18px")};
	letter-spacing: 1px;

	&:hover {
		color: ${props => {
			if (props.primary || props.danger) return "#fff";
			return "#04515d";
		}};
		background-color: ${props => {
			if (props.primary) return "#04515d";
			if (props.danger) return "#d24b2e";
			return "#F9F9F9";
		}};
		border: 2px solid
			${props => {
				if (props.primary) return "#04515d";
				if (props.danger) return "#d24b2e";
				return "transparent";
			}};
	}

	&:focus {
		outline: 0;
	}
`;

export default Button;
