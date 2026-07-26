import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

interface Props {
  title: string;
  count: number;
  image: string;
  slug: string;
}

export default function CategoryCard({
  title,
  count,
  image,
  slug,
}: Props) {
  return (
    <Link
      to={`/shop/${slug}`}
      className="group relative block overflow-hidden rounded-3xl"
    >
      <img
        src={image}
        alt={title}
        className="h-125 w-full object-cover transition duration-700 group-hover:scale-110"
      />

      <div className="absolute inset-0 bg-linear-to-t from-black via-black/20 to-transparent" />

      <div className="absolute bottom-8 left-8">
        <p className="mb-2 text-sm uppercase tracking-[0.3em] text-white/70">
          {count} Works
        </p>

        <h3 className="font-serif text-4xl text-white">
          {title}
        </h3>

        <div className="mt-6 flex items-center gap-2 text-sm uppercase tracking-[0.2em] text-[#C58A5C]">
          Explore
          <ArrowRight size={18} />
        </div>
      </div>
    </Link>
  );
}