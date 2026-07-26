import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

import Container from "@/components/common/Container";
import { Button } from "@/components/ui/button";

import { commission } from "@/constants/commission";

import bg from "@/assets/images/commission/commission.jpg";

export default function Commission() {
  return (
    <section className="relative overflow-hidden py-36">
      {/* Background */}

      <img
        src={bg}
        alt="Commission Artwork"
        className="absolute inset-0 h-full w-full object-cover brightness-40"
      />

      <div className="absolute inset-0 bg-black/65" />

      <Container>
        <div className="relative z-10 mx-auto max-w-4xl text-center">
          <p className="mb-6 text-xs uppercase tracking-[0.45em] text-[#C58A5C]">
            {commission.badge}
          </p>

          <h2 className="font-serif text-5xl leading-tight text-white md:text-7xl">
            {commission.title}
          </h2>

          <p className="mx-auto mt-8 max-w-2xl text-lg leading-9 text-white/70">
            {commission.description}
          </p>

          <Button
            asChild
            className="mt-12 h-12 rounded-full bg-[#C58A5C] px-8 text-black hover:bg-[#D69A69]"
          >
            <Link to="/commission">
              {commission.button}

              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </Container>
    </section>
  );
}