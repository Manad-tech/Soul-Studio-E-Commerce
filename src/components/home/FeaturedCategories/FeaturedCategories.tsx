import Container from "@/components/common/Container";

import { categories } from "@/constants/categories";

import CategoryCard from "./CategoryCard";

export default function FeaturedCategories() {
  return (
    <section className="py-32">
      <Container>
        <div className="mb-20 text-center">
          <p className="mb-4 uppercase tracking-[0.35em] text-[#C58A5C]">
            Explore
          </p>

          <h2 className="font-serif text-6xl text-white">
            Featured Collections
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-lg text-white/70">
            Browse curated collections of paintings,
            sculptures, ceramics, resin art and prints.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
          {categories.map((category) => (
            <CategoryCard
              key={category.id}
              {...category}
            />
          ))}
        </div>
      </Container>
    </section>
  );
}