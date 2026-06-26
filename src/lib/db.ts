// ─────────────────────────────────────────────────────────
// PostgreSQL connection (Railway)
// One shared pool, created lazily on first use and reused
// across requests/route handlers.
// ─────────────────────────────────────────────────────────
import { Pool } from "pg";

declare global {
  var __pgPool: Pool | undefined;
}

function createPool(): Pool {
  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) {
    throw new Error(
      "DATABASE_URL is not set. Add it to .env.local (copy from Railway → Postgres service → Variables).",
    );
  }
  return new Pool({
    connectionString,
    // Railway's Postgres is reachable over a plain TLS connection;
    // this relaxed setting avoids self-signed cert failures in most
    // Railway plans. Tighten this if your plan provides a CA bundle.
    ssl: connectionString.includes("railway")
      ? { rejectUnauthorized: false }
      : undefined,
    max: 5,
  });
}

/**
 * Returns the shared connection pool, creating it on first call.
 * Deliberately lazy: importing this module (e.g. during `next build`'s
 * page-data collection) must not require DATABASE_URL to be set —
 * only actually handling a request should.
 */
function getPool(): Pool {
  if (!global.__pgPool) {
    global.__pgPool = createPool();
  }
  return global.__pgPool;
}

// Proxy so existing call sites can keep writing `pool.query(...)`
// without needing to call `getPool()` everywhere, while the real
// Pool is still only constructed on first actual use.
export const pool: Pool = new Proxy({} as Pool, {
  get(_target, prop, receiver) {
    return Reflect.get(getPool(), prop, receiver);
  },
});

let tableReady: Promise<void> | null = null;

let productsTableReady: Promise<void> | null = null;

export function ensureProductsTable(): Promise<void> {
  if (!productsTableReady) {
    productsTableReady = pool
      .query(
        `
        CREATE TABLE IF NOT EXISTS products (
    id SERIAL PRIMARY KEY,

    name TEXT NOT NULL,

    slug TEXT UNIQUE NOT NULL,

    category TEXT NOT NULL,

    origin_country TEXT,

    short_description TEXT,

    description TEXT,

    images JSONB DEFAULT '[]'::jsonb,

    price NUMERIC,

    currency TEXT DEFAULT 'USD',

    moq TEXT,

    unit TEXT,

    featured BOOLEAN DEFAULT FALSE,

    published BOOLEAN DEFAULT TRUE,

    created_at TIMESTAMPTZ DEFAULT now(),

    updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS leads (

id SERIAL PRIMARY KEY,

product_id INTEGER,

product_name TEXT,

product_slug TEXT,

name TEXT NOT NULL,

email TEXT NOT NULL,

phone TEXT,

company TEXT,

country TEXT,

quantity TEXT,

message TEXT,

status TEXT DEFAULT 'New',

created_at TIMESTAMP DEFAULT NOW()

);
      `,
      )

      .then(() => undefined);
  }

  return productsTableReady;
}

/**
 * Creates the `leads` table if it doesn't exist yet.
 * Safe to call on every request — it's a cheap IF NOT EXISTS check,
 * and the promise is cached so it only actually runs once per server.
 */
export function ensureLeadsTable(): Promise<void> {
  if (!tableReady) {
    tableReady = pool
      .query(
        `
        CREATE TABLE IF NOT EXISTS leads (
          id          SERIAL PRIMARY KEY,
          name        TEXT NOT NULL,
          company     TEXT,
          email       TEXT NOT NULL,
          phone       TEXT,
          country     TEXT,
          inquiry_type TEXT,
          product     TEXT,
          quantity    TEXT,
          budget      TEXT,
          message     TEXT,
          status      TEXT NOT NULL DEFAULT 'New',
          source      TEXT NOT NULL DEFAULT 'Website',
          created_at  TIMESTAMPTZ NOT NULL DEFAULT now()
        );
      `,
      )
      .then(() => undefined);
  }
  return tableReady;
}
