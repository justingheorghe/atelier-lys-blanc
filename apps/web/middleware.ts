import { NextResponse, type NextRequest } from "next/server";
import { verifySessionToken } from "@/lib/auth";

const protectedRoutes = ["/shop", "/cart", "/checkout", "/confirmation"];

export async function middleware(request: NextRequest) {
  const isProtected = protectedRoutes.some((route) =>
    request.nextUrl.pathname.startsWith(route)
  );

  if (!isProtected) {
    return NextResponse.next();
  }

  const token = request.cookies.get("lys_blanc_token")?.value;
  const session = await verifySessionToken(token);

  if (!session) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("next", request.nextUrl.pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/shop/:path*", "/cart/:path*", "/checkout/:path*", "/confirmation/:path*"]
};
