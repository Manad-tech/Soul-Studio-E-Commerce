import ProductActions from "./ProductActions";
import ProductBadge from "./ProductBadge";

interface Props {
  image: string;
  name: string;
  featured?: boolean;
  bestseller?: boolean;
}

export default function ProductImage({
  image,
  name,
 featured,
  bestseller,
}: Props) {
  return (
    <div className="group relative overflow-hidden">
      <img
        src={image}
        alt={name}
        className="h-[420px] w-full object-cover transition duration-700 group-hover:scale-110"
      />

      <ProductBadge
        featured={featured}
        bestseller={bestseller}
      />

      <ProductActions />
    </div>
  );
}