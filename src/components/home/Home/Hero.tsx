import Container from "@/components/common/Container";

import HeroContent from "./HeroContent";

import heroImage from "@/assets/images/hero/hero.jpg";

export default function Hero() {
  return (
    <section className="relative flex min-h-screen items-center overflow-hidden">
      {/* Background */}
      <img
        src={heroImage}
        alt="Hero"
        className="absolute inset-0 h-full w-full object-cover brightness-75 contrast-110 saturate-75"
      />

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/70" />

      {/* Gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-black via-black/55 to-black/15" />

      <Container>
        <div className="max-w-5xl pl-4 md:pl-10 lg:pl-16">
          <HeroContent />
        </div>
      </Container>
    </section>
  );
}
