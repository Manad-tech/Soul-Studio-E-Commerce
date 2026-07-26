import {
  BadgePercent,
  Star,
  PackageCheck,
} from "lucide-react";

import AvailabilityFilter from "./AvailabilityFilter";
import PriceFilter from "./PriceFilter";
import RatingFilter from "./RatingFilter";

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

export default function SidebarFilter({
  maxPrice,
  onMaxPriceChange,
  rating,
  onRatingChange,
  availability,
  onAvailabilityChange,
}: Props) {
  return (
    <div className="space-y-6">

      {/* Price */}

      <section className="rounded-3xl border border-white/10 bg-[#111111] p-6">

        <div className="mb-6 flex items-center gap-3">

          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#C58A5C]/15 text-[#C58A5C]">
            <BadgePercent size={18}/>
          </div>

          <div>
            <h3 className="font-serif text-2xl text-white">
              Price
            </h3>

            <p className="text-sm text-white/45">
              Filter by budget
            </p>
          </div>

        </div>

        <PriceFilter
          value={maxPrice}
          onChange={onMaxPriceChange}
        />

      </section>

      {/* Rating */}

      <section className="rounded-3xl border border-white/10 bg-[#111111] p-6">

        <div className="mb-6 flex items-center gap-3">

          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#C58A5C]/15 text-[#C58A5C]">
            <Star size={18}/>
          </div>

          <div>
            <h3 className="font-serif text-2xl text-white">
              Rating
            </h3>

            <p className="text-sm text-white/45">
              Customer reviews
            </p>
          </div>

        </div>

        <RatingFilter
          value={rating}
          onChange={onRatingChange}
        />

      </section>

      {/* Availability */}

      <section className="rounded-3xl border border-white/10 bg-[#111111] p-6">

        <div className="mb-6 flex items-center gap-3">

          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#C58A5C]/15 text-[#C58A5C]">
            <PackageCheck size={18}/>
          </div>

          <div>
            <h3 className="font-serif text-2xl text-white">
              Availability
            </h3>

            <p className="text-sm text-white/45">
              Product status
            </p>
          </div>

        </div>

        <AvailabilityFilter
          value={availability}
          onChange={onAvailabilityChange}
        />

      </section>

    </div>
  );
}