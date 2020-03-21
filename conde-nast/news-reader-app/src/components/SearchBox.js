import React, { useState } from "react";
import styled from "styled-components";

import { setRecentQueries } from "../storage";
import { RecentQueries } from "./RecentQueries";

const Panel = styled.div`
  padding: 1rem;
  background-color: darkorange;
`;

const Form = styled.form`
  display: flex;
`;

const Label = styled.label`
  padding: 0.5rem;
  font-size: 0.8rem;
  background-color: orange;
`;

const Input = styled.input`
  flex: 1;
  padding: 0.5rem;
  font-size: 0.8rem;
  appearance: none;
  border: none;
`;

export function SearchBox({ appState, searchVal, submitQuery }) {
  const [formVal, setFormVal] = useState("news");

  const onSubmit = event => {
    event.preventDefault();
    setRecentQueries([formVal]);
    return submitQuery(formVal);
  };

  const onClickRecentQuery = query => {
    setFormVal(query);
    return submitQuery(query);
  };

  return (
    <Panel>
      <Form onSubmit={onSubmit}>
        <Label htmlFor="news-filter">Search:</Label>
        <Input
          name="News Filter"
          id="news-filter"
          value={formVal}
          placeholder={`Try "brexit" or "tech"`}
          onChange={e => setFormVal(e.target.value)}
        />
      </Form>
      <RecentQueries clickQuery={onClickRecentQuery} />
    </Panel>
  );
}
