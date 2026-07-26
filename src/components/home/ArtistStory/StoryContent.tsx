import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { artistStory } from "@/constants/story";

export default function StoryContent() {
  return (
    <div className="max-w-xl">
      <p className="mb-3 text-xs uppercase tracking-[0.25em] font-semibold text-[#C58A5C]">
        {artistStory.badge}
      </p>

      <h2 className="font-serif text-4xl md:text-5xl font-normal leading-tight text-white mb-6">
        {artistStory.title}
      </h2>

      <p className="mb-4 leading-relaxed text-[#bdb5ad] text-base">
        <strong className="text-white font-bold">Dr. Sheetal Chaudhary</strong> is an Indian visual artist, educator, researcher, and founder of <strong className="text-white font-bold">Soul Studio – Un Arte Ventura</strong> in Udaipur, Rajasthan. A <strong className="text-white font-bold">Gold Medalist in Drawing & Painting</strong> and <strong className="text-white font-bold">Ph.D. in Fine Arts</strong>, she has over <strong className="text-white font-bold">20 years of experience</strong> working across painting, printmaking, ceramics, sculpture, resin art, and mixed media.
      </p>

      <p className="mb-8 leading-relaxed text-[#bdb5ad] text-sm md:text-base italic">
        {artistStory.para2}
      </p>

      <Link
        to="/portfolio"
        className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] font-semibold text-[#C58A5C] hover:text-white transition-colors"
      >
        {artistStory.button} <ArrowRight className="h-4 w-4" />
      </Link>
    </div>
  );
}