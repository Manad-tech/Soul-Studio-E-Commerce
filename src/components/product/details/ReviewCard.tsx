import { Star } from "lucide-react";

interface Props {
  name: string;
  rating: number;
  review: string;
}

export default function ReviewCard({
  name,
  rating,
  review,
}: Props) {
  return (
    <div className="rounded-3xl border border-white/10 bg-[#111111] p-7">

      <div className="flex items-center justify-between">

        <h3 className="font-semibold text-white">
          {name}
        </h3>

        <div className="flex gap-1">
          {Array.from({ length: rating }).map((_, i) => (
            <Star
              key={i}
              size={16}
              className="fill-[#C58A5C] text-[#C58A5C]"
            />
          ))}
        </div>

      </div>

      <p className="mt-5 leading-8 text-white/60">
        {review}
      </p>

    </div>
  );
}