import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("token");
  const isAuthPage = request.nextUrl.pathname === "/pharmassist";

  if (!token && !isAuthPage) {
    return NextResponse.redirect(new URL("/pharmassist", request.url));
  }

  if (token && isAuthPage) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/pharmassist",
    "/users/:path*",
    "/branches/:path*",
    "/reports/:path*",
    "/products/:path*",
    "/suppliers/:path*",
    "/expenses/:path*",
  ],
};
