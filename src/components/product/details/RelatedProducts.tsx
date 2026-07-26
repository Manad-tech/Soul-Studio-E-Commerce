import type { Product } from "@/types/product";

import ProductCard from "@/components/product/ProductCard";

interface Props {
  products: Product[];
}

export default function RelatedProducts({
  products,
}: Props) {
  if (products.length === 0) return null;

  return (
    <section className="space-y-10">
      <div>
        <p className="text-sm uppercase tracking-[0.35em] text-[#C58A5C]">
          You May Also Like
        </p>

        <h2 className="mt-3 font-serif text-5xl text-white">
          Related Artworks
        </h2>
      </div>

      <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-4">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
          />
        ))}
      </div>
    </section>
  );
}