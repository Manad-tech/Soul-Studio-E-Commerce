import {
  createContext,
  useEffect,
  useMemo,
  useState,
} from "react";

import type { Product } from "@/types/product";
import type { WishlistItem } from "@/types/wishlist";

interface WishlistContextType {
  items: WishlistItem[];

  addToWishlist: (
    product: Product
  ) => void;

  removeFromWishlist: (
    id: string
  ) => void;

  isWishlisted: (
    id: string
  ) => boolean;

  totalItems: number;
}

export const WishlistContext =
  createContext(
    {} as WishlistContextType
  );

export function WishlistProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [items, setItems] = useState<
    WishlistItem[]
  >(() => {
    const stored =
      localStorage.getItem(
        "wishlist"
      );

    return stored
      ? JSON.parse(stored)
      : [];
  });

  useEffect(() => {
    localStorage.setItem(
      "wishlist",
      JSON.stringify(items)
    );
  }, [items]);

  function addToWishlist(
    product: Product
  ) {
    setItems((prev) => {
      const exists =
        prev.find(
          (i) =>
            i.product.id ===
            product.id
        );

      if (exists)
        return prev.filter(
          (i) =>
            i.product.id !==
            product.id
        );

      return [
        ...prev,
        { product },
      ];
    });
  }

  function removeFromWishlist(
    id: string
  ) {
    setItems((prev) =>
      prev.filter(
        (i) =>
          i.product.id !== id
      )
    );
  }

  function isWishlisted(
    id: string
  ) {
    return items.some(
      (i) =>
        i.product.id === id
    );
  }

  const value = useMemo(
    () => ({
      items,
      addToWishlist,
      removeFromWishlist,
      isWishlisted,
      totalItems: items.length,
    }),
    [items]
  );

  return (
    <WishlistContext.Provider
      value={value}
    >
      {children}
    </WishlistContext.Provider>
  );
}