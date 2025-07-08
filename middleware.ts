import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const sessionToken = request.cookies.get("authjs.session-token")?.value ||
                      request.cookies.get("next-auth.session-token")?.value ||
                      request.cookies.get("__Secure-next-auth.session-token")?.value ||
                      request.cookies.get("__Secure-authjs.session-token")?.value;

  if (!sessionToken) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/blogs/:path*"],
};