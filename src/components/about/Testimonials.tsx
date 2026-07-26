import { motion } from "framer-motion";
import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Aarav Sharma",
    location: "Jaipur, India",
    review:
      "The artwork exceeded my expectations. The craftsmanship and detailing are absolutely stunning. It has become the centerpiece of my living room.",
  },
  {
    name: "Emily Johnson",
    location: "London, UK",
    review:
      "Beautiful textures, premium quality and excellent packaging. The entire buying experience felt luxurious from start to finish.",
  },
  {
    name: "Rohan Mehta",
    location: "Mumbai, India",
    review:
      "Every guest who visits asks about this artwork. It completely transformed the atmosphere of my home.",
  },
];

export default function Testimonials() {
  return (
    <section className="py-28">

      <div className="text-center">

        <p className="text-sm uppercase tracking-[0.45em] text-[#C58A5C]">
          Testimonials
        </p>

        <h2 className="mt-5 font-serif text-5xl text-white">
          Loved By
          <br />
          Collectors Worldwide
        </h2>

        <p className="mx-auto mt-6 max-w-3xl leading-8 text-white/60">
          Every artwork carries a story, and every collector
          becomes a part of that journey.
        </p>

      </div>

      <div className="mt-20 grid gap-8 lg:grid-cols-3">

        {testimonials.map((item, index) => (

          <motion.div
            key={item.name}
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
              duration: .6,
              delay: index * .15,
            }}
            className="rounded-[32px] border border-white/10 bg-[#111111] p-8 transition duration-500 hover:-translate-y-2 hover:border-[#C58A5C]/40"
          >

            <div className="flex gap-1">

              {Array.from({ length: 5 }).map((_, i) => (

                <Star
                  key={i}
                  size={18}
                  className="fill-[#C58A5C] text-[#C58A5C]"
                />

              ))}

            </div>

            <p className="mt-8 leading-8 text-white/70">
              "{item.review}"
            </p>

            <div className="mt-10 border-t border-white/10 pt-6">

              <h3 className="font-serif text-2xl text-white">
                {item.name}
              </h3>

              <p className="mt-2 text-white/50">
                {item.location}
              </p>

            </div>

          </motion.div>

        ))}

      </div>

    </section>
  );
}