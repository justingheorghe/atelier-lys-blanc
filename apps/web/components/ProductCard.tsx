"use client";

import { useState } from "react";
import Image from "next/image";
import { Check, Plus, Ruler } from "lucide-react";
import { useCart } from "@/components/CartProvider";
import type { Product } from "@/lib/types";

export function ProductCard({ product }: { product: Product }) {
  const { addItem } = useCart();
  const [size, setSize] = useState(product.sizes[0]);
  const [added, setAdded] = useState(false);

  function addToCart() {
    addItem(product, size);
    setAdded(true);
    window.setTimeout(() => setAdded(false), 1300);
  }

  return (
    <article className="product-card">
      <div className="product-image-wrap">
        <Image
          src={product.image}
          alt={product.name}
          className="product-image"
          fill
          sizes="(max-width: 900px) 100vw, 33vw"
        />
        <span className="stock-badge">
          {product.stock <= 5 ? "Stoc limitat" : "Disponibil"}
        </span>
      </div>
      <div className="product-body">
        <div className="product-heading">
          <div>
            <p>{product.style}</p>
            <h2>{product.name}</h2>
          </div>
          <strong>{product.price} RON</strong>
        </div>
        <p className="product-description">{product.description}</p>
        <div className="product-meta">
          <span>{product.color}</span>
          <span>{product.stock} in stoc</span>
        </div>
        <div className="size-row">
          <Ruler size={17} aria-hidden="true" />
          {product.sizes.map((item) => (
            <button
              className={item === size ? "size active" : "size"}
              key={item}
              type="button"
              onClick={() => setSize(item)}
            >
              {item}
            </button>
          ))}
        </div>
        <button className="add-button" type="button" onClick={addToCart}>
          {added ? <Check size={18} aria-hidden="true" /> : <Plus size={18} aria-hidden="true" />}
          {added ? "Adaugat" : "Adauga in cos"}
        </button>
      </div>
    </article>
  );
}
