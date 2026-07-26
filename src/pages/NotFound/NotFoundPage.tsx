import { Link } from "react-router-dom";
import { ArrowRight, Compass } from "lucide-react";
import Container from "@/components/common/Container";

export default function NotFoundPage() {
  return (
    <div className="min-h-[80vh] bg-[#0D0D0D] flex items-center justify-center text-white py-20">
      <Container className="text-center space-y-8">
        <div className="inline-flex p-4 rounded-full bg-[#C58A5C]/10 text-[#C58A5C] mb-2">
          <Compass size={40} className="animate-[pulse_4s_ease-in-out_infinite]" />
        </div>
        
        <div className="space-y-4">
          <h1 className="font-serif text-8xl md:text-9xl text-white/20 font-bold select-none leading-none">404</h1>
          <h2 className="font-serif text-3xl md:text-5xl text-white">Curated Out of Space</h2>
          <p className="text-white/50 text-base max-w-md mx-auto">
            The page or artwork collection you are looking for does not exist, or has been archived to make room for new curations.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <Link 
            to="/shop" 
            className="w-full sm:w-auto h-12 px-8 rounded-full bg-[#C58A5C] text-black font-semibold hover:bg-[#b07850] transition flex items-center justify-center gap-2 cursor-pointer"
          >
            Browse Gallery <ArrowRight size={16} />
          </Link>
          <Link 
            to="/" 
            className="w-full sm:w-auto h-12 px-8 rounded-full border border-white/20 hover:bg-white/5 transition flex items-center justify-center gap-2 text-sm font-semibold cursor-pointer"
          >
            Go to Home
          </Link>
        </div>
      </Container>
    </div>
  );
}
