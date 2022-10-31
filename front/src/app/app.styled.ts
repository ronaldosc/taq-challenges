import styled from "styled-components";

export const Container = styled.div`
  color: ${(props: { type: string }) =>
    props.type === "primary" ? "red" : "blue"};
  font-size: 44px;
`;
