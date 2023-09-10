import { Hono } from "hono";
import Redis from "ioredis";
import { validator } from "hono/validator";
import { HTTPException } from "hono/http-exception";

const redis = new Redis();

const api = new Hono();

api.get("/", async (c) => {
  const color = await redis.get("color");
  return c.json({ color });
});

api.get(
  "/:number",
  validator("param", (value, c) => {
    const numberString = value.number;
    if (!numberString) {
      throw new HTTPException(400, { message: "Invalid number" });
    }
    const number = Math.floor(parseInt(numberString));
    console.log(number);

    if (number < 0 || isNaN(number)) {
      throw new HTTPException(400, { message: "Invalid number" });
    }

    if (number > 50) {
      throw new HTTPException(400, {
        message: "number too high, use less than 50",
      });
    }

    return {
      number: number.toString(),
    };
  }),
  async (c) => {
    const numberString = c.req.valid("param").number;
    return c.text(numberString);
  }
);

const app = new Hono();
app.route("/api", api);

app.onError((err, c) => {
  if (err instanceof HTTPException) {
    // Get the custom response
    return err.getResponse();
  }

  c.status(500);
  return c.text("internal server error");
  //...
});

export default {
  port: 5000,
  fetch: app.fetch,
};
