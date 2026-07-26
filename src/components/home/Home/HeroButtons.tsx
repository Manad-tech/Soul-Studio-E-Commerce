import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

import { Button } from "@/components/ui/button";

export default function HeroButtons() {
  return (
    <div className="flex flex-wrap gap-5">
      <Button
        asChild
        size="lg"
        className="h-12 rounded-full bg-[#C58A5C] px-8 text-black hover:bg-[#d39a6c]"
      >
        <Link to="/shop">
          Shop Collection
          <ArrowRight className="ml-2 h-4 w-4" />
        </Link>
      </Button>

      <Button
        asChild
        variant="outline"
        size="lg"
        className="h-12 rounded-full border-white/20 bg-white/5 px-8 text-white backdrop-blur hover:bg-white/10"
      >
        <Link to="/portfolio">
          View Portfolio
        </Link>
      </Button>
    </div>
  );
}