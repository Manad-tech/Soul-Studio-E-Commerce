import { Heart, ShoppingBag, Zap } from "lucide-react";

import type { Product } from "@/types/product";

import { useCart } from "@/hooks/useCart";
import { toast } from "sonner";

interface Props {
  product: Product;
  quantity: number;
}

export default function PurchaseButtons({ product, quantity }: Props) {
  const { addToCart } = useCart();

  return (
    <div className="flex gap-4">
      <button
        onClick={() => {
          addToCart(product, quantity);

          toast.success("Added to cart", {
            description: `${product.name} has been added to your cart.`,
          });
        }}
        disabled={!product.inStock}
        className="flex h-14 flex-1 items-center justify-center gap-2 rounded-full bg-[#C58A5C] font-medium text-black transition hover:scale-105 disabled:cursor-not-allowed disabled:opacity-50"
      >
        <ShoppingBag size={18} />
        Add To Cart
      </button>

      <button
        disabled={!product.inStock}
        className="flex h-14 flex-1 items-center justify-center gap-2 rounded-full border border-white/10 transition hover:border-[#C58A5C]"
      >
        <Zap size={18} />
        Buy Now
      </button>

      <button className="flex h-14 w-14 items-center justify-center rounded-full border border-white/10 transition hover:border-[#C58A5C]">
        <Heart size={18} />
      </button>
    </div>
  );
}
