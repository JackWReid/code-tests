import React from "react";
import styled from "styled-components";

const List = styled.ul`
  max-width: 50rem;
  margin: 2rem auto;
  padding: 0;
  list-style: none;
`;

export function StoryList({ stories = [], StoryItem }) {
  return (
    <List>
      {stories.map(story => (
        <StoryItem story={story} />
      ))}
    </List>
  );
}
