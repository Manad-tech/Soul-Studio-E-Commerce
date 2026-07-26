import ProductPrice from "./ProductPrice";
import ProductRating from "./ProductRating";

interface Props {
  category: string;
  name: string;
  rating: number;
  reviews: number;
  price: number;
  originalPrice?: number;
}

export default function ProductInfo({
  category,
  name,
 rating,
  reviews,
  price,
  originalPrice,
}: Props) {
  return (
    <div className="space-y-2 p-6">
      <p className="text-xs uppercase tracking-[0.35em] text-[#C58A5C]">
        {category}
      </p>

      <h3 className="font-serif text-3xl text-white">
        {name}
      </h3>

      <ProductRating
        rating={rating}
        reviews={reviews}
      />

      <ProductPrice
        price={price}
        originalPrice={originalPrice}
      />
    </div>
  );
}