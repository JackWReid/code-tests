import { filterServiceParams, getStories } from "./service";

export async function getStoriesHandler(req, res) {
  const params = filterServiceParams(req.query);
  const data = await getStories(params);

  return res.json(data);
}
