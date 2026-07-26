import { Heart, ShoppingBag, Sparkles, Star } from "lucide-react";
import { Link } from "react-router-dom";

import type { Product } from "@/types/product";
import { useCart } from "@/hooks/useCart";

import { useWishlist } from "@/hooks/useWishlist";
import { toast } from "sonner";

interface Props {
  product: Product;
}

export default function ProductCard({ product }: Props) {
  const { addToCart } = useCart();

  const { addToWishlist, isWishlisted } = useWishlist();

  return (
    <article className="group overflow-hidden rounded-[28px] border border-white/10 bg-[#111111] shadow-[0_20px_60px_rgba(0,0,0,0.35)] transition-all duration-500 hover:-translate-y-2 hover:border-[#C58A5C]/40 hover:shadow-[0_30px_80px_rgba(197,138,92,0.18)]">
      {/* Image */}
      <div className="relative overflow-hidden">
        <Link to={`/product/${product.slug}`}>
          <img
            src={product.image}
            alt={product.name}
            className="aspect-[4/5] w-full object-cover transition duration-700 group-hover:scale-110"
          />
        </Link>

        {/* Overlay */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent opacity-90" />

        {/* Badges */}
        <div className="absolute left-5 top-5 flex gap-2">
          {product.featured && (
            <span className="flex items-center gap-2 rounded-full bg-[#C58A5C] px-4 py-2 text-xs font-semibold uppercase tracking-wider text-black">
              <Sparkles size={12} />
              Featured
            </span>
          )}

          {!product.inStock && (
            <span className="rounded-full bg-red-600 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-white">
              Sold Out
            </span>
          )}
        </div>

        {/* Wishlist */}
        <button
          onClick={(e) => {
            e.preventDefault();
            addToWishlist(product);
            toast.success(
              isWishlisted(product.id)
                ? "Removed from wishlist"
                : "Added to wishlist",
            );
          }}
          className={`absolute right-5 top-5 flex h-11 w-11 items-center justify-center rounded-full backdrop-blur transition-all duration-300 ${
            isWishlisted(product.id)
              ? "bg-white/50 text-[#C58A5C]"
              : "bg-black/60 text-white hover:bg-[#C58A5C] hover:text-black"
          }`}
        >
          <Heart
            size={18}
            fill={isWishlisted(product.id) ? "currentColor" : "none"}
          />
        </button>

        {/* Hover Buttons */}
        <div className="absolute bottom-0 left-0 right-0 translate-y-full space-y-3 p-5 transition-all duration-500 group-hover:translate-y-0">
          <Link
            to={`/product/${product.slug}`}
            className="flex w-full items-center justify-center rounded-full border border-white/20 bg-black/60 py-3 text-sm font-medium text-white backdrop-blur transition-all hover:border-[#C58A5C] hover:bg-white hover:text-black"
          >
            Quick View
          </Link>

          <button
            onClick={(e) => {
              e.preventDefault();

              addToCart(product);

              toast.success("Added to cart", {
                description: `${product.name} has been added to your cart.`,
              });
            }}
            className="flex w-full items-center justify-center gap-2 rounded-full bg-[#C58A5C] py-3 font-medium text-black transition-all hover:bg-[#d69d6d]"
          >
            <ShoppingBag size={18} />
            Add To Cart
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="space-y-5 p-7">
        <p className="text-xs uppercase tracking-[0.35em] text-[#C58A5C]">
          {product.category}
        </p>

        <Link to={`/product/${product.slug}`}>
          <h3 className="font-serif text-3xl text-white transition group-hover:text-[#C58A5C]">
            {product.name}
          </h3>
        </Link>

        <div className="flex items-center gap-1">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star key={i} size={15} className="fill-[#C58A5C] text-[#C58A5C]" />
          ))}

          <span className="ml-2 text-sm text-white/60">
            {product.rating} ({product.reviews})
          </span>
        </div>

        <div className="space-y-2">
          {product.originalPrice && (
            <p className="text-sm font-medium text-[#C58A5C]">
              Save{" "}
              {Math.round(
                ((product.originalPrice - product.price) /
                  product.originalPrice) *
                  100,
              )}
              %
            </p>
          )}

          <div className="flex items-center gap-3">
            <span className="text-2xl font-semibold text-white">
              ₹ {product.price.toLocaleString("en-IN")}
            </span>

            {product.originalPrice && (
              <span className="text-white/40 line-through">
                ₹ {product.originalPrice.toLocaleString("en-IN")}
              </span>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}
