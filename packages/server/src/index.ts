import { Hono } from "hono";
import Redis from "ioredis";
import { validator } from "hono/validator";
import { HTTPException } from "hono/http-exception";
import { numbersHash, numbersHashKey } from "./utils/redis-keys";
import { calculateFib } from "./utils";
import { serveStatic } from "hono/bun";

const redis = new Redis();

const MAX_NUMBER = 50;

const api = new Hono();

// api.get("/", async (c) => {
//   const color = await redis.get("color");
//   return c.json({ color });
// });

api.get(
  "/:number",
  validator("param", (value, c) => {
    const numberString = value.number;
    if (!numberString) {
      throw new HTTPException(400, { message: "Invalid number" });
    }
    const number = Math.floor(parseInt(numberString));

    if (number < 0 || isNaN(number)) {
      throw new HTTPException(400, { message: "Invalid number" });
    }

    if (number > MAX_NUMBER) {
      throw new HTTPException(400, {
        message: `number too high, use less than ${MAX_NUMBER}`,
      });
    }

    return {
      number: number.toString(),
    };
  }),
  async (c) => {
    const numberString = c.req.valid("param").number;

    // get number from cache

    const cachedValue = await redis.hget(
      numbersHash(),
      numbersHashKey(numberString)
    );

    if (cachedValue) {
      return c.json({ result: parseInt(cachedValue) });
    }

    // calculate fib number
    const calculated = calculateFib(parseInt(numberString));

    redis.hset(numbersHash(), {
      [numbersHashKey(numberString)]: calculated,
    });

    return c.json({ result: calculated });
  }
);

const basePath = __dirname;
console.log(basePath);

const app = new Hono();
app.use(
  "*",
  (c, next) => {
    console.log("hii");
    return next();
  },
  // serveStatic({ path: path.join(__dirname, "static") })
  serveStatic({ path: "./src/static/index.html" })
);
// app.use("/static/*", serveStatic({ root: "./" }));
// app.get("*", serveStatic({ path: "./static/fallback.txt" }));

app.route("/api", api);

// app.use(
//   "/static",
//   (c, next) => {
//     console.log("here");
//     return next();
//   },
//   serveStatic({ path: "./static/index.html" })
// );

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
