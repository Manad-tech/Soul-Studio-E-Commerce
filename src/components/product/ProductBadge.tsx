interface Props {
  featured?: boolean;
  bestseller?: boolean;
}

export default function ProductBadge({
  featured,
  bestseller,
}: Props) {
  if (!featured && !bestseller) return null;

  return (
    <div className="absolute left-5 top-5 z-20 flex flex-col gap-2">
      {featured && (
        <span className="rounded-full bg-[#C58A5C] px-4 py-1 text-xs font-medium uppercase tracking-wider text-black">
          Featured
        </span>
      )}

      {bestseller && (
        <span className="rounded-full bg-white px-4 py-1 text-xs font-medium uppercase tracking-wider text-black">
          Bestseller
        </span>
      )}
    </div>
  );
}