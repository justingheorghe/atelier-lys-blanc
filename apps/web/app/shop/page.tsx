import { ShopClient } from "@/components/ShopClient";
import { catalog } from "@/lib/catalog";

export default function ShopPage() {
  return <ShopClient products={catalog} />;
}
