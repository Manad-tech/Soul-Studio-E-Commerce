import Container from "@/components/common/Container";

import { galleryItems } from "@/constants/gallery";

import GalleryCard from "./GalleryCard";

export default function Gallery() {
  return (
    <section className="py-36">
      <Container>
        <div className="mb-20 text-center">
          <p className="mb-4 text-xs uppercase tracking-[0.4em] text-[#C58A5C]">
            Portfolio
          </p>

          <h2 className="font-serif text-6xl text-white">
            Gallery Showcase
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-lg text-white/70">
            A curated selection of handcrafted artworks and exhibitions.
          </p>
        </div>

        <div className="columns-1 gap-6 md:columns-2 lg:columns-3">
          {galleryItems.map((item) => (
            <div key={item.id} className="mb-6 break-inside-avoid">
              <GalleryCard {...item} />
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}