import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  if (req.nextUrl.pathname === "/login") {
    if (token && token?.role === "admin") {
      return NextResponse.redirect(new URL("/dashboard", req.url));
    } else {
      return NextResponse.next();
    }
  }

  if (!token) return NextResponse.redirect(new URL("/login", req.url));
}

export const config = {
  matcher: ["/login", "/about/:path*", "/dashboard/:path*"],
};
