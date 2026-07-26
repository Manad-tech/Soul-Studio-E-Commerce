import {
  SlidersHorizontal,
  RotateCcw,
} from "lucide-react";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import SidebarFilter from "./SidebarFilter";

interface Props {
  maxPrice: number;
  onMaxPriceChange: (value: number) => void;

  rating: number;
  onRatingChange: (value: number) => void;

  availability: "all" | "stock" | "out";
  onAvailabilityChange: (
    value: "all" | "stock" | "out"
  ) => void;
}

export default function FilterDrawer({
  maxPrice,
  onMaxPriceChange,
  rating,
  onRatingChange,
  availability,
  onAvailabilityChange,
}: Props) {
  const resetFilters = () => {
    onMaxPriceChange(50000);
    onRatingChange(0);
    onAvailabilityChange("all");
  };

  return (
    <Sheet>
      <SheetTrigger asChild>

        <button className="flex h-16 items-center gap-3 rounded-full border border-white/10 bg-[#111111] px-6 text-white transition-all duration-300 hover:border-[#C58A5C] hover:bg-[#181818]">

          <SlidersHorizontal size={18} />

          <span className="font-medium">
            Filters
          </span>

        </button>

      </SheetTrigger>

      <SheetContent
        side="left"
        className="w-[390px] border-r border-white/10 bg-[#0B0B0B] p-0 text-white"
      >

        <SheetHeader className="border-b border-white/10 px-8 py-6">

          <SheetTitle className="font-serif text-4xl text-white">
            Filters
          </SheetTitle>

          <SheetDescription className="text-white/50">
            Refine your artwork collection.
          </SheetDescription>

        </SheetHeader>

        <div className="h-[calc(100vh-190px)] overflow-y-auto px-8 py-8">

          <SidebarFilter
            maxPrice={maxPrice}
            onMaxPriceChange={onMaxPriceChange}
            rating={rating}
            onRatingChange={onRatingChange}
            availability={availability}
            onAvailabilityChange={onAvailabilityChange}
          />

        </div>

        <div className="flex items-center justify-between border-t border-white/10 p-6">

          <button
            onClick={resetFilters}
            className="flex items-center gap-2 rounded-full border border-white/10 px-5 py-3 transition hover:border-red-500 hover:text-red-400"
          >
            <RotateCcw size={16} />

            Reset
          </button>

          <button className="rounded-full bg-[#C58A5C] px-8 py-3 font-medium text-black transition hover:scale-105">
            Apply Filters
          </button>

        </div>

      </SheetContent>
    </Sheet>
  );
}