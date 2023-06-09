import { Hono } from "hono";
import { API } from "@quicknode/sdk";

export const config = {
  runtime: "edge",
};

const qn = new API({
  graphApiKey: process.env.QN_GRAPH_API_KEY,
});
const app = new Hono();

app.get("/", (c) => c.text("Hello Hono!"));

app.get("/hello", async (c) => {
  const balances = await qn.tokens.getBalancesByWallet({
    address: "quicknode.eth",
  });
  return c.json(balances);
});

export default app;
