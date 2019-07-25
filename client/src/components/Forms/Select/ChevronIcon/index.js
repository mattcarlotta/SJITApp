import styled from "styled-components";
import Chevron from "./Chevron";

const StyledChevron = styled(Chevron)`
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

export default StyledChevron;
