import express from "express";
import Router from "express-promise-router";
import rateLimit from "express-rate-limit";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";

import { getStoriesHandler } from "./handler";

export const server = express();
const router = Router();

const limiter = rateLimit({
  windowMs: 10 * 60 * 1000,
  max: 100
});

router.get("/", limiter, getStoriesHandler);
router.get("/health", (req, res) => res.json({ message: "ok" }));
router.get("*", (req, res) => res.status(404).json({ message: "Not Found" }));

server.use(morgan("combined"));
server.use(cors());
server.use(helmet());
server.use("/", router);

export const startServer = () => {
  return server.listen(5000);
};

startServer();
