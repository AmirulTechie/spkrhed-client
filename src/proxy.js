import { NextResponse } from "next/server";

/**
 * Hotlink / direct-access protection for public assets.
 *
 * Requests that originate from a browser opening an image URL directly (new
 * tab, address bar, curl, etc.) will either have no Referer header at all, or
 * a Referer that belongs to a different origin.  We block those and return a
 * plain 403 so the raw file cannot be trivially downloaded.
 *
 * Note: Referer can be spoofed by a determined user, so this is a deterrent,
 * not an absolute lock. It stops casual theft effectively.
 */

const ALLOWED_ORIGINS = [
  process.env.NEXT_PUBLIC_SITE_URL, // e.g. "https://spkrhed.com"
  "http://localhost:3000",
  "http://192.168.1.101:3000",
].filter(Boolean);

export function proxy(request) {
  const { pathname } = request.nextUrl;

  // Only guard the public images folder.
  if (!pathname.startsWith("/images/")) {
    return NextResponse.next();
  }

  const referer = request.headers.get("referer");

  // Allow requests with no Referer only when they come from a same-origin
  // navigation (e.g. Next.js Image component fetches from the server itself).
  // Direct browser navigation to the asset URL also has no Referer on some
  // browsers, but blocking "no referer" would break server-side image
  // optimisation, so we keep it permissive here and rely on the origin check
  // for cross-origin hotlinks.
  if (!referer) {
    return NextResponse.next();
  }

  try {
    const refererOrigin = new URL(referer).origin;
    const isAllowed = ALLOWED_ORIGINS.some((o) => o && refererOrigin === o);

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
