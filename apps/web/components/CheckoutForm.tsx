"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { CreditCard, MapPin, Phone, UserRound } from "lucide-react";
import { Header } from "@/components/Header";
import { useCart } from "@/components/CartProvider";

export function CheckoutForm() {
  const router = useRouter();
  const { items, total, clearCart } = useCart();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");

    if (items.length === 0) {
      setError("Cosul este gol.");
      return;
    }

    const form = new FormData(event.currentTarget);
    setLoading(true);

    const response = await fetch("/api/orders", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        customerName: form.get("customerName"),
        phone: form.get("phone"),
        address: form.get("address"),
        notes: form.get("notes"),
        paymentMethod: form.get("paymentMethod"),
        items: items.map((item) => ({
          productId: item.product.id,
          size: item.size,
          quantity: item.quantity
        }))
      })
    });

    setLoading(false);

    if (!response.ok) {
      setError("Comanda nu a putut fi validata.");
      return;
    }

    const order = (await response.json()) as { orderId: string };
    clearCart();
    router.push(`/confirmation?order=${order.orderId}`);
  }

  return (
    <>
      <Header />
      <main className="app-shell narrow">
        <div className="page-title">
          <p className="eyebrow">Checkout</p>
          <h1>Finalizeaza comanda</h1>
        </div>
        <section className="checkout-layout">
          <form className="checkout-form" onSubmit={submit}>
            <label>
              <span><UserRound size={17} aria-hidden="true" /> Nume complet</span>
              <input name="customerName" required minLength={3} />
            </label>
            <label>
              <span><Phone size={17} aria-hidden="true" /> Telefon</span>
              <input name="phone" required pattern="^[0-9 +()-]{7,}$" />
            </label>
            <label>
              <span><MapPin size={17} aria-hidden="true" /> Adresa livrare</span>
              <textarea name="address" required minLength={8} rows={4} />
            </label>
            <label>
              Observatii
              <textarea name="notes" rows={3} placeholder="Interval preferat, ajustari, detalii eveniment" />
            </label>
            <label>
              <span><CreditCard size={17} aria-hidden="true" /> Plata</span>
              <select name="paymentMethod" defaultValue="card">
                <option value="card">Card la confirmare</option>
                <option value="cash">Ramburs</option>
                <option value="transfer">Transfer bancar</option>
              </select>
            </label>
            {error ? <p className="form-error">{error}</p> : null}
            <button type="submit" disabled={loading}>
              {loading ? "Se trimite..." : "Plaseaza comanda"}
            </button>
          </form>
          <aside className="summary-panel checkout-summary">
            <span>Total comanda</span>
            <strong>{total} RON</strong>
            <p>{items.length} produse selectate</p>
          </aside>
        </section>
      </main>
    </>
  );
}
