import React from "react";
import styled from "styled-components";

import { getRecentQueries } from "../storage";

const QueryList = styled.div`
  padding-top: 5px;
  display: flex;
`;

const QueryItem = styled.button`
  appearance: none;
  margin-right: 5px;
  padding: 2px 5px;
  background: white;
  border: none;
  cursor: pointer;

  &:hover {
    background: #eee;
  }
`;

export function RecentQueries({ clickQuery }) {
  return (
    <QueryList>
      {getRecentQueries()
        .slice(0, 5)
        .map(query => (
          <QueryItem onClick={() => clickQuery(query)}>{query}</QueryItem>
        ))}
    </QueryList>
  );
}
