export type Product = {
  id: number;
  name: string;
  slug: string;
  style: string;
  price: number;
  sizes: string[];
  stock: number;
  featured: boolean;
  color: string;
  image: string;
  description: string;
};

export type CartItem = {
  product: Product;
  size: string;
  quantity: number;
};

export type CheckoutPayload = {
  customerName: string;
  phone: string;
  address: string;
  notes?: string;
  paymentMethod: "card" | "cash" | "transfer";
  items: Array<{
    productId: number;
    size: string;
    quantity: number;
  }>;
};

export type OrderResponse = {
  orderId: string;
  total: number;
  estimatedDelivery: string;
};
