import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles, Heart, ShoppingBag, Eye, CheckCircle, Palette, Award } from "lucide-react";
import { toast } from "sonner";

import Container from "@/components/common/Container";
import ArtistStory from "@/components/home/ArtistStory/ArtistStory";
import { productStorage } from "@/utils/productStorage";
import { useCart } from "@/hooks/useCart";
import { useWishlist } from "@/hooks/useWishlist";
import type { Product } from "@/types/product";
import GiftCardBuilder from "@/components/shop/GiftCardBuilder";

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

export default function HomePage() {
  const { addToCart } = useCart();
  const { addToWishlist, isWishlisted } = useWishlist();
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);

  useEffect(() => {
    const loadFeatured = () => {
      // Find products that are featured, fallback to first 3 products
      const prods = productStorage.getProducts();
      const featured = prods.filter(p => p.featured);
      setFeaturedProducts(featured.length > 0 ? featured.slice(0, 3) : prods.slice(0, 3));
    };

    loadFeatured();
    window.addEventListener("products-updated", loadFeatured);
    return () => window.removeEventListener("products-updated", loadFeatured);
  }, []);

  const handleQuickAdd = (e: React.MouseEvent, product: Product) => {
    e.preventDefault();
    e.stopPropagation();
    if (!product.inStock) {
      toast.error("This masterpiece is currently out of stock");
      return;
    }
    addToCart(product, 1);
    toast.success(`${product.name} added to cart`);
  };

  const handleWishlistToggle = (e: React.MouseEvent, product: Product) => {
    e.preventDefault();
    e.stopPropagation();
    addToWishlist(product);
    if (isWishlisted(product.id)) {
      toast.info(`Removed ${product.name} from wishlist`);
    } else {
      toast.success(`Added ${product.name} to wishlist`);
    }
  };

  return (
    <div className="bg-[#0D0D0D] text-white overflow-hidden">
      
      {/* 1. Hero Section (Matching Image 2 & Reference Site) */}
      <section className="relative min-h-[92vh] flex items-center justify-center py-24 px-4">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1541701494587-cb58502866ab?auto=format&fit=crop&w=2000&q=80" 
            alt="Original Art Canvas" 
            className="w-full h-full object-cover opacity-35"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0D0D0D]/90 via-[#0D0D0D]/75 to-[#0D0D0D]" />
        </div>

        <Container className="relative z-10 space-y-12 text-center">
          <motion.div
            initial="hidden" animate="visible" variants={fadeInUp}
            className="max-w-3xl mx-auto space-y-6 text-center"
          >
            <p className="text-[#C58A5C] tracking-[0.3em] uppercase text-xs sm:text-sm font-semibold">
              ORIGINAL ART — HANDCRAFTED
            </p>
            <h1 className="font-serif text-5xl sm:text-7xl md:text-8xl leading-[1.05] text-white font-normal tracking-tight">
              Where Art <br />
              Meets Its Soul
            </h1>
            <p className="max-w-2xl mx-auto text-white/70 text-base sm:text-lg md:text-xl leading-relaxed">
              Paintings, sculptures, ceramics, prints, and resin art — each piece born from two decades of exploration across material and form.
            </p>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-4 pt-4">
              <Link 
                to="/shop" 
                className="h-13 px-8 rounded-none bg-[#C58A5C] text-black font-semibold uppercase tracking-wider text-sm hover:bg-[#b07850] transition flex items-center justify-center gap-3 shadow-lg"
              >
                SHOP NOW <ArrowRight size={16} />
              </Link>
              <Link 
                to="/portfolio" 
                className="h-13 px-8 rounded-none border border-white/20 bg-black/30 backdrop-blur hover:bg-white/10 transition flex items-center justify-center gap-2 text-sm uppercase tracking-wider font-semibold text-white"
              >
                VIEW PORTFOLIO
              </Link>
            </div>
          </motion.div>

          {/* Stats Bar */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-wrap items-center justify-center gap-8 sm:gap-12 pt-8 border-t border-white/10 max-w-3xl mx-auto"
          >
            <div className="flex items-center gap-3">
              <Palette className="text-[#C58A5C] h-6 w-6" />
              <div className="text-left">
                <div className="font-serif text-2xl sm:text-3xl text-white font-normal">340+</div>
                <div className="text-[10px] sm:text-xs uppercase tracking-[0.2em] text-white/50 font-medium">ARTWORKS CREATED</div>
              </div>
            </div>
            <div className="h-8 w-px bg-white/10 hidden sm:block" />
            <div className="flex items-center gap-3">
              <Award className="text-[#C58A5C] h-6 w-6" />
              <div className="text-left">
                <div className="font-serif text-2xl sm:text-3xl text-white font-normal">20+</div>
                <div className="text-[10px] sm:text-xs uppercase tracking-[0.2em] text-white/50 font-medium">YEARS OF ARTISTIC JOURNEY</div>
              </div>
            </div>
          </motion.div>
        </Container>
      </section>

      {/* 2. Featured Masterpieces Spotlight (Immediately after Hero) */}
      <section className="py-24 border-t border-white/5">
        <Container className="space-y-12">
          <div className="flex flex-col md:flex-row justify-between items-end gap-6">
            <div>
              <p className="text-[#C58A5C] tracking-[0.2em] uppercase text-xs font-semibold mb-2">Editor's Choice</p>
              <h2 className="font-serif text-4xl md:text-5xl text-white font-normal">Featured Masterpieces</h2>
            </div>
            <Link 
              to="/shop" 
              className="inline-flex items-center gap-2 text-[#C58A5C] hover:text-white transition uppercase tracking-widest text-xs font-semibold"
            >
              View Full Gallery <ArrowRight size={14} />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredProducts.map((product) => {
              const wishlisted = isWishlisted(product.id);
              return (
                <div 
                  key={product.id} 
                  className="group flex flex-col justify-between border border-white/5 rounded-2xl overflow-hidden bg-[#111111] hover:border-white/20 transition-all duration-300"
                >
                  <div className="relative aspect-square overflow-hidden bg-black flex items-center justify-center">
                    <img 
                      src={product.image} 
                      alt={product.name} 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />

                    {/* Quick actions overlay */}
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3">
                      <Link 
                        to={`/product/${product.slug}`} 
                        className="p-3 bg-white text-black rounded-full hover:bg-[#C58A5C] hover:text-black transition"
                        title="View Details"
                      >
                        <Eye size={18} />
                      </Link>
                      <button 
                        onClick={(e) => handleQuickAdd(e, product)}
                        className="p-3 bg-white text-black rounded-full hover:bg-[#C58A5C] hover:text-black transition"
                        title="Add to Cart"
                      >
                        <ShoppingBag size={18} />
                      </button>
                    </div>

                    <button 
                      onClick={(e) => handleWishlistToggle(e, product)}
                      className="absolute top-4 right-4 p-2 bg-[#111111]/80 backdrop-blur border border-white/10 rounded-full hover:border-[#C58A5C] transition-all"
                    >
                      <Heart size={16} className={wishlisted ? "fill-[#C58A5C] text-[#C58A5C]" : "text-white/60"} />
                    </button>
                  </div>

                  <div className="p-6 space-y-2 text-left">
                    <div className="flex justify-between text-[10px] text-[#C58A5C] uppercase tracking-wider font-semibold">
                      <span>{product.category}</span>
                      <span className="text-white/40">Medium: {product.medium || "Studio Craft"}</span>
                    </div>
                    <Link to={`/product/${product.slug}`}>
                      <h3 className="font-serif text-xl text-white hover:text-[#C58A5C] transition-colors leading-snug">
                        {product.name}
                      </h3>
                    </Link>
                    <div className="flex justify-between items-center pt-3 border-t border-white/5">
                      <p className="text-xs text-white/50">{product.artist}</p>
                      <p className="font-bold text-[#C58A5C]">₹ {product.price.toLocaleString("en-IN")}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </Container>
      </section>

      {/* 3. The Artist / Sheetal Chaudhary Section */}
      <ArtistStory />

      {/* 4. Brand Value Pitch */}
      <section className="py-20 border-t border-white/5 bg-[#111111]/30">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {[
              { title: "Museum Standards", desc: "Each piece is hand-signed and delivered with a Certificate of Authenticity." },
              { title: "Bespoke Curation", desc: "We customize dimensions and tones to align with your interior blueprint." },
              { title: "White-Glove Shipping", desc: "100% insured transit inside double-walled reinforced wood containers." }
            ].map((item, idx) => (
              <div key={idx} className="flex gap-4 items-start">
                <CheckCircle className="text-[#C58A5C] shrink-0 mt-1" size={20} />
                <div>
                  <h3 className="font-serif text-lg text-white mb-2">{item.title}</h3>
                  <p className="text-sm text-white/50 leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* 4. Curated Category Cards */}
      <section className="py-24 bg-[#111111]/20 border-t border-b border-white/5">
        <Container className="space-y-12">
          <div className="text-center">
            <p className="text-[#C58A5C] tracking-[0.2em] uppercase text-xs font-semibold mb-2">Collections</p>
            <h2 className="font-serif text-3xl md:text-5xl">Browse by Artform</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: "Paintings", slug: "Painting", img: "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=600&q=80" },
              { title: "Sculptures", slug: "Sculpture", img: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=600&q=80" },
              { title: "Ceramics", slug: "Ceramic", img: "https://images.unsplash.com/photo-1612196808214-b8e1d6145a8c?w=600&q=80" },
              { title: "Resin Art", slug: "Resin Art", img: "https://images.unsplash.com/photo-1541701494587-cb58502866ab?w=600&q=80" }
            ].map((cat, idx) => (
              <Link 
                key={idx} 
                to={`/shop?category=${cat.slug}`}
                className="group relative aspect-[3/4] rounded-2xl overflow-hidden border border-white/5 block"
              >
                <img 
                  src={cat.img} 
                  alt={cat.title} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-60 group-hover:opacity-85"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
                <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between">
                  <h4 className="font-serif text-2xl text-white">{cat.title}</h4>
                  <div className="p-2.5 bg-[#C58A5C] text-black rounded-full opacity-0 group-hover:opacity-100 transition duration-300">
                    <ArrowRight size={14} />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      {/* 5. Custom Commission Callout Banner */}
      <section className="py-32">
        <Container>
          <div className="relative rounded-3xl border border-white/10 overflow-hidden bg-black py-20 px-8 md:px-16 text-center md:text-left flex flex-col md:flex-row items-center justify-between gap-10">
            <div className="absolute inset-0 z-0">
              <img 
                src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1500&q=80" 
                alt="Commission Design" 
                className="w-full h-full object-cover opacity-10"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black via-black/90 to-transparent" />
            </div>

            <div className="relative z-10 max-w-xl space-y-4">
              <p className="text-[#C58A5C] tracking-[0.2em] uppercase text-xs font-semibold flex items-center gap-1.5 justify-center md:justify-start">
                <Sparkles size={14} /> Bespoke Creations
              </p>
              <h2 className="font-serif text-3xl md:text-5xl text-white">Looking for custom dimensions or specific palettes?</h2>
              <p className="text-white/50 text-sm leading-relaxed">
                Connect directly with our art coordinators to review blueprints, color swatches, and size modifications for a custom commissioned artwork.
              </p>
            </div>

            <div className="relative z-10 shrink-0">
              <Link 
                to="/commission" 
                className="inline-flex h-12 px-8 rounded-full bg-[#C58A5C] text-black font-semibold hover:bg-[#b07850] transition items-center justify-center gap-2 cursor-pointer shadow-lg"
              >
                Request Commission <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </Container>
      </section>

      {/* 6. e-Gift Cards Section */}
      <section className="py-32 border-t border-white/5 bg-[#111111]/10">
        <Container className="space-y-12">
          <div className="text-center">
            <p className="text-[#C58A5C] tracking-[0.2em] uppercase text-xs font-semibold mb-2">Corporate & Personal Gifting</p>
            <h2 className="font-serif text-4xl md:text-5xl">Give the Gift of Masterpiece Curation</h2>
            <p className="text-white/50 text-sm max-w-lg mx-auto mt-4">
              Let your recipients choose their preferred functional art, bespoke sculpture, or mixed-media painting with a customized Soul Studio e-Gift Card.
            </p>
          </div>
          <GiftCardBuilder />
        </Container>
      </section>

    </div>
  );
}
