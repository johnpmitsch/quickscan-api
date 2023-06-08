import { Hono } from "hono";
import { handle } from "hono/cloudflare-pages";
import { API } from "@quicknode/sdk";

const app = new Hono().basePath("/api");
const qn = new API({ graphApiKey: process.env.QN_GRAPH_API_KEY });

app.get("/hello", (c) => {
  return c.json({
    message: "Hello from Hono!",
  });
});

export const onRequest = handle(app);
