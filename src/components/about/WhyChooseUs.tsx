import { motion } from "framer-motion";
import {
  Award,
  Brush,
  ShieldCheck,
  Truck,
} from "lucide-react";

const features = [
  {
    icon: Brush,
    title: "Handcrafted Artwork",
    description:
      "Every artwork is individually handcrafted with exceptional attention to detail.",
  },
  {
    icon: Award,
    title: "Premium Quality",
    description:
      "Museum-grade materials ensure durability, elegance and timeless beauty.",
  },
  {
    icon: Truck,
    title: "Safe Worldwide Shipping",
    description:
      "Professional packaging protects every artwork throughout its journey.",
  },
  {
    icon: ShieldCheck,
    title: "Certificate of Authenticity",
    description:
      "Every original artwork includes an authenticity certificate signed by the studio.",
  },
];

export default function WhyChooseUs() {
  return (
    <section className="py-28">

      <div className="text-center">

        <p className="text-sm uppercase tracking-[0.45em] text-[#C58A5C]">
          Why Choose Us
        </p>

        <h2 className="mt-5 font-serif text-5xl leading-tight text-white">
          Crafted For
          <br />
          Art Collectors
        </h2>

        <p className="mx-auto mt-6 max-w-3xl leading-8 text-white/60">
          We combine traditional craftsmanship with modern
          artistic expression to create timeless pieces that
          elevate every interior.
        </p>

      </div>

      <div className="mt-20 grid gap-8 md:grid-cols-2 xl:grid-cols-4">

        {features.map((item, index) => {

          const Icon = item.icon;

          return (

            <motion.div
              key={item.title}
              initial={{
                opacity: 0,
                y: 50,
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
              className="group rounded-[32px] border border-white/10 bg-[#111111] p-8 transition duration-500 hover:-translate-y-2 hover:border-[#C58A5C]/40"
            >

              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#C58A5C]/10 text-[#C58A5C] transition duration-300 group-hover:bg-[#C58A5C] group-hover:text-black">

                <Icon size={30} />

              </div>

              <h3 className="mt-8 font-serif text-3xl text-white">
                {item.title}
              </h3>

              <p className="mt-5 leading-8 text-white/60">
                {item.description}
              </p>

            </motion.div>

          );

        })}

      </div>

    </section>
  );
}