import { motion } from "framer-motion";
import {
  Lightbulb,
  Pencil,
  Brush,
  Sparkles,
} from "lucide-react";

const steps = [
  {
    icon: Lightbulb,
    number: "01",
    title: "Concept",
    description:
      "Every artwork begins with an idea inspired by nature, architecture and emotions.",
  },
  {
    icon: Pencil,
    number: "02",
    title: "Sketch",
    description:
      "Detailed sketches are prepared to perfect composition, balance and storytelling.",
  },
  {
    icon: Brush,
    number: "03",
    title: "Creation",
    description:
      "Premium materials and handcrafted techniques transform concepts into timeless artwork.",
  },
  {
    icon: Sparkles,
    number: "04",
    title: "Finishing",
    description:
      "Each piece is inspected, protected and carefully packaged before reaching its collector.",
  },
];

export default function CreativeProcess() {
  return (
    <section className="py-28">

      <div className="text-center">

        <p className="text-sm uppercase tracking-[0.45em] text-[#C58A5C]">
          Creative Journey
        </p>

        <h2 className="mt-5 font-serif text-5xl text-white">
          From Inspiration
          <br />
          To Masterpiece
        </h2>

        <p className="mx-auto mt-6 max-w-3xl leading-8 text-white/60">
          Every artwork follows a carefully crafted journey,
          ensuring exceptional quality and timeless beauty.
        </p>

      </div>

      <div className="relative mt-20">

        {/* Timeline Line */}

        <div className="absolute left-1/2 top-0 hidden h-full w-px -translate-x-1/2 bg-white/10 lg:block" />

        <div className="space-y-16">

          {steps.map((step, index) => {
            const Icon = step.icon;

            const reverse = index % 2 === 1;

            return (
              <motion.div
                key={step.number}
                initial={{
                  opacity: 0,
                  y: 60,
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
                className={`grid items-center gap-10 lg:grid-cols-2 ${
                  reverse ? "lg:[&>*:first-child]:order-2" : ""
                }`}
              >

                {/* Card */}

                <div className="rounded-[32px] border border-white/10 bg-[#111111] p-10">

                  <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#C58A5C]/10 text-[#C58A5C]">

                    <Icon size={28} />

                  </div>

                  <span className="mt-8 block text-sm font-semibold tracking-[0.35em] text-[#C58A5C]">
                    STEP {step.number}
                  </span>

                  <h3 className="mt-3 font-serif text-4xl text-white">
                    {step.title}
                  </h3>

                  <p className="mt-6 leading-8 text-white/60">
                    {step.description}
                  </p>

                </div>

                {/* Circle */}

                <div className="hidden items-center justify-center lg:flex">

                  <div className="flex h-24 w-24 items-center justify-center rounded-full border border-[#C58A5C] bg-black text-3xl font-serif text-[#C58A5C] shadow-[0_0_35px_rgba(197,138,92,.35)]">

                    {step.number}

                  </div>

                </div>

              </motion.div>
            );
          })}

        </div>

      </div>

    </section>
  );
}