"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState
} from "react";
import type { CartItem, Product } from "@/lib/types";

type CartContextValue = {
  items: CartItem[];
  addItem: (product: Product, size: string) => void;
  removeItem: (productId: number, size: string) => void;
  updateQuantity: (productId: number, size: string, quantity: number) => void;
  clearCart: () => void;
  total: number;
  count: number;
};

const CartContext = createContext<CartContextValue | null>(null);
const storageKey = "lys-blanc-cart";

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  useEffect(() => {
    const saved = window.localStorage.getItem(storageKey);
    if (saved) {
      setItems(JSON.parse(saved) as CartItem[]);
    }
  }, []);

  useEffect(() => {
    window.localStorage.setItem(storageKey, JSON.stringify(items));
  }, [items]);

  const addItem = useCallback((product: Product, size: string) => {
    setItems((current) => {
      const existing = current.find(
        (item) => item.product.id === product.id && item.size === size
      );

      if (existing) {
        return current.map((item) =>
          item.product.id === product.id && item.size === size
            ? { ...item, quantity: Math.min(item.quantity + 1, product.stock) }
            : item
        );
      }

      return [...current, { product, size, quantity: 1 }];
    });
  }, []);

  const removeItem = useCallback((productId: number, size: string) => {
    setItems((current) =>
      current.filter(
        (item) => !(item.product.id === productId && item.size === size)
      )
    );
  }, []);

  const updateQuantity = useCallback(
    (productId: number, size: string, quantity: number) => {
      setItems((current) =>
        current.map((item) =>
          item.product.id === productId && item.size === size
            ? {
                ...item,
                quantity: Math.max(1, Math.min(quantity, item.product.stock))
              }
            : item
        )
      );
    },
    []
  );

  const clearCart = useCallback(() => setItems([]), []);

  const value = useMemo(() => {
    const total = items.reduce(
      (sum, item) => sum + item.product.price * item.quantity,
      0
    );
    const count = items.reduce((sum, item) => sum + item.quantity, 0);
    return { items, addItem, removeItem, updateQuantity, clearCart, total, count };
  }, [items, addItem, removeItem, updateQuantity, clearCart]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error("useCart must be used inside CartProvider");
  }

  return context;
}
