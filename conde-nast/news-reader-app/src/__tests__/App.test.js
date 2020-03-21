import React from "react";
import ReactDOM from "react-dom";

import App from "../App";
import { StoryList } from "../components/StoryList";
import { StoryItem } from "../components/StoryItem";

const storiesFixture = [
  {
    source: {
      id: null,
      name: "Businesswire.com"
    },
    author: null,
    title: "Phillips 66 Partners Reports Fourth-Quarter 2018 Earnings",
    description:
      "HOUSTON--(BUSINESS WIRE)--Phillips 66 Partners LP announces fourth-quarter 2018 earnings of $221 million, or $1.09 per diluted common unit.",
    url:
      "https://www.businesswire.com/news/home/20190208005098/en/Phillips-66-Partners-Reports-Fourth-Quarter-2018-Earnings",
    urlToImage:
      "https://mms.businesswire.com/media/20190208005098/en/397922/21/P66_MLP-REG-Logo-RGB-Black-Red.jpg",
    publishedAt: "2019-02-08T12:24:50Z",
    content:
      "HOUSTON--(BUSINESS WIRE)--Phillips 66 Partners LP (NYSE: PSXP) announces fourth-quarter 2018 \r\n earnings of $221 million, or $1.09 per diluted common unit. Cash from \r\n operations was $240 million, and distributable cash flow was $238 \r\n million. Adjusted EBI… [+18028 chars]",
    id: "4c91dd3d9518b593cb7fd051c0dea806d75b3dac"
  }
];

describe("App", () => {
  it("renders App without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(<App />, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  it("render StoryItem when given a story", () => {
    const div = document.createElement("div");
    ReactDOM.render(<StoryList story={storiesFixture[0]} />, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  it("render StoryList when given stories", () => {
    const div = document.createElement("div");
    ReactDOM.render(
      <StoryList stories={storiesFixture} StoryItem={StoryItem} />,
      div
    );
    ReactDOM.unmountComponentAtNode(div);
  });
});
