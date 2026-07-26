import { ArrowDownUp } from "lucide-react";

import type { SortOption } from "@/hooks/useShop";

interface Props {
  value: SortOption;
  onChange: (value: SortOption) => void;
}

export default function SortSelect({
  value,
  onChange,
}: Props) {
  return (
    <div className="relative">
      <ArrowDownUp
        size={16}
        className="pointer-events-none absolute left-5 top-1/2 -translate-y-1/2 text-[#C58A5C]"
      />

      <select
        value={value}
        onChange={(e) =>
          onChange(e.target.value as SortOption)
        }
        className="h-16 w-full appearance-none rounded-full border border-white/10 bg-[#111111] pl-12 pr-12 text-[15px] text-white outline-none transition-all duration-300 focus:border-[#C58A5C] focus:bg-[#151515] focus:shadow-[0_0_0_4px_rgba(197,138,92,0.08)]"
      >
        <option value="featured">
          Featured
        </option>

        <option value="rating">
          Highest Rated
        </option>

        <option value="price-low">
          Price : Low to High
        </option>

        <option value="price-high">
          Price : High to Low
        </option>
      </select>

      <svg
        className="pointer-events-none absolute right-5 top-1/2 -translate-y-1/2 text-white/50"
        width="16"
        height="16"
        viewBox="0 0 20 20"
        fill="none"
      >
        <path
          d="M5 7L10 12L15 7"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}