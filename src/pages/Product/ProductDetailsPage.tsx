import { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { 
  Heart, ShoppingBag, ArrowLeft, Star, CheckCircle, 
  ChevronRight, Shield, Truck, Calendar, Sparkles
} from "lucide-react";
import { toast } from "sonner";

import Container from "@/components/common/Container";
import { useProduct } from "@/hooks/useProduct";
import { useCart } from "@/hooks/useCart";
import { useWishlist } from "@/hooks/useWishlist";

export default function ProductDetailsPage() {
  const navigate = useNavigate();
  const { product, relatedProducts } = useProduct();
  const { addToCart } = useCart();
  const { addToWishlist, isWishlisted } = useWishlist();

  const [activeImageIdx, setActiveImageIdx] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<"details" | "specs" | "reviews">("details");

  if (!product) {
    return <Navigate to="/shop" replace />;
  }

  // Fallback to single image array if images list doesn't exist
  const images = product.images && product.images.length > 0 ? product.images : [product.image];
  const wishlisted = isWishlisted(product.id);

  const handleAddToCart = () => {
    if (!product.inStock) {
      toast.error("This masterpiece is currently sold out.");
      return;
    }
    addToCart(product, quantity);
    toast.success(`${quantity} x ${product.name} added to cart`);
  };

  const handleBuyNow = () => {
    if (!product.inStock) {
      toast.error("This masterpiece is currently sold out.");
      return;
    }
    addToCart(product, quantity);
    navigate("/checkout");
  };

  const handleWishlistToggle = () => {
    addToWishlist(product);
    if (wishlisted) {
      toast.info(`Removed ${product.name} from wishlist`);
    } else {
      toast.success(`Added ${product.name} to wishlist`);
    }
  };

  return (
    <div className="min-h-screen bg-[#0D0D0D] py-12 text-white">
      <Container>
        {/* Navigation Breadcrumb */}
        <div className="flex items-center justify-between mb-8 border-b border-white/5 pb-4">
          <Link to="/shop" className="inline-flex items-center gap-2 text-white/50 hover:text-[#C58A5C] transition-colors text-sm font-medium">
            <ArrowLeft size={16} /> Back to Gallery
          </Link>
          <div className="flex items-center gap-2 text-xs text-white/30">
            <Link to="/" className="hover:text-white transition">Home</Link>
            <ChevronRight size={10} />
            <Link to="/shop" className="hover:text-white transition">Shop</Link>
            <ChevronRight size={10} />
            <span className="text-[#C58A5C] font-medium truncate max-w-[150px]">{product.name}</span>
          </div>
        </div>

        {/* Product Display Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-start">
          
          {/* Left Column: Image Block & Gallery strip */}
          <div className="space-y-4">
            <div className="relative aspect-square rounded-2xl overflow-hidden bg-black border border-white/5 flex items-center justify-center group">
              <img 
                src={images[activeImageIdx]} 
                alt={product.name} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              
              <button 
                onClick={handleWishlistToggle}
                className="absolute top-4 right-4 p-3 bg-black/80 backdrop-blur-md border border-white/10 rounded-full hover:border-[#C58A5C] transition-all z-10"
              >
                <Heart size={20} className={wishlisted ? "fill-[#C58A5C] text-[#C58A5C]" : "text-white/60"} />
              </button>

              {/* Status Tags */}
              <div className="absolute top-4 left-4 pointer-events-none">
                {product.bestseller && (
                  <span className="bg-[#C58A5C] text-black text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full shadow-lg">
                    Best Seller
                  </span>
                )}
                {!product.inStock && (
                  <span className="bg-red-500/80 text-white text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full shadow-lg">
                    Out of Stock
                  </span>
                )}
              </div>
            </div>

            {/* Thumbnail Strip */}
            {images.length > 1 && (
              <div className="flex gap-3 overflow-x-auto py-2">
                {images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIdx(idx)}
                    className={`relative w-20 h-20 rounded-xl overflow-hidden bg-black border shrink-0 transition ${
                      activeImageIdx === idx ? "border-[#C58A5C] scale-95" : "border-white/10 opacity-60 hover:opacity-100"
                    }`}
                  >
                    <img src={img} alt={`Thumbnail ${idx}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right Column: Information & checkout actions */}
          <div className="space-y-8">
            <div className="space-y-3">
              <span className="bg-[#C58A5C]/10 text-[#C58A5C] text-xs uppercase tracking-[0.2em] px-3 py-1 rounded-full font-bold">
                {product.category}
              </span>
              <h1 className="font-serif text-4xl md:text-5xl text-white">{product.name}</h1>
              
              <div className="flex items-center gap-4 text-sm text-white/60">
                <div className="flex items-center text-yellow-400">
                  <Star className="fill-yellow-400" size={16} />
                  <span className="ml-1 text-white font-semibold">{product.rating}</span>
                </div>
                <span>•</span>
                <span>{product.reviews} authentic reviews</span>
              </div>
            </div>

            <div className="border-t border-b border-white/15 py-5 flex items-center justify-between">
              <div>
                <p className="text-xs uppercase tracking-wider text-white/40 mb-1">Price</p>
                <div className="flex items-baseline gap-3">
                  <span className="text-3xl font-bold text-[#C58A5C]">₹ {product.price.toLocaleString("en-IN")}</span>
                  {product.originalPrice && (
                    <span className="text-white/40 line-through text-sm">₹ {product.originalPrice.toLocaleString("en-IN")}</span>
                  )}
                </div>
              </div>
              <div className="text-right">
                <p className="text-xs uppercase tracking-wider text-white/40 mb-1">Status</p>
                {product.inStock ? (
                  <span className="text-green-400 font-semibold flex items-center gap-1">
                    <CheckCircle size={14} /> Ready to Ship
                  </span>
                ) : (
                  <span className="text-red-400 font-semibold">Sold Out</span>
                )}
              </div>
            </div>

            {/* Product description short */}
            <p className="text-white/60 text-lg leading-relaxed">
              {product.description || `Handcrafted ${product.category.toLowerCase()} designed by Soul Studio. Highly curated art details for premium architectural environments.`}
            </p>

            {/* Technical Quick Metrics */}
            <div className="grid grid-cols-2 gap-4 text-sm bg-white/5 border border-white/10 rounded-2xl p-4">
              <div>
                <p className="text-white/40 uppercase tracking-widest text-[10px] mb-0.5">Artist</p>
                <p className="font-medium text-white">{product.artist || "Soul Studio"}</p>
              </div>
              <div>
                <p className="text-white/40 uppercase tracking-widest text-[10px] mb-0.5">Medium</p>
                <p className="font-medium text-white">{product.medium || "Studio Craft"}</p>
              </div>
              <div>
                <p className="text-white/40 uppercase tracking-widest text-[10px] mb-0.5">Dimensions</p>
                <p className="font-medium text-white">{product.dimensions || "Dimensions unavailable"}</p>
              </div>
              <div>
                <p className="text-white/40 uppercase tracking-widest text-[10px] mb-0.5">Year of release</p>
                <p className="font-medium text-white">{product.year || "2026"}</p>
              </div>
            </div>

            {/* Quantity Selector & Action Buttons */}
            {product.inStock && (
              <div className="space-y-4">
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-6">
                  <div className="flex items-center border border-white/20 rounded-full h-12 bg-black/40 overflow-hidden shrink-0">
                    <button 
                      onClick={() => setQuantity(prev => Math.max(1, prev - 1))}
                      className="px-4 py-2 hover:bg-white/5 transition-colors font-bold text-lg"
                    >
                      -
                    </button>
                    <span className="w-10 text-center font-semibold text-lg">{quantity}</span>
                    <button 
                      onClick={() => setQuantity(prev => Math.min(product.stock || 99, prev + 1))}
                      className="px-4 py-2 hover:bg-white/5 transition-colors font-bold text-lg"
                    >
                      +
                    </button>
                  </div>
                  <button 
                    onClick={handleAddToCart}
                    className="flex-1 h-12 rounded-full border border-white/20 hover:bg-white/5 text-white font-semibold transition flex items-center justify-center gap-2"
                  >
                    <ShoppingBag size={18} /> Add to Cart
                  </button>
                </div>
                <button 
                  onClick={handleBuyNow}
                  className="w-full h-12 rounded-full bg-[#C58A5C] text-black hover:bg-[#b07850] font-semibold transition"
                >
                  Buy Now
                </button>
              </div>
            )}

            {/* Quality Seals */}
            <div className="grid grid-cols-3 gap-2 border-t border-white/10 pt-6 text-[11px] text-white/50 text-center">
              <div className="flex flex-col items-center gap-1.5">
                <Shield size={18} className="text-[#C58A5C]" />
                <span>Certificate Included</span>
              </div>
              <div className="flex flex-col items-center gap-1.5">
                <Truck size={18} className="text-[#C58A5C]" />
                <span>Free Safe Shipping</span>
              </div>
              <div className="flex flex-col items-center gap-1.5">
                <Sparkles size={18} className="text-[#C58A5C]" />
                <span>Original Artpiece</span>
              </div>
            </div>

          </div>
        </div>

        {/* Tabbed details accordion block */}
        <div className="mt-24 border-t border-white/10 pt-10">
          <div className="flex border-b border-white/10 gap-8 mb-8 overflow-x-auto">
            {([
              { id: "details", label: "Details & Specifications" },
              { id: "specs", label: "Delivery & Packing" },
              { id: "reviews", label: `Reviews (${product.reviews})` }
            ] as const).map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`pb-4 text-sm font-semibold tracking-wider uppercase transition-colors relative shrink-0 ${
                  activeTab === tab.id ? "text-[#C58A5C]" : "text-white/40 hover:text-white"
                }`}
              >
                {tab.label}
                {activeTab === tab.id && (
                  <motion.div 
                    layoutId="detailsTabLine" 
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#C58A5C]"
                  />
                )}
              </button>
            ))}
          </div>

          <div className="min-h-[150px]">
            {activeTab === "details" && (
              <div className="space-y-4 text-white/70 max-w-2xl leading-relaxed">
                <p>
                  Every purchase includes a Certificate of Authenticity signed by the master artisan of Soul Studio. The materials are sourced locally, adhering strictly to global eco-sustainable harvesting guidelines.
                </p>
                <div className="space-y-2 mt-4">
                  {product.specifications?.map((spec, idx) => (
                    <div key={idx} className="flex justify-between max-w-md border-b border-white/5 py-2">
                      <span className="text-white/40">{spec.label}</span>
                      <span className="text-white font-medium">{spec.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "specs" && (
              <div className="space-y-4 text-white/70 max-w-xl leading-relaxed">
                <p className="flex items-start gap-2">
                  <Truck className="text-[#C58A5C] shrink-0 mt-1" size={16} />
                  <span>
                    <strong>Premium Packaging:</strong> The artwork is shipped inside custom-fitted, double-walled reinforced cases wrapped in waterproof protective membranes to assure absolute protection.
                  </span>
                </p>
                <p className="flex items-start gap-2">
                  <Calendar className="text-[#C58A5C] shrink-0 mt-1" size={16} />
                  <span>
                    <strong>Shipping Timelines:</strong> Ships within 3-5 business days. International deliveries average 8-12 business days depending on localized custom verifications.
                  </span>
                </p>
              </div>
            )}

            {activeTab === "reviews" && (
              <div className="space-y-6 max-w-3xl">
                {product.reviewList && product.reviewList.length > 0 ? (
                  product.reviewList.map((review) => (
                    <div key={review.id} className="border-b border-white/5 pb-6">
                      <div className="flex justify-between items-start gap-4 mb-2">
                        <div>
                          <p className="font-semibold text-white">{review.name}</p>
                          <p className="text-xs text-white/40">{review.date}</p>
                        </div>
                        <div className="flex text-yellow-400">
                          {Array.from({ length: 5 }).map((_, idx) => (
                            <Star 
                              key={idx} 
                              size={12} 
                              className={idx < review.rating ? "fill-yellow-400" : "text-white/20"} 
                            />
                          ))}
                        </div>
                      </div>
                      <p className="text-white/70 text-sm">{review.comment}</p>
                    </div>
                  ))
                ) : (
                  <p className="text-white/40">No reviews have been written for this artwork yet.</p>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Related Products Section */}
        {relatedProducts && relatedProducts.length > 0 && (
          <div className="mt-32 border-t border-white/10 pt-16">
            <h2 className="font-serif text-3xl mb-8">Complementary Masterpieces</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
              {relatedProducts.slice(0, 4).map((item) => (
                <Link 
                  key={item.id} 
                  to={`/product/${item.slug}`} 
                  className="group flex flex-col justify-between border border-white/5 rounded-2xl overflow-hidden bg-[#111111] hover:border-white/20 transition-all duration-300"
                >
                  <div className="aspect-square overflow-hidden bg-black">
                    <img 
                      src={item.image} 
                      alt={item.name} 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-4 space-y-1">
                    <p className="text-[9px] uppercase tracking-widest text-[#C58A5C] font-semibold">{item.category}</p>
                    <h3 className="font-serif text-base text-white hover:text-[#C58A5C] transition-colors truncate">{item.name}</h3>
                    <div className="flex justify-between items-center pt-2">
                      <span className="text-[10px] text-white/50">{item.artist}</span>
                      <span className="font-semibold text-sm text-[#C58A5C]">₹ {item.price.toLocaleString("en-IN")}</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

      </Container>
    </div>
  );
}