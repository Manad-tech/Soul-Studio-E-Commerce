import { motion } from "framer-motion";

import { heroContent } from "@/constants/hero";

import HeroButtons from "./HeroButtons";
import HeroStats from "./HeroStats";

export default function HeroContent() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.9,
        ease: "easeOut",
      }}
      className="relative z-10 max-w-4xl"
    >
      {/* Badge */}
      <p className="mb-6 text-xs font-medium uppercase tracking-[0.45em] text-[#C58A5C]">
        {heroContent.badge}
      </p>

      {/* Heading */}
      <h1 className="max-w-4xl font-serif text-6xl font-medium leading-[1.02] tracking-[-0.04em] text-white md:text-8xl">
        Where Art
        <br />
        Meets Soul
      </h1>

      {/* Description */}
      <p className="mt-8 max-w-xl text-lg leading-9 text-white/75">
        {heroContent.description}
      </p>

      {/* Buttons */}
      <div className="mt-12">
        <HeroButtons />
      </div>

      {/* Stats */}
      <div className="mt-20">
        <HeroStats />
      </div>
    </motion.div>
  );
}