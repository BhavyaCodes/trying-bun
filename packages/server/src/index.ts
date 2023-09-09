import { Hono } from "hono";

const app = new Hono();

app.get("/", (c) => c.text("Hello Hono!"));

export default {
  port: 5000,
  fetch: app.fetch,
};
