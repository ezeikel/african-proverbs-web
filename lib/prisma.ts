import type { D1Database } from "@cloudflare/workers-types";
import { getCloudflareContext } from "@opennextjs/cloudflare";
import { PrismaD1 } from "@prisma/adapter-d1";
import { PrismaClient } from "./generated/prisma/client";

declare global {
  interface CloudflareEnv {
    DB: D1Database;
  }
}

const clients = new WeakMap<D1Database, PrismaClient>();

export function isDatabaseConfigured(): boolean {
  try {
    return Boolean(getCloudflareContext().env.DB);
  } catch {
    // Outside a Worker request (e.g. at build time) there is no context.
    return false;
  }
}

/** One client per D1 binding, created on first use inside a request. */
export function getDb(): PrismaClient {
  const binding = getCloudflareContext().env.DB;
  if (!binding) {
    throw new Error("D1 binding DB is not configured");
  }
  let client = clients.get(binding);
  if (!client) {
    client = new PrismaClient({ adapter: new PrismaD1(binding) });
    clients.set(binding, client);
  }
  return client;
}

/** Lazy proxy: importing never resolves a binding, so `next build` works without D1. */
const prisma: PrismaClient = new Proxy({} as PrismaClient, {
  get(_target, prop) {
    const client = getDb();
    const value = Reflect.get(client, prop, client);
    return typeof value === "function" ? value.bind(client) : value;
  },
});

export default prisma;
