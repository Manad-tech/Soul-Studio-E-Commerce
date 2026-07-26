import Container from "@/components/common/Container";

import ArtworkContent from "./ArtworkContent";
import ArtworkImage from "./ArtworkImage";

export default function FeaturedArtwork() {
  return (
    <section className="py-36">
      <Container>
        <div className="grid items-center gap-16 lg:grid-cols-2">
          <ArtworkContent />

          <ArtworkImage />
        </div>
      </Container>
    </section>
  );
}