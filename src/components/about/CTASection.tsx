import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

import heroImage from "@/assets/images/hero/hero-2.jpg";

export default function AboutHero() {
  return (
    <section className="relative h-[70vh] min-h-[600px] overflow-hidden">

      {/* Background */}

      <img
        src={heroImage}
        alt="About Hero"
        className="absolute inset-0 h-full w-full object-cover"
      />

      {/* Overlay */}

      <div className="absolute inset-0 bg-black/70" />

      {/* Gradient */}

      <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-transparent" />

      <div className="relative z-10 mx-auto flex h-full max-w-7xl items-center px-6">

        <motion.div
          initial={{
            opacity: 0,
            y: 60,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.8,
          }}
          className="max-w-3xl"
        >

          <p className="mb-6 uppercase tracking-[0.45em] text-[#C58A5C]">

            About Our Studio

          </p>

          <h1 className="font-serif text-6xl leading-[1.05] text-white md:text-8xl">

            Crafting
            <br />
            Timeless Art

          </h1>

          <p className="mt-8 max-w-2xl text-lg leading-9 text-white/70">

            Every artwork is designed with passion,
            handcrafted using premium materials,
            and created to bring elegance,
            emotion and timeless beauty into
            modern living spaces.

          </p>

          <div className="mt-10 flex flex-wrap gap-5">

            <Link
              to="/shop"
              className="flex items-center gap-3 rounded-full bg-[#C58A5C] px-8 py-4 font-medium text-black transition duration-300 hover:scale-105"
            >
              Explore Collection

              <ArrowRight size={18} />
            </Link>

            <Link
              to="/contact"
              className="rounded-full border border-white/20 px-8 py-4 text-white transition hover:bg-white hover:text-black"
            >
              Contact Studio
            </Link>

          </div>

        </motion.div>

      </div>

    </section>
  );
}