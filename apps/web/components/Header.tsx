"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { LogOut, ShoppingBag, Store } from "lucide-react";
import { useCart } from "@/components/CartProvider";

export function Header() {
  const router = useRouter();
  const { count } = useCart();

  async function logout() {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/login");
    router.refresh();
  }

  return (
    <header className="site-header">
      <Link className="brand" href="/shop" aria-label="Atelier Lys Blanc">
        <span className="brand-mark">
          <Store size={19} aria-hidden="true" />
        </span>
        <span>
          <strong>Atelier Lys Blanc</strong>
          <small>Rochii elegante</small>
        </span>
      </Link>
      <nav className="nav-actions" aria-label="Navigatie principala">
        <Link href="/shop">Catalog</Link>
        <Link className="cart-link" href="/cart" aria-label="Cos de cumparaturi">
          <ShoppingBag size={18} aria-hidden="true" />
          <span>{count}</span>
        </Link>
        <button className="icon-button" type="button" onClick={logout} title="Iesire">
          <LogOut size={18} aria-hidden="true" />
        </button>
      </nav>
    </header>
  );
}
