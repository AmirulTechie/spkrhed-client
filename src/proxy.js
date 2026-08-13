import { NextResponse } from "next/server";

/**
 * Hotlink / direct-access protection for public assets.
 *
 * Requests that originate from a browser opening an image URL directly (new
 * tab, address bar, curl, etc.) will either have no Referer header at all, or
 * a Referer that belongs to a different origin.  We block those and return a
 * plain 403 so the raw file cannot be trivially downloaded.
 *
 * The allowed-origin check is dynamic: the request's own origin is always
 * trusted (covers production, previews, and custom domains without any env
 * vars), and localhost / ngrok entries cover local dev.
 *
 * Note: Referer can be spoofed by a determined user, so this is a deterrent,
 * not an absolute lock. It stops casual theft effectively.
 */

const DEV_ORIGINS = [
  "http://localhost:3000",
  "http://192.168.1.101:3000",
];

export function proxy(request) {
  const { pathname } = request.nextUrl;

  // Only guard the public images folder.
  if (!pathname.startsWith("/images/")) {
    return NextResponse.next();
  }

  const referer = request.headers.get("referer");

  // Allow requests with no Referer — Next.js Image optimisation fetches from
  // the server itself and carries no Referer, so blocking here would break
  // all <Image> components. Direct-browser navigation on some browsers also
  // sends no Referer, but we accept that trade-off.
  if (!referer) {
    return NextResponse.next();
  }

  try {
    const refererOrigin = new URL(referer).origin;

    // Always trust the same origin the request arrived on (works on any
    // Vercel deployment URL, custom domain, or preview URL automatically).
    const requestOrigin = request.nextUrl.origin;

    const isAllowed =
      refererOrigin === requestOrigin ||
      DEV_ORIGINS.includes(refererOrigin);

    if (!isAllowed) {
      return new NextResponse("Forbidden", { status: 403 });
    }
  } catch {
    // Malformed Referer header — block it.
    return new NextResponse("Forbidden", { status: 403 });
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/images/:path*"],
};
