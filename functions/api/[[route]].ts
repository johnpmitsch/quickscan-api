import { Hono } from "hono";
import { handle } from "hono/cloudflare-pages";
import { env } from "hono/adapter";
import { API } from "@quicknode/sdk";

const app = new Hono().basePath("/api");
app.get("/wallet/balances", async (c) => {
  if (!c.env?.QN_GRAPH_API_KEY) return c.status(401);
  const qn = new API({
    graphApiKey: c.env.QN_GRAPH_API_KEY || "",
  });

  const balances = await qn.tokens.getBalancesByWallet({
    address: "quicknode.eth",
  });
  return c.json(balances);
});

export const onRequest = handle(app);
