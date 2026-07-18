import { NextRequest, NextResponse } from "next/server";
import { ADMIN_SESSION_COOKIE, verifyAdminSessionToken } from "@/lib/adminAuth";

/**
 * Decides whether a given API request requires a valid admin session.
 *
 * Public routes are explicitly carved out (e.g. anyone can POST a new
 * lead from the homepage contact form, or GET published products/blogs)
 * — everything else under these prefixes is admin-only.
 */
function requiresAdminAuth(pathname: string, method: string): boolean {
  // Everything under /api/admin/** is admin-only, except the
  // login/session endpoints needed to establish that session.
  if (pathname.startsWith("/api/admin/")) {
    if (
      pathname === "/api/admin/login" ||
      pathname === "/api/admin/logout" ||
      pathname === "/api/admin/session"
    ) {
      return false;
    }
    return true;
  }

  // Products: public reads, admin-only writes.
  if (pathname === "/api/products" || pathname.startsWith("/api/products/")) {
    return method !== "GET";
  }

  // Leads: public create (homepage/product forms), admin-only
  // everything else (listing, updating status, deleting).
  if (pathname === "/api/leads") {
    return method !== "POST";
  }
  if (pathname.startsWith("/api/leads/")) {
    return true;
  }

  return false;
}

export async function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;

  if (!requiresAdminAuth(pathname, req.method)) {
    return NextResponse.next();
  }

  const token = req.cookies.get(ADMIN_SESSION_COOKIE)?.value;
  const authenticated = await verifyAdminSessionToken(token);

  if (!authenticated) {
    return NextResponse.json(
      { error: "Unauthorized. Please log in to the admin dashboard." },
      { status: 401 },
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/api/admin/:path*",
    "/api/products",
    "/api/products/:path*",
    "/api/leads",
    "/api/leads/:path*",
  ],
};