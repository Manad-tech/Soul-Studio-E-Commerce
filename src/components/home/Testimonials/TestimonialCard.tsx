import { Star } from "lucide-react";

interface Props {
  name: string;
  city: string;
  image: string;
  review: string;
}

export default function TestimonialCard({
  name,
  city,
  image,
  review,
}: Props) {
  return (
    <div className="rounded-[32px] border border-white/10 bg-white/5 p-10 backdrop-blur-xl">
      <div className="mb-6 flex">
        {Array.from({ length: 5 }).map((_, index) => (
          <Star
            key={index}
            size={18}
            className="fill-[#C58A5C] text-[#C58A5C]"
          />
        ))}
      </div>

      <p className="text-lg leading-9 text-white/75">
        "{review}"
      </p>

      <div className="mt-10 flex items-center gap-5">
        <img
          src={image}
          alt={name}
          className="h-16 w-16 rounded-full object-cover"
        />

        <div>
          <h3 className="text-xl text-white">{name}</h3>

          <p className="text-sm text-white/60">{city}</p>
        </div>
      </div>
    </div>
  );
}