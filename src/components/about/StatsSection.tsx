import { motion } from "framer-motion";
import {
  Brush,
  Globe,
  Star,
  Users,
} from "lucide-react";

const stats = [
  {
    icon: Brush,
    number: "500+",
    label: "Artworks Created",
  },
  {
    icon: Users,
    number: "1,200+",
    label: "Happy Collectors",
  },
  {
    icon: Globe,
    number: "18+",
    label: "Countries Served",
  },
  {
    icon: Star,
    number: "4.9",
    label: "Average Rating",
  },
];

export default function StatsSection() {
  return (
    <section className="py-28">

      <div className="rounded-[40px] border border-white/10 bg-[#111111] p-10 md:p-16">

        <div className="text-center">

          <p className="text-sm uppercase tracking-[0.45em] text-[#C58A5C]">
            Our Journey
          </p>

          <h2 className="mt-5 font-serif text-5xl text-white">
            Numbers That Reflect
            <br />
            Our Passion
          </h2>

        </div>

        <div className="mt-20 grid gap-8 sm:grid-cols-2 xl:grid-cols-4">

          {stats.map((item, index) => {

            const Icon = item.icon;

            return (

              <motion.div
                key={item.label}
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
                  delay: index * .12,
                }}
                className="rounded-[30px] border border-white/10 bg-black/30 p-8 text-center transition duration-500 hover:-translate-y-2 hover:border-[#C58A5C]/40"
              >

                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-[#C58A5C]/10 text-[#C58A5C]">

                  <Icon size={30} />

                </div>

                <h3 className="mt-8 font-serif text-5xl text-white">
                  {item.number}
                </h3>

                <p className="mt-4 text-white/60">
                  {item.label}
                </p>

              </motion.div>

            );

          })}

        </div>

      </div>

    </section>
  );
}