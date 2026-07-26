import { ArrowRight } from "lucide-react";

import bg from "@/assets/images/artist/studio-1.jpg";

export default function NewsletterSection() {
  return (
    <section className="relative mt-32 overflow-hidden rounded-[36px]">

      <img
        src={bg}
        alt=""
        className="absolute inset-0 h-full w-full object-cover"
      />

      <div className="absolute inset-0 bg-black/70" />

      <div className="relative grid gap-12 px-10 py-20 lg:grid-cols-2 lg:px-20">

        <div>

          <p className="uppercase tracking-[0.45em] text-[#C58A5C] text-sm">
            Newsletter
          </p>

          <h2 className="mt-5 font-serif text-5xl leading-tight text-white">
            Receive Exclusive
            <br />
            Collection Updates
          </h2>

          <p className="mt-6 max-w-lg leading-8 text-white/70">
            Join our mailing list to receive early access to
            newly released collections and studio stories.
          </p>

        </div>

        <div className="flex items-center">

          <form className="flex w-full flex-col gap-4 sm:flex-row">

            <input
              placeholder="Enter your email"
              className="h-16 flex-1 rounded-full border border-white/20 bg-white/10 px-7 text-white backdrop-blur outline-none focus:border-[#C58A5C]"
            />

            <button className="flex h-16 items-center justify-center gap-2 rounded-full bg-[#C58A5C] px-9 font-medium text-black transition hover:scale-105">

              Subscribe

              <ArrowRight size={18}/>

            </button>

          </form>

        </div>

      </div>

    </section>
  );
}