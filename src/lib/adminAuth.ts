// ─────────────────────────────────────────────────────────
// Admin session handling.
//
// The previous "auth" was a client-side-only sessionStorage flag
// checked against a password hardcoded in admin/layout.tsx — none
// of the admin API routes verified anything, so anyone could call
// them directly (e.g. `curl -X DELETE /api/products/1`) and bypass
// the login screen entirely.
//
// This replaces that with a real, server-verified session:
//   1. POST /api/admin/login checks the password against
//      process.env.ADMIN_PASSWORD and, on success, sets an
//      httpOnly, signed cookie.
//   2. src/middleware.ts verifies that cookie on every request to
//      an admin-only API route and rejects with 401 if missing or
//      invalid/expired.
//
// The cookie is a stateless signed token (no session table needed):
//   `${expiresAtMs}.${base64url(HMAC-SHA256(expiresAtMs))}`
//
// Web Crypto (`crypto.subtle`) is used instead of Node's `crypto`
// module because this needs to run both in normal Node.js route
// handlers AND in the Edge middleware runtime, and only Web Crypto
// is available in both.
// ─────────────────────────────────────────────────────────

export const ADMIN_SESSION_COOKIE = "admin_session";
const SESSION_TTL_MS = 12 * 60 * 60 * 1000; // 12 hours

function getSecret(): string {
  const secret = process.env.ADMIN_SESSION_SECRET;
  if (!secret) {
    throw new Error(
      "ADMIN_SESSION_SECRET is not set. Add a long random string to .env.local (e.g. `openssl rand -hex 32`).",
    );
  }
  return secret;
}

async function getKey(): Promise<CryptoKey> {
  const encoded = new TextEncoder().encode(getSecret());
  return crypto.subtle.importKey(
    "raw",
    encoded,
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign", "verify"],
  );
}

// base64url helpers built on btoa/atob (available in both Node.js
// and the Edge runtime) instead of Node's Buffer (Edge-only unsafe).
function toBase64Url(bytes: ArrayBuffer): string {
  const arr = new Uint8Array(bytes);
  let binary = "";
  for (let i = 0; i < arr.length; i++) binary += String.fromCharCode(arr[i]);
  return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

function fromBase64Url(value: string): Uint8Array<ArrayBuffer> {
  const padded = value.replace(/-/g, "+").replace(/_/g, "/");
  const withPadding = padded.padEnd(
    padded.length + ((4 - (padded.length % 4)) % 4),
    "=",
  );
  const binary = atob(withPadding);
  const arr = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) arr[i] = binary.charCodeAt(i);
  return arr;
}

/** Creates a signed session token good for SESSION_TTL_MS. */
export async function createAdminSessionToken(): Promise<string> {
  const expiresAt = String(Date.now() + SESSION_TTL_MS);
  const key = await getKey();
  const signature = await crypto.subtle.sign(
    "HMAC",
    key,
    new TextEncoder().encode(expiresAt),
  );
  return `${expiresAt}.${toBase64Url(signature)}`;
}

/** Verifies a session token's signature and checks it hasn't expired. */
export async function verifyAdminSessionToken(
  token: string | undefined | null,
): Promise<boolean> {
  if (!token) return false;

  const [expiresAt, signature] = token.split(".");
  if (!expiresAt || !signature) return false;

  const expiresAtMs = Number(expiresAt);
  if (!Number.isFinite(expiresAtMs) || Date.now() > expiresAtMs) return false;

  try {
    const key = await getKey();
    return await crypto.subtle.verify(
      "HMAC",
      key,
      fromBase64Url(signature),
      new TextEncoder().encode(expiresAt),
    );
  } catch (err) {
    console.error("[adminAuth] Failed to verify session token:", err);
    return false;
  }
}

export const ADMIN_SESSION_MAX_AGE_SECONDS = SESSION_TTL_MS / 1000;

/** Reads the admin password from the environment. Throws if unset, so the app can't accidentally ship with a hardcoded/default password. */
export function getAdminPassword(): string {
  const password = process.env.ADMIN_PASSWORD;
  if (!password) {
    throw new Error(
      "ADMIN_PASSWORD is not set. Add it to .env.local (this is the password used to log into /admin).",
    );
  }
  return password;
}