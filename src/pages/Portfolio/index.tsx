import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Loader2, Sparkles, ArrowRight } from "lucide-react";
import Container from "@/components/common/Container";
import { usePortfolio } from "@/features/portfolio/hooks/usePortfolio";

const CATEGORIES = [
  "All", 
  "Paintings", 
  "Printmaking", 
  "Sculpture", 
  "Ceramics", 
  "Resin Art", 
  "Prints", 
  "Art Books", 
  "Others"
];

export default function PortfolioPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const { data: response, isLoading, error } = usePortfolio(activeCategory);

  return (
    <div className="min-h-screen bg-[#0D0D0D] py-20 pt-32 text-white">
      <Container>
        {/* Editorial Header */}
        <div className="mb-20 text-center space-y-4 max-w-2xl mx-auto">
          <p className="text-[#C58A5C] tracking-[0.3em] uppercase text-xs font-semibold flex items-center justify-center gap-1.5">
            <Sparkles size={14} /> Soul Studio – Un Arte Ventura
          </p>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-serif text-5xl md:text-7xl text-white tracking-wide leading-tight"
          >
            The Portfolio
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-white/50 text-base max-w-xl mx-auto"
          >
            Explore our curated archive of Dr. Sheetal Chaudhary's visual arts practice, combining traditional printmaking, luxury resin installations, and handmade ceramics.
          </motion.p>
        </div>

        {/* Categories Bar */}
        <div className="flex flex-wrap justify-center gap-3 mb-16 max-w-4xl mx-auto">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`rounded-full px-5 py-2.5 text-xs font-semibold uppercase tracking-wider transition-all duration-300 cursor-pointer ${
                activeCategory === cat 
                  ? "bg-[#C58A5C] text-black font-bold shadow-lg shadow-[#C58A5C]/15" 
                  : "border border-white/10 text-white/70 hover:border-[#C58A5C] hover:text-[#C58A5C] bg-white/5"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Loading / Error States */}
        {isLoading && (
          <div className="flex justify-center py-32">
            <Loader2 className="animate-spin text-[#C58A5C]" size={40} />
          </div>
        )}

        {error && (
          <div className="text-center py-32 text-red-400">
            Failed to load portfolio items. Please check connection.
          </div>
        )}

        {/* Masonry Layout Grid */}
        {!isLoading && !error && response?.data && (
          <motion.div 
            layout
            className="columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8 [column-fill:_balance]"
          >
            <AnimatePresence mode="popLayout">
              {response.data.map((item) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4 }}
                  className="break-inside-avoid mb-8 group relative overflow-hidden rounded-3xl border border-white/5 bg-[#111111] cursor-pointer"
                >
                  <Link to={`/portfolio/${item.slug}`}>
                    <div className="overflow-hidden relative">
                      {/* Category Badge overlay */}
                      <span className="absolute top-4 left-4 z-20 text-[9px] font-bold uppercase tracking-widest bg-black/60 backdrop-blur-md text-[#C58A5C] border border-[#C58A5C]/20 px-3 py-1.5 rounded-full">
                        {item.category}
                      </span>
                      
                      <img 
                        src={item.coverImage} 
                        alt={item.title}
                        className="h-auto w-full object-cover transition-transform duration-700 group-hover:scale-103 opacity-80 group-hover:opacity-100"
                      />
                    </div>
                    
                    {/* Hover text block details */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100 flex flex-col justify-end p-8 z-10">
                      <h3 className="font-serif text-3xl text-white translate-y-4 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                        {item.title}
                      </h3>
                      <div className="flex justify-between items-center mt-3 translate-y-4 opacity-0 transition-all duration-300 delay-75 group-hover:translate-y-0 group-hover:opacity-100">
                        <p className="text-[#C58A5C] text-xs font-semibold uppercase tracking-wider">
                          Client: {item.client} &bull; {item.year}
                        </p>
                        <div className="p-2 bg-[#C58A5C] text-black rounded-full shrink-0">
                          <ArrowRight size={12} />
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}

        {/* If no items found */}
        {!isLoading && !error && response?.data.length === 0 && (
          <div className="text-center py-24 text-white/40">
            No portfolio pieces found under this category.
          </div>
        )}
      </Container>
    </div>
  );
}