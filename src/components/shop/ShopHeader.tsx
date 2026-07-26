import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

import heroImage from "@/assets/images/hero/hero-2.jpg";

export default function ShopHeader() {
  return (
    <section className="relative h-[42vh] min-h-[360px] overflow-hidden">

      <img
        src={heroImage}
        alt="Shop Hero"
        className="absolute inset-0 h-full w-full object-cover"
      />

      <div className="absolute inset-0 bg-black/60" />

      <div className="absolute inset-0 bg-gradient-to-r from-black via-black/50 to-black/20" />

      <div className="relative mx-auto flex h-full max-w-7xl items-center px-6">

        <motion.div
          initial={{ opacity: 0, y: 35 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: .7 }}
          className="max-w-2xl"
        >

          <p className="mb-5 text-xs uppercase tracking-[0.45em] text-[#C58A5C]">
            Curated Collection
          </p>

          <h1 className="font-serif text-5xl leading-none text-white md:text-7xl">
            Original
            <br />
            Artworks
          </h1>

          <p className="mt-6 max-w-xl text-white/70 leading-8">
            Browse handcrafted paintings, sculptures and
            collectible pieces created for modern interiors.
          </p>

          <div className="mt-8 flex gap-4">

            <Link
              to="/portfolio"
              className="flex items-center gap-2 rounded-full bg-[#C58A5C] px-7 py-3 text-black transition hover:scale-105"
            >
              Explore

              <ArrowRight size={16}/>
            </Link>

            <Link
              to="/contact"
              className="rounded-full border border-white/20 px-7 py-3 transition hover:bg-white hover:text-black"
            >
              Commission
            </Link>

          </div>

        </motion.div>

      </div>

    </section>
  );
}