import { Star } from "lucide-react";

import type { Product } from "@/types/product";

import ProductMeta from "./ProductMeta";
import PurchaseButtons from "./PurchaseButtons";
import QuantitySelector from "./QuantitySelector";
import { useState } from "react";

interface Props {
  product: Product;
}

export default function ProductInfo({ product }: Props) {
  const discount = product.originalPrice
    ? Math.round(
        ((product.originalPrice - product.price) / product.originalPrice) * 100,
      )
    : 0;

  const [quantity, setQuantity] = useState(1);

  return (
    <div className="space-y-8">
      {/* Category */}
      <p className="text-xs uppercase tracking-[0.35em] text-[#C58A5C]">
        {product.category}
      </p>
      {/* Name */}
      <h1 className="font-serif text-5xl leading-tight text-white">
        {product.name}
      </h1>
      {/* Rating */}
      <div className="flex items-center gap-4">
        <div className="flex gap-1">
          {Array.from({ length: 5 }).map((_, index) => (
            <Star
              key={index}
              size={18}
              className="fill-[#C58A5C] text-[#C58A5C]"
            />
          ))}
        </div>

        <span className="text-white/60">
          {product.rating} ({product.reviews} Reviews)
        </span>
      </div>
      {/* Price */}
      <div className="flex flex-wrap items-center gap-4">
        <span className="text-5xl font-semibold text-white">
          ₹ {product.price.toLocaleString("en-IN")}
        </span>

        {product.originalPrice && (
          <>
            <span className="text-2xl text-white/35 line-through">
              ₹ {product.originalPrice.toLocaleString("en-IN")}
            </span>

            <span className="rounded-full bg-[#C58A5C]/10 px-4 py-2 text-sm font-medium text-[#C58A5C]">
              Save {discount}%
            </span>
          </>
        )}
      </div>
      {/* Description */}
      <p className="leading-8 text-white/65">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quisquam,
        recusandae. Every artwork is handcrafted using premium quality materials
        and delivered with secure packaging.
      </p>
      <div className="h-px bg-white/10" />
      <ProductMeta product={product} />
      <div className="h-px bg-white/10" />
      <QuantitySelector value={quantity} onChange={setQuantity} />
      <PurchaseButtons product={product} quantity={quantity} />{" "}
    </div>
  );
}
