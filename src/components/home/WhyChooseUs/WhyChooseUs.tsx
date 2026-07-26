import Container from "@/components/common/Container";

import { features } from "@/constants/features";

import FeatureCard from "./FeatureCard";

export default function WhyChooseUs() {
  return (
    <section className="bg-[#090909] py-36">
      <Container>
        <div className="mx-auto mb-20 max-w-3xl text-center">
          <p className="mb-4 text-xs uppercase tracking-[0.45em] text-[#C58A5C]">
            Why Soul Studio
          </p>

          <h2 className="font-serif text-6xl text-white">
            Crafted With Passion,
            <br />
            Delivered With Care
          </h2>

          <p className="mt-8 text-lg leading-9 text-white/70">
            Every artwork is created with precision, packed with care
            and delivered with authenticity.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
          {features.map((item) => (
            <FeatureCard
              key={item.title}
              {...item}
            />
          ))}
        </div>
      </Container>
    </section>
  );
}