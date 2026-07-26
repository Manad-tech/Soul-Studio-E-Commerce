import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

import { Button } from "@/components/ui/button";

import { featuredArtwork } from "@/constants/featuredArtwork";

export default function ArtworkContent() {
  return (
    <div className="max-w-xl">
      <p className="mb-6 text-xs uppercase tracking-[0.4em] text-[#C58A5C]">
        {featuredArtwork.badge}
      </p>

      <h2 className="font-serif text-6xl leading-tight text-white">
        {featuredArtwork.title}
      </h2>

      <p className="mt-8 text-lg leading-9 text-white/70">
        {featuredArtwork.description}
      </p>

      <Button
        asChild
        className="mt-10 rounded-full bg-[#C58A5C] px-8 text-black hover:bg-[#D69A69]"
      >
        <Link to="/shop">
          {featuredArtwork.button}
          <ArrowRight className="ml-2 h-4 w-4" />
        </Link>
      </Button>
    </div>
  );
}