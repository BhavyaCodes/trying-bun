import { Hono } from "hono";

import Redis from "ioredis";

const redis = new Redis();

const app = new Hono();

app.get("/", async (c) => {
  const color = await redis.get("color");
  return c.json({ color });
});

export default {
  port: 5000,
  fetch: app.fetch,
};
