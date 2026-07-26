import {
  ChevronRight,
  Home,
} from "lucide-react";

import { Link } from "react-router-dom";

import type { Product } from "@/types/product";

interface Props {
  product: Product;
}

export default function Breadcrumb({
  product,
}: Props) {
  return (
    <div className="flex flex-wrap items-center gap-2 text-sm text-white/50">

      <Link
        to="/"
        className="hover:text-[#C58A5C]"
      >
        <Home size={16} />
      </Link>

      <ChevronRight size={14} />

      <Link
        to="/shop"
        className="hover:text-[#C58A5C]"
      >
        Shop
      </Link>

      <ChevronRight size={14} />

      <span className="text-white">
        {product.name}
      </span>

    </div>
  );
}