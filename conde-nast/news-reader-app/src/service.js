import axios from "axios";

export async function getStories({ q, pageSize = 20, page = 1 }) {
  const { data } = await axios({
    method: "get",
    url: "http://localhost:5000",
    params: { q, pageSize, page }
  });
  return data.articles;
}
