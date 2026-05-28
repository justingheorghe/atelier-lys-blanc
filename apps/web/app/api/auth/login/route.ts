import { NextRequest, NextResponse } from "next/server";
import {
  createSessionToken,
  getAuthCookieName,
  getConfiguredPassword
} from "@/lib/auth";

export async function POST(request: NextRequest) {
  const body = (await request.json().catch(() => null)) as { password?: string } | null;

  if (!body?.password || body.password !== getConfiguredPassword()) {
    return NextResponse.json({ message: "Invalid credentials" }, { status: 401 });
  }

  const token = await createSessionToken();
  const response = NextResponse.json({ ok: true });

  response.cookies.set(getAuthCookieName(), token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 8,
    path: "/"
  });

  return response;
}
