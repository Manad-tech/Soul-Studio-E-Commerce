interface Props {
  price: number;
  originalPrice?: number;
}

export default function ProductPrice({
  price,
  originalPrice,
}: Props) {
  return (
    <div className="mt-5 flex items-center gap-3">
      <span className="text-2xl font-semibold text-white">
        ₹{price.toLocaleString("en-IN")}
      </span>

      {originalPrice && (
        <span className="text-lg text-white/40 line-through">
          ₹{originalPrice.toLocaleString("en-IN")}
        </span>
      )}
    </div>
  );
}