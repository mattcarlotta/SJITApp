import styled from "styled-components";
import CloseButton from "./CloseButton";

const StyledCloseButton = styled(CloseButton)`
  cursor: pointer;
  color: rgba(0, 0, 0, 0.2);
  opacity: 0.5;
  background: transparent;
  border: 0;
  font-size: 20px;

  svg {
    position: relative;
    top: 2px;
  }

  &:hover {
    opacity: 1;
  }

  &:focus {
    outline: 0;
  }
`;

export default StyledCloseButton;
