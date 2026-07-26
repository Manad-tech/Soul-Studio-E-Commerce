import { motion } from "framer-motion";

import type { Product } from "@/types/product";

import ProductCard from "@/components/product/ProductCard";
import EmptyState from "./EmptyState";

interface Props {
  products: Product[];
}

export default function ProductGrid({
  products,
}: Props) {
  if (products.length === 0) {
    return <EmptyState />;
  }

  return (
    <div className="grid gap-8 sm:grid-cols-2 xl:grid-cols-4">
      {products.map((product, index) => (
        <motion.div
          key={product.id}
          initial={{
            opacity: 0,
            y: 40,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
          }}
          transition={{
            duration: 0.45,
            delay: index * 0.06,
          }}
        >
          <ProductCard product={product} />
        </motion.div>
      ))}
    </div>
  );
}