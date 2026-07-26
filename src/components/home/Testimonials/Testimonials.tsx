import Container from "@/components/common/Container";

import { testimonials } from "@/constants/testimonials";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";

import "swiper/css";

import TestimonialCard from "./TestimonialCard";

export default function Testimonials() {
  return (
    <section className="py-36">
      <Container>
        <div className="mb-20 text-center">
          <p className="mb-4 text-xs uppercase tracking-[0.45em] text-[#C58A5C]">
            Testimonials
          </p>

          <h2 className="font-serif text-6xl text-white">
            Loved By Collectors
          </h2>

          <p className="mx-auto mt-8 max-w-2xl text-lg text-white/70">
            Experiences shared by collectors around the world.
          </p>
        </div>

        <Swiper
          modules={[Autoplay]}
          autoplay={{
            delay: 3500,
          }}
          loop
          spaceBetween={30}
          breakpoints={{
            0: {
              slidesPerView: 1,
            },
            900: {
              slidesPerView: 2,
            },
          }}
        >
          {testimonials.map((item) => (
            <SwiperSlide key={item.id}>
              <TestimonialCard {...item} />
            </SwiperSlide>
          ))}
        </Swiper>
      </Container>
    </section>
  );
}