import { motion } from "framer-motion";
import { Award, Brush, Palette, Sparkles } from "lucide-react";

import artistImage from "@/assets/images/artist/studio-1.jpg";

const highlights = [
  {
    icon: Brush,
    title: "Handcrafted Excellence",
    description:
      "Every artwork is individually handcrafted with attention to every detail.",
  },
  {
    icon: Palette,
    title: "Premium Materials",
    description:
      "Only museum-quality canvas, pigments and finishing materials are used.",
  },
  {
    icon: Award,
    title: "Limited Collections",
    description:
      "Every collection is thoughtfully curated with limited availability.",
  },
];

export default function ArtistStory() {
  return (
    <section className="py-28">

      <div className="grid items-center gap-20 lg:grid-cols-2">

        {/* Image */}

        <motion.div
          initial={{ opacity: 0, x: -60 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative"
        >

          <div className="overflow-hidden rounded-[36px] border border-white/10">

            <img
              src={artistImage}
              alt="Artist Studio"
              className="aspect-[4/5] w-full object-cover transition duration-700 hover:scale-105"
            />

          </div>

          <div className="absolute -bottom-8 -right-8 rounded-[28px] border border-white/10 bg-[#111111] p-8 shadow-2xl">

            <p className="text-sm uppercase tracking-[0.35em] text-[#C58A5C]">
              Experience
            </p>

            <h3 className="mt-3 font-serif text-5xl text-white">
              12+
            </h3>

            <p className="mt-2 text-white/60">
              Years Creating Art
            </p>

          </div>

        </motion.div>

        {/* Content */}

        <motion.div
          initial={{ opacity: 0, x: 60 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >

          <div className="flex items-center gap-3 text-[#C58A5C]">

            <Sparkles size={18} />

            <span className="text-sm uppercase tracking-[0.4em]">
              Our Story
            </span>

          </div>

          <h2 className="mt-6 font-serif text-5xl leading-tight text-white">

            Art That Lives
            <br />
            Beyond Time

          </h2>

          <p className="mt-8 leading-9 text-white/65">

            Our studio believes that every artwork should tell a
            meaningful story. From the first sketch to the final
            brushstroke, every creation is crafted with patience,
            precision and passion.

          </p>

          <p className="mt-6 leading-9 text-white/65">

            Inspired by nature, architecture and modern interiors,
            our collections combine timeless aesthetics with
            contemporary craftsmanship, creating artworks that
            transform every living space.

          </p>

          <div className="mt-12 space-y-8">

            {highlights.map((item) => {

              const Icon = item.icon;

              return (
                <div
                  key={item.title}
                  className="flex gap-5"
                >

                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-[#C58A5C]/10 text-[#C58A5C]">

                    <Icon size={24} />

                  </div>

                  <div>

                    <h3 className="text-xl font-semibold text-white">
                      {item.title}
                    </h3>

                    <p className="mt-2 leading-8 text-white/60">
                      {item.description}
                    </p>

                  </div>

                </div>
              );

            })}

          </div>

        </motion.div>

      </div>

    </section>
  );
}