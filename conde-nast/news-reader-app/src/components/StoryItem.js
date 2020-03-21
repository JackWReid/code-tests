import React from "react";
import styled from "styled-components";

const Item = styled.li`
  padding: 0.5rem;
`;

const Title = styled.p`
  margin: 0;
`;

const Summary = styled.p`
  font-size: 0.8rem;
`;

const TitleLink = styled.a`
  color: inherit;

  &:hover {
    color: darkorange;
  }

  &:focus {
    outline: 1px solid darkorange;
  }
`;

export function StoryItem({ story }) {
  return (
    <Item>
      <Title>
        <TitleLink href={story.url}>{story.title}</TitleLink>
      </Title>
      <Summary>{story.description}</Summary>
    </Item>
  );
}
