"use client";

import Link from "next/link";
import Image from "next/image";
import { Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";
import { Header } from "@/components/Header";
import { useCart } from "@/components/CartProvider";

export function CartPageClient() {
  const { items, removeItem, updateQuantity, total } = useCart();

  return (
    <>
      <Header />
      <main className="app-shell narrow">
        <div className="page-title">
          <p className="eyebrow">Cos de cumparaturi</p>
          <h1>Produsele selectate</h1>
        </div>
        {items.length === 0 ? (
          <section className="empty-state">
            <ShoppingBag size={32} aria-hidden="true" />
            <h2>Cosul este gol</h2>
            <p>Alege o rochie din catalog si revino pentru checkout.</p>
            <Link className="primary-link" href="/shop">Inapoi la catalog</Link>
          </section>
        ) : (
          <section className="cart-layout">
            <div className="cart-list">
              {items.map((item) => (
                <article className="cart-row" key={`${item.product.id}-${item.size}`}>
                  <Image
                    src={item.product.image}
                    alt={item.product.name}
                    width={110}
                    height={132}
                  />
                  <div>
                    <h2>{item.product.name}</h2>
                    <p>Marime {item.size} · {item.product.price} RON</p>
                    <div className="quantity-controls">
                      <button
                        type="button"
                        onClick={() =>
                          updateQuantity(item.product.id, item.size, item.quantity - 1)
                        }
                        title="Scade cantitatea"
                      >
                        <Minus size={16} aria-hidden="true" />
                      </button>
                      <span>{item.quantity}</span>
                      <button
                        type="button"
                        onClick={() =>
                          updateQuantity(item.product.id, item.size, item.quantity + 1)
                        }
                        title="Creste cantitatea"
                      >
                        <Plus size={16} aria-hidden="true" />
                      </button>
                    </div>
                  </div>
                  <button
                    className="icon-button danger"
                    type="button"
                    onClick={() => removeItem(item.product.id, item.size)}
                    title="Sterge produs"
                  >
                    <Trash2 size={18} aria-hidden="true" />
                  </button>
                </article>
              ))}
            </div>
            <aside className="summary-panel">
              <span>Total</span>
              <strong>{total} RON</strong>
              <Link className="primary-link" href="/checkout">Continua spre checkout</Link>
            </aside>
          </section>
        )}
      </main>
    </>
  );
}
