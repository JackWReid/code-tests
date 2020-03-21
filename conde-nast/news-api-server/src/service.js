import axios from "axios";
import hash from "object-hash";

require("dotenv").config();

export const NEWS_API_ROOT = "https://newsapi.org/v2/everything";
export const NEWS_API_KEY = process.env.NEWS_API_KEY;

export const filterServiceParams = ({
  q = 'news',
  language = "en",
  pageSize = 10,
  page = 1,
  sortBy = "publishedAt"
} = {}) => ({
  q,
  language,
  pageSize,
  page,
  sortBy
});

export function transformStory(story) {
  return {
    ...story,
    id: hash(story),
  };
}

export async function getStories(params) {
  try {
    const { data } = await axios({
      method: "get",
      url: NEWS_API_ROOT,
      params,
      headers: { "X-API-Key": NEWS_API_KEY }
    });

    return {
      ...data,
      articles: data.articles.map(transformStory),
    };

  } catch (error) {
    console.error(error);
    throw new Error('Error in news upstream');
  }
}
