import type { ReactNode } from "react";

import { QueryProvider } from "./query-provider";
import { CartProvider } from "@/context/CartContext";
import { WishlistProvider } from "@/context/WishlistContext";
import { ThemeProvider } from "@/context/ThemeContext";

export default function AppProviders({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <QueryProvider>
      <ThemeProvider>
        <CartProvider>
          <WishlistProvider>
            {children}
          </WishlistProvider>
        </CartProvider>
      </ThemeProvider>
    </QueryProvider>
  );
}