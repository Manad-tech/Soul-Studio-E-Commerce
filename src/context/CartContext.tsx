import {
  createContext,
  useEffect,
  useMemo,
  useState,
} from "react";

import type { CartItem } from "@/types/cart";
import type { Product } from "@/types/product";

interface CartContextType {
  items: CartItem[];

  addToCart: (
    product: Product,
    quantity?: number
  ) => void;

  removeFromCart: (
    id: string
  ) => void;

  increaseQuantity: (
    id: string
  ) => void;

  decreaseQuantity: (
    id: string
  ) => void;

  clearCart: () => void;

  totalItems: number;

  totalPrice: number;
}

export const CartContext =
  createContext<CartContextType>(
    {} as CartContextType
  );

export function CartProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [items, setItems] = useState<
    CartItem[]
  >(() => {
    const stored =
      localStorage.getItem("cart");

    return stored
      ? JSON.parse(stored)
      : [];
  });

  useEffect(() => {
    localStorage.setItem(
      "cart",
      JSON.stringify(items)
    );
  }, [items]);

  const addToCart = (
    product: Product,
    quantity = 1
  ) => {
    setItems((prev) => {
      const existing =
        prev.find(
          (i) =>
            i.product.id === product.id
        );

      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? {
                ...item,
                quantity:
                  item.quantity +
                  quantity,
              }
            : item
        );
      }

      return [
        ...prev,
        {
          product,
          quantity,
        },
      ];
    });
  };

  const removeFromCart = (
    id: string
  ) => {
    setItems((prev) =>
      prev.filter(
        (i) =>
          i.product.id !== id
      )
    );
  };

  const increaseQuantity = (
    id: string
  ) => {
    setItems((prev) =>
      prev.map((item) =>
        item.product.id === id
          ? {
              ...item,
              quantity:
                item.quantity + 1,
            }
          : item
      )
    );
  };

  const decreaseQuantity = (
    id: string
  ) => {
    setItems((prev) =>
      prev
        .map((item) =>
          item.product.id === id
            ? {
                ...item,
                quantity:
                  item.quantity - 1,
              }
            : item
        )
        .filter(
          (item) =>
            item.quantity > 0
        )
    );
  };

  const clearCart = () =>
    setItems([]);

  const totalItems =
    items.reduce(
      (sum, item) =>
        sum + item.quantity,
      0
    );

  const totalPrice =
    items.reduce(
      (sum, item) =>
        sum +
        item.product.price *
          item.quantity,
      0
    );

  const value = useMemo(
    () => ({
      items,
      addToCart,
      removeFromCart,
      increaseQuantity,
      decreaseQuantity,
      clearCart,
      totalItems,
      totalPrice,
    }),
    [items]
  );

  return (
    <CartContext.Provider
      value={value}
    >
      {children}
    </CartContext.Provider>
  );
}