import { jwtVerify, SignJWT } from "jose";
import { cookies } from "next/headers";

const cookieName = "lys_blanc_token";

function getSecret() {
  const secret =
    process.env.JWT_SECRET ??
    "development-only-secret-change-before-production-deploy";

  return new TextEncoder().encode(secret);
}

export async function createSessionToken() {
  return new SignJWT({
    role: "atelier-client",
    shop: "Atelier Lys Blanc"
  })
    .setProtectedHeader({ alg: "HS256" })
    .setSubject("lys-blanc-client")
    .setIssuedAt()
    .setExpirationTime("8h")
    .sign(getSecret());
}

export async function verifySessionToken(token?: string) {
  if (!token) {
    return null;
  }

  try {
    const verified = await jwtVerify(token, getSecret());
    return verified.payload;
  } catch {
    return null;
  }
}

export async function getSessionFromCookies() {
  const cookieStore = await cookies();
  const token = cookieStore.get(cookieName)?.value;
  return verifySessionToken(token);
}

export function getAuthCookieName() {
  return cookieName;
}

export function getConfiguredPassword() {
  return process.env.APP_PASSWORD ?? "lysblanc2026";
}
