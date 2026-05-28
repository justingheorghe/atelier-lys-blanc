import type { Metadata } from "next";
import { CartProvider } from "@/components/CartProvider";
import "./globals.css";

export const metadata: Metadata = {
  title: "Atelier Lys Blanc",
  description: "Magazin online demo pentru rochii elegante"
};

export default function RootLayout({
  children
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ro">
      <body>
        <CartProvider>{children}</CartProvider>
      </body>
    </html>
  );
}
