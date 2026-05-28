import { NextRequest, NextResponse } from "next/server";
import { calculateTotal, getProductById } from "@/lib/catalog";
import { getSessionFromCookies } from "@/lib/auth";
import type { CheckoutPayload } from "@/lib/types";

function isValidOrder(payload: Partial<CheckoutPayload>) {
  return Boolean(
    payload.customerName &&
      payload.customerName.length >= 3 &&
      payload.phone &&
      payload.phone.length >= 7 &&
      payload.address &&
      payload.address.length >= 8 &&
      payload.paymentMethod &&
      ["card", "cash", "transfer"].includes(payload.paymentMethod) &&
      Array.isArray(payload.items) &&
      payload.items.length > 0 &&
      payload.items.every((item) => {
        const product = getProductById(item.productId);
        return (
          product &&
          product.sizes.includes(item.size) &&
          Number.isInteger(item.quantity) &&
          item.quantity > 0 &&
          item.quantity <= product.stock
        );
      })
  );
}

export async function POST(request: NextRequest) {
  const session = await getSessionFromCookies();

  if (!session) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const payload = (await request.json().catch(() => null)) as CheckoutPayload | null;

  if (!payload || !isValidOrder(payload)) {
    return NextResponse.json({ message: "Invalid order" }, { status: 400 });
  }

  const total = calculateTotal(payload.items);
  const orderId = `LYS-${Date.now().toString(36).toUpperCase()}`;
  const estimatedDelivery = new Date(Date.now() + 3 * 24 * 60 * 60 * 1000)
    .toISOString()
    .slice(0, 10);

  return NextResponse.json({ orderId, total, estimatedDelivery }, { status: 201 });
}
