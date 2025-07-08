import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  // For default NextAuth session cookie names:
  const sessionToken =
    request.cookies.get("authjs.session-token")?.value ||
    request.cookies.get("authjs.csrf-token")?.value;

  if (!sessionToken) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/blogs/:path*"],
};