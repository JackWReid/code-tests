import React, { Component } from "react";

import { getStories } from "./service";
import { Nav } from "./components/Nav";
import { SearchBox } from "./components/SearchBox";
import { StoryList } from "./components/StoryList";
import { StoryItem } from "./components/StoryItem";

class App extends Component {
  state = {
    state: "INIT", // INIT | LOADING | ERROR | READY
    stories: []
  };

  getData = async (q = "news") => {
    this.setState({ state: "LOADING" });

    try {
      const stories = await getStories({ q });
      this.setState({ state: "READY", stories });
    } catch (error) {
      console.error(error);
      this.setState({ state: "ERROR" });
    }
  };

  componentDidMount() {
    this.getData();
  }

  render() {
    const { state, stories } = this.state;

    return (
      <div>
        <Nav appState={state} />
        <SearchBox appState={state} submitQuery={this.getData} />
        {["READY", "LOADING"].includes(state) && (
          <StoryList StoryItem={StoryItem} stories={stories} />
        )}
      </div>
    );
  }
}

export default App;
