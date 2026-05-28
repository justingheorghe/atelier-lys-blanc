import products from "@/data/products.json";
import type { Product } from "@/lib/types";

export const catalog = products as Product[];

export function getProductById(id: number) {
  return catalog.find((product) => product.id === id);
}

export function getStyles() {
  return Array.from(new Set(catalog.map((product) => product.style))).sort();
}

export function calculateTotal(
  items: Array<{ productId: number; quantity: number }>
) {
  return items.reduce((total, item) => {
    const product = getProductById(item.productId);
    return total + (product?.price ?? 0) * item.quantity;
  }, 0);
}
