import axios from "axios";
import { filterServiceParams, getStories, NEWS_API_KEY } from "../service.js";

jest.mock("axios");

const defaultParams = {
  q: null,
  language: "en",
  pageSize: 10,
  page: 1,
  sortBy: "publishedAt"
};

describe("filteredServiceParams", () => {
  it("returns the default parameters when called with no args", () => {
    expect(filterServiceParams()).toEqual(defaultParams);
  });

  it("returns the default parameters when called with empty obj", () => {
    expect(filterServiceParams({})).toEqual(defaultParams);
  });

  it("returns the default parameters when called with only junk", () => {
    expect(
      filterServiceParams({
        junk: "strings",
        nothing: "to do with params"
      })
    ).toEqual(defaultParams);
  });

  it("returns the default parameters except a valid override when passed", () => {
    expect(
      filterServiceParams({
        sortBy: "popularity"
      })
    ).toEqual({
      ...defaultParams,
      sortBy: "popularity"
    });
  });
});

describe("getStories", () => {
  axios.mockResolvedValue({ data: [{ foo: "bar" }] });

  it("calls axios", async () => {
    await getStories();
    expect(axios).toBeCalled();
  });

  it("calls axios with the default params", async () => {
    await getStories(defaultParams);
    expect(axios).toBeCalledWith({
      method: "get",
      url: "https://newsapi.org/v2/everything",
      params: defaultParams,
      headers: { "X-API-Key": NEWS_API_KEY }
    });
  });

  it("calls axios with the correct query", async () => {
    await getStories({
      ...defaultParams,
      q: "brexit"
    });
    expect(axios).toBeCalledWith({
      method: "get",
      url: "https://newsapi.org/v2/everything",
      params: {
        ...defaultParams,
        q: "brexit"
      },
      headers: { "X-API-Key": NEWS_API_KEY }
    });
  });
});
