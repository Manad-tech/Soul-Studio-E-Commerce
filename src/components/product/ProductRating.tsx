import { Star } from "lucide-react";

interface Props {
  rating: number;
  reviews: number;
}

export default function ProductRating({
  rating,
  reviews,
}: Props) {
  return (
    <div className="mt-3 flex items-center gap-2">
      <Star
        className="fill-[#C58A5C] text-[#C58A5C]"
        size={16}
      />

      <span className="text-sm text-white">
        {rating}
      </span>

      <span className="text-sm text-white/50">
        ({reviews})
      </span>
    </div>
  );
}