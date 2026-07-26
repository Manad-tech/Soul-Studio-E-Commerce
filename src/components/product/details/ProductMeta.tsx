import {
  BadgeCheck,
  Brush,
  Ruler,
} from "lucide-react";

import type { Product } from "@/types/product";

interface Props {
  product: Product;
}

export default function ProductMeta({
  product,
}: Props) {
  return (
    <div className="grid gap-5">

      <MetaItem
        icon={<Brush size={18} />}
        label="Category"
        value={product.category}
      />

      <MetaItem
        icon={<BadgeCheck size={18} />}
        label="Availability"
        value={
          product.inStock
            ? "In Stock"
            : "Sold Out"
        }
      />

      <MetaItem
        icon={<Ruler size={18} />}
        label="Artwork Code"
        value={product.slug.toUpperCase()}
      />

    </div>
  );
}

function MetaItem({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-[#111111] p-5">

      <div className="flex items-center gap-3">

        <div className="text-[#C58A5C]">
          {icon}
        </div>

        <span className="text-white/50">
          {label}
        </span>

      </div>

      <span className="font-medium text-white">
        {value}
      </span>

    </div>
  );
}