import styled from "styled-components";

const typeOfAlert = type => {
  switch (type) {
    case "alert":
      return "#03a9f3";
    case "warning":
      return "#FFA000";
    default:
      return "#D32F2F";
  }
};

const MessageContainer = styled.div`
  display: -ms-flexbox;
  display: flex;
  background: ${({ type }) => typeOfAlert(type)};
  padding: 10px;
  border-radius: 4px;
`;

export default MessageContainer;
