import { Sparkles } from "lucide-react";

import type { SortOption } from "@/hooks/useShop";

import CategoryTabs from "./CategoryTabs";
import FilterDrawer from "./FilterDrawer";
import SearchBar from "./SearchBar";
import SortSelect from "./SortSelect";
import ViewToggle from "./ViewToggle";

interface Props {
  search: string;
  onSearchChange: (value: string) => void;

  category: string;
  onCategoryChange: (value: string) => void;

  sort: SortOption;
  onSortChange: (value: SortOption) => void;

  totalProducts: number;

  maxPrice: number;
  onMaxPriceChange: (value: number) => void;

  rating: number;
  onRatingChange: (value: number) => void;

  availability: "all" | "stock" | "out";
  onAvailabilityChange: (
    value: "all" | "stock" | "out"
  ) => void;
}

export default function ShopToolbar({
  search,
  onSearchChange,

  category,
  onCategoryChange,

  sort,
  onSortChange,

  totalProducts,

  maxPrice,
  onMaxPriceChange,

  rating,
  onRatingChange,

  availability,
  onAvailabilityChange,
}: Props) {
  return (
    <div className="space-y-8">
      {/* Header */}

      <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
        <div>
          <div className="flex items-center gap-2 text-[#C58A5C]">
            <Sparkles size={16} />

            <span className="text-xs font-medium uppercase tracking-[0.45em]">
              Curated Collection
            </span>
          </div>

          <h2 className="mt-4 font-serif text-5xl leading-none text-white md:text-6xl">
            Shop Artwork
          </h2>

          <p className="mt-4 text-white/60">
            Showing{" "}
            <span className="font-semibold text-white">
              {totalProducts}
            </span>{" "}
            curated pieces
          </p>
        </div>

        <div className="flex items-center gap-3">
          <FilterDrawer
            maxPrice={maxPrice}
            onMaxPriceChange={onMaxPriceChange}
            rating={rating}
            onRatingChange={onRatingChange}
            availability={availability}
            onAvailabilityChange={
              onAvailabilityChange
            }
          />

          <SortSelect
            value={sort}
            onChange={onSortChange}
          />

          <ViewToggle
            value="grid"
            onChange={() => {}}
          />
        </div>
      </div>

      {/* Search */}

      <SearchBar
        value={search}
        onChange={onSearchChange}
      />

      {/* Categories */}

      <CategoryTabs
        value={category}
        onChange={onCategoryChange}
      />

      <div className="h-px bg-white/10" />
    </div>
  );
}