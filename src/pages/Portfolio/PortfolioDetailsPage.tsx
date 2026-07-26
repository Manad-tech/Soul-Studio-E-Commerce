import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Loader2, ArrowLeft, ChevronLeft, ChevronRight, X, Sparkles, Calendar, User, Tag } from "lucide-react";
import Container from "@/components/common/Container";
import { usePortfolioDetail } from "@/features/portfolio/hooks/usePortfolio";

export default function PortfolioDetailsPage() {
  const { slug } = useParams<{ slug: string }>();
  const { data: response, isLoading, error } = usePortfolioDetail(slug || "");
  const [activeImgIdx, setActiveImgIdx] = useState<number | null>(null);

  const project = response?.data;
  const galleryImages = project ? [project.coverImage, ...project.gallery.filter(img => img !== project.coverImage)] : [];

  // Keyboard navigation for Lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (activeImgIdx === null) return;
      if (e.key === "Escape") {
        setActiveImgIdx(null);
      } else if (e.key === "ArrowLeft") {
        setActiveImgIdx(prev => (prev !== null ? (prev - 1 + galleryImages.length) % galleryImages.length : null));
      } else if (e.key === "ArrowRight") {
        setActiveImgIdx(prev => (prev !== null ? (prev + 1) % galleryImages.length : null));
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeImgIdx, galleryImages.length]);

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#0D0D0D]">
        <Loader2 className="animate-spin text-[#C58A5C]" size={40} />
      </div>
    );
  }

  if (error || !project) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#0D0D0D] text-white">
        <div className="text-center space-y-4">
          <h2 className="text-2xl font-serif">Project not found</h2>
          <Link to="/portfolio" className="inline-flex items-center gap-2 text-[#C58A5C] hover:underline">
            <ArrowLeft size={16} /> Return to Portfolio
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0D0D0D] text-white pt-24 pb-20">
      <Container>
        
        {/* Breadcrumb Back Button */}
        <Link to="/portfolio" className="inline-flex items-center gap-2 text-white/50 hover:text-white mb-10 transition">
          <ArrowLeft size={16} /> Back to Portfolio
        </Link>
        
        {/* Editorial Layout Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-16 space-y-6"
        >
          <div className="flex items-center gap-2 text-[#C58A5C]">
            <Sparkles size={16} />
            <span className="text-xs uppercase tracking-[0.3em] font-semibold">Exhibition Archive</span>
          </div>

          <h1 className="font-serif text-5xl md:text-7xl text-white tracking-wide leading-tight max-w-4xl">
            {project.title}
          </h1>

          {/* Project Metadata Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-white/80 border-t border-white/10 pt-8 mt-10">
            <div className="space-y-1">
              <p className="text-[10px] uppercase tracking-widest text-white/40 font-semibold flex items-center gap-1.5">
                <User size={12} className="text-[#C58A5C]" /> Artist / Client
              </p>
              <p className="text-base text-white/95">{project.client}</p>
            </div>
            <div className="space-y-1">
              <p className="text-[10px] uppercase tracking-widest text-white/40 font-semibold flex items-center gap-1.5">
                <Tag size={12} className="text-[#C58A5C]" /> Art Category
              </p>
              <p className="text-base text-white/95">{project.category}</p>
            </div>
            <div className="space-y-1">
              <p className="text-[10px] uppercase tracking-widest text-white/40 font-semibold flex items-center gap-1.5">
                <Calendar size={12} className="text-[#C58A5C]" /> Creation Year
              </p>
              <p className="text-base text-white/95">{project.year}</p>
            </div>
            <div className="space-y-1">
              <p className="text-[10px] uppercase tracking-widest text-white/40 font-semibold flex items-center gap-1.5">
                <Sparkles size={12} className="text-[#C58A5C]" /> Origin Studio
              </p>
              <p className="text-base text-white/95">Udaipur, Rajasthan</p>
            </div>
          </div>
        </motion.div>

        {/* Hero Feature Cover Image */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          onClick={() => setActiveImgIdx(0)}
          className="aspect-video w-full overflow-hidden rounded-3xl mb-16 cursor-zoom-in relative group border border-white/5 shadow-2xl"
        >
          <img src={project.coverImage} alt={project.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-103" />
          <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100 duration-300">
            <span className="bg-black/60 backdrop-blur text-white text-xs font-semibold px-4 py-2 rounded-full border border-white/10">
              Click to view fullscreen
            </span>
          </div>
        </motion.div>

        {/* Vision Narrative Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 mb-20 bg-[#111111]/40 border border-white/5 p-8 md:p-12 rounded-3xl">
          <div>
            <h2 className="font-serif text-2xl text-[#C58A5C] mb-6 flex items-center gap-2">
              The Visionary Journey
            </h2>
            <p className="text-white/70 leading-relaxed text-sm">{project.projectStory}</p>
          </div>
          <div>
            <h2 className="font-serif text-2xl text-[#C58A5C] mb-6 flex items-center gap-2">
              Curator & Patron Experience
            </h2>
            <blockquote className="border-l-2 border-[#C58A5C] pl-6 text-white/80 italic leading-relaxed text-sm">
              "{project.clientStory}"
            </blockquote>
          </div>
        </div>

        {/* Gallery Grid */}
        <div className="space-y-8">
          <h3 className="font-serif text-3xl text-white">Project Detail Gallery</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {galleryImages.map((img, idx) => (
              <div 
                key={idx} 
                onClick={() => setActiveImgIdx(idx)}
                className="h-[320px] overflow-hidden rounded-2xl cursor-zoom-in relative group border border-white/5"
              >
                <img 
                  src={img} 
                  alt={`Detail ${idx + 1}`} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                />
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/10 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100 duration-300">
                  <span className="bg-black/60 backdrop-blur text-white text-[10px] font-semibold px-3 py-1.5 rounded-full border border-white/10">
                    Zoom Image
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </Container>

      {/* Lightbox Slideshow Modal */}
      <AnimatePresence>
        {activeImgIdx !== null && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/95 z-[9999] backdrop-blur-md flex items-center justify-center p-4 md:p-12 select-none"
          >
            {/* Header controls overlay */}
            <div className="absolute top-6 left-6 right-6 flex justify-between items-center text-white/60 z-55">
              <span className="text-xs font-semibold uppercase tracking-widest bg-white/5 border border-white/10 px-3 py-1.5 rounded-full">
                {project.title} &bull; Image {activeImgIdx + 1} of {galleryImages.length}
              </span>
              <button 
                onClick={() => setActiveImgIdx(null)}
                className="p-2.5 bg-white/5 hover:bg-white/10 border border-white/10 text-white rounded-full hover:scale-105 transition cursor-pointer"
                title="Close Slideshow (Esc)"
              >
                <X size={20} />
              </button>
            </div>

            {/* Left Button */}
            <button 
              onClick={(e) => {
                e.stopPropagation();
                setActiveImgIdx(prev => (prev !== null ? (prev - 1 + galleryImages.length) % galleryImages.length : null));
              }}
              className="absolute left-4 md:left-8 p-3 bg-white/5 hover:bg-white/10 border border-white/10 text-white rounded-full transition hover:scale-105 cursor-pointer z-50"
            >
              <ChevronLeft size={24} />
            </button>

            {/* Main Lightbox Image View */}
            <motion.div 
              key={activeImgIdx}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
              className="max-w-5xl max-h-[80vh] flex items-center justify-center overflow-hidden"
              onClick={() => setActiveImgIdx(null)} // Click image to close
            >
              <img 
                src={galleryImages[activeImgIdx]} 
                alt="Slideshow Item" 
                className="max-w-full max-h-[80vh] object-contain rounded-xl border border-white/5 shadow-2xl"
                onClick={(e) => e.stopPropagation()} // Prevent click propagation on image
              />
            </motion.div>

            {/* Right Button */}
            <button 
              onClick={(e) => {
                e.stopPropagation();
                setActiveImgIdx(prev => (prev !== null ? (prev + 1) % galleryImages.length : null));
              }}
              className="absolute right-4 md:right-8 p-3 bg-white/5 hover:bg-white/10 border border-white/10 text-white rounded-full transition hover:scale-105 cursor-pointer z-50"
            >
              <ChevronRight size={24} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
