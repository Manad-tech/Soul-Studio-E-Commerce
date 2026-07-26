import Container from "@/components/common/Container";

import StoryContent from "./StoryContent";
import StoryImage from "./StoryImage";

export default function ArtistStory() {
  return (
    <section className="py-24 border-t border-b border-white/5 bg-[#0e0d0b]">
      <Container>
        <div className="grid items-center gap-12 lg:gap-16 lg:grid-cols-2">
          <StoryImage />

          <StoryContent />
        </div>
      </Container>
    </section>
  );
}