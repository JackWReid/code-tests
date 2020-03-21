import axios from "axios";
import request from "supertest";
import { server } from "../index";

jest.mock("axios");

describe("the router", () => {
  const upstreamResponse = { data: [{ foo: "bar" }] };
  axios.mockResolvedValue(upstreamResponse);

  it("returns 200 for /health", async () => {
    const response = await request(server).get("/health");
    return expect(response.statusCode).toBe(200);
  });

  it("returns 404 for non-existent path", async () => {
    const response = await request(server).get("/nonsense");
    return expect(response.statusCode).toBe(404);
  });

  it("returns 200 for index path", async () => {
    const response = await request(server).get("/");
    return expect(response.statusCode).toBe(200);
  });

  it("returns upstream data for index path", async () => {
    const response = await request(server).get("/");
    return expect(response.body).toEqual(upstreamResponse.data);
  });
});
