import React from "react";
import styled from "styled-components";

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding: 1rem;
  background-color: #eee;
`;

const Title = styled.h1`
  margin: 0;
  font-size: 1rem;
`;

const StateIndicator = styled.p`
  margin: 0;
`;

export function Nav({ appState }) {
  return (
    <Header>
      <Title>Newswire</Title>
      <StateIndicator>{appState}</StateIndicator>
    </Header>
  );
}
