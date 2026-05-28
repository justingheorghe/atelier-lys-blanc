"use client";

import { useMemo, useState } from "react";
import { Filter, Search } from "lucide-react";
import { Header } from "@/components/Header";
import { ProductCard } from "@/components/ProductCard";
import type { Product } from "@/lib/types";

export function ShopClient({ products }: { products: Product[] }) {
  const [query, setQuery] = useState("");
  const [style, setStyle] = useState("Toate");
  const [size, setSize] = useState("Toate");

  const styles = useMemo(
    () => ["Toate", ...Array.from(new Set(products.map((item) => item.style)))],
    [products]
  );
  const sizes = useMemo(
    () => ["Toate", ...Array.from(new Set(products.flatMap((item) => item.sizes))).sort()],
    [products]
  );

  const filtered = products.filter((product) => {
    const matchesQuery =
      product.name.toLowerCase().includes(query.toLowerCase()) ||
      product.description.toLowerCase().includes(query.toLowerCase());
    const matchesStyle = style === "Toate" || product.style === style;
    const matchesSize = size === "Toate" || product.sizes.includes(size);
    return matchesQuery && matchesStyle && matchesSize;
  });

  return (
    <>
      <Header />
      <main className="app-shell">
        <section className="shop-hero">
          <div>
            <p className="eyebrow">Colectie curatoriată</p>
            <h1>Rochii elegante pentru evenimente memorabile</h1>
            <p>
              Alege modelul, marimea si pregateste comanda intr-un flux simplu,
              fara baza de date, potrivit pentru prezentarea proiectului.
            </p>
          </div>
          <div className="hero-stats" aria-label="Indicatori atelier">
            <span>
              <strong>{products.length}</strong>
              modele
            </span>
            <span>
              <strong>24h</strong>
              confirmare
            </span>
            <span>
              <strong>0 DB</strong>
              demo curat
            </span>
          </div>
        </section>

        <section className="toolbar" aria-label="Filtrare catalog">
          <label className="search-field">
            <Search size={18} aria-hidden="true" />
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Cauta rochie, culoare sau descriere"
            />
          </label>
          <label>
            <Filter size={17} aria-hidden="true" />
            <select value={style} onChange={(event) => setStyle(event.target.value)}>
              {styles.map((item) => (
                <option key={item}>{item}</option>
              ))}
            </select>
          </label>
          <label>
            Marime
            <select value={size} onChange={(event) => setSize(event.target.value)}>
              {sizes.map((item) => (
                <option key={item}>{item}</option>
              ))}
            </select>
          </label>
        </section>

        <section className="product-grid" aria-label="Produse">
          {filtered.map((product) => (
            <ProductCard product={product} key={product.id} />
          ))}
        </section>
      </main>
    </>
  );
}
