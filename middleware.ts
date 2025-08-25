// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value;

  // Các route yêu cầu login
  const protectedRoutes = ["/check-out", "/profile", "/order", "/voucher", "/account", "/addressBook"];

  const isProtected = protectedRoutes.some((path) =>
    req.nextUrl.pathname.startsWith(path)
  );

  if (isProtected && !token) {
    const loginUrl = new URL("/login", req.url);
    loginUrl.searchParams.set("from", req.nextUrl.pathname); // redirect lại sau khi login
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/check-out",
    "/check-out/:path*",
    "/profile",
    "/profile/:path*",
    "/order",
    "/order/:path*",
    "/voucher",
    "/voucher/:path*",
    "/account",
    "/account/:path*",
    "/addressBook",
    "/addressBook/:path*",
  ],
};
