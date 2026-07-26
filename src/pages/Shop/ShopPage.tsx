import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { 
  SlidersHorizontal, Search, Heart, ShoppingBag, X, Star, 
  RotateCcw, Eye, ArrowUpDown, ChevronDown
} from "lucide-react";
import { toast } from "sonner";

import Container from "@/components/common/Container";
import Pagination from "@/components/shop/Pagination";
import { useShop } from "@/hooks/useShop";
import { useCart } from "@/hooks/useCart";
import { useWishlist } from "@/hooks/useWishlist";
import type { Product } from "@/types/product";

export default function ShopPage() {
  const {
    search,
    setSearch,
    category,
    setCategory,
    sort,
    setSort,
    maxPrice,
    setMaxPrice,
    rating,
    setRating,
    availability,
    setAvailability,
    products,
    allFilteredProducts,
    currentPage,
    totalPages,
    setCurrentPage
  } = useShop();

  const { addToCart, items } = useCart();
  const { addToWishlist, isWishlisted } = useWishlist();

  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [sortDropdownOpen, setSortDropdownOpen] = useState(false);

  const categoryTabs = [
    { key: "all", label: "All" },
    { key: "Workshops", label: "Workshops" },
    { key: "Art Kits / Art Materials", label: "Art Kits / Materials" },
    { key: "Monthly Snail Mail Club", label: "Snail Mail Club" },
    { key: "Portfolio", label: "Portfolio" },
    { key: "Painting", label: "Paintings" },
    { key: "Printmaking", label: "Printmaking" },
    { key: "Sculpture", label: "Sculptures" },
    { key: "Ceramic", label: "Ceramics" },
    { key: "Resin Art", label: "Resin Art" },
    { key: "Prints", label: "Prints" },
    { key: "Art Books", label: "Art Books" },
    { key: "Others", label: "Others" }
  ];

  const othersSubcategories = [
    "Post cards",
    "Stickers",
    "Book marks",
    "Calendars",
    "Hand painted products / Home decor / wearable art",
    "Rakhis",
    "Candles",
    "Festive Combos"
  ];

  const cartCount = items.reduce((acc, item) => acc + item.quantity, 0);

  const handleQuickAdd = (e: React.MouseEvent, product: Product) => {
    e.preventDefault();
    e.stopPropagation();
    if (!product.inStock) {
      toast.error("This artwork is sold out");
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

  const resetFilters = () => {
    setSearch("");
    setCategory("all");
    setMaxPrice(50000);
    setRating(0);
    setAvailability("all");
    setSort("featured");
    toast.info("All filters reset");
  };

  const currentSortLabel = () => {
    switch (sort) {
      case "price-low": return "Price: Low to High";
      case "price-high": return "Price: High to Low";
      case "rating": return "Highest Rating";
      default: return "Featured";
    }
  };

  const FilterDrawerContent = () => (
    <div className="space-y-8 text-left">
      {/* Search */}
      <div>
        <h4 className="text-xs uppercase tracking-widest text-white/40 mb-3 font-semibold">Search Catalog</h4>
        <div className="relative">
          <Search className="absolute left-3 top-3.5 h-4 w-4 text-white/40" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by title, medium, tag..."
            className="w-full h-11 bg-black/40 border border-white/10 rounded-lg pl-10 pr-4 text-sm text-white outline-none focus:border-[#C58A5C] transition-colors"
          />
        </div>
      </div>

      {/* Categories in Drawer */}
      <div>
        <h4 className="text-xs uppercase tracking-widest text-white/40 mb-3 font-semibold">Categories</h4>
        <div className="flex flex-col gap-1 max-h-60 overflow-y-auto pr-1">
          {categoryTabs.map((cat) => (
            <button
              key={cat.key}
              onClick={() => setCategory(cat.key)}
              className={`w-full text-left py-1.5 px-3 rounded text-xs transition ${
                category === cat.key ? "bg-[#C58A5C] text-black font-semibold" : "text-white/70 hover:bg-white/5"
              }`}
            >
              {cat.label}
            </button>
          ))}
          <div className="pt-2 border-t border-white/10 mt-1">
            <p className="text-[10px] uppercase tracking-wider text-[#C58A5C] mb-1 font-semibold">Others Subcategories:</p>
            {othersSubcategories.map((sub) => (
              <button
                key={sub}
                onClick={() => setCategory(sub)}
                className={`w-full text-left py-1 px-3 rounded text-[11px] transition ${
                  category === sub ? "bg-[#C58A5C] text-black font-semibold" : "text-white/50 hover:bg-white/5"
                }`}
              >
                • {sub}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Price Filter */}
      <div>
        <div className="flex justify-between text-xs uppercase tracking-widest text-white/40 mb-3 font-semibold">
          <span>Max Price</span>
          <span className="text-[#C58A5C]">₹ {maxPrice.toLocaleString("en-IN")}</span>
        </div>
        <input
          type="range"
          min="200"
          max="50000"
          step="300"
          value={maxPrice}
          onChange={(e) => setMaxPrice(Number(e.target.value))}
          className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-[#C58A5C]"
        />
        <div className="flex justify-between text-[10px] text-white/30 mt-2">
          <span>₹ 200</span>
          <span>₹ 50,000</span>
        </div>
      </div>

      {/* Stock Availability */}
      <div>
        <h4 className="text-xs uppercase tracking-widest text-white/40 mb-3 font-semibold">Availability</h4>
        <div className="flex gap-2">
          {([
            { id: "all", label: "All Works" },
            { id: "stock", label: "Available" },
            { id: "out", label: "Sold Out" }
          ] as const).map((opt) => (
            <button
              key={opt.id}
              onClick={() => setAvailability(opt.id)}
              className={`flex-1 py-2 text-center rounded-lg text-xs font-semibold border transition ${
                availability === opt.id
                  ? "bg-[#C58A5C] text-black border-[#C58A5C]"
                  : "bg-transparent text-white/60 border-white/10 hover:border-white/20 hover:text-white"
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      {/* Ratings */}
      <div>
        <h4 className="text-xs uppercase tracking-widest text-white/40 mb-3 font-semibold">Minimum Rating</h4>
        <div className="flex items-center gap-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              onClick={() => setRating(star === rating ? 0 : star)}
              className="p-1 text-white/20 hover:text-[#C58A5C] transition-colors"
            >
              <Star 
                className={`h-6 w-6 ${
                  star <= rating 
                    ? "fill-[#C58A5C] text-[#C58A5C]" 
                    : "text-white/20 hover:text-[#C58A5C]/60"
                }`} 
              />
            </button>
          ))}
        </div>
      </div>

      {/* Reset */}
      <button
        onClick={resetFilters}
        className="w-full h-11 border border-red-500/30 hover:border-red-500/60 text-red-400 hover:text-red-300 rounded-full flex items-center justify-center gap-2 text-sm font-semibold transition"
      >
        <RotateCcw size={16} /> Reset All Filters
      </button>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#0D0D0D] text-white">
      {/* 1. Header Banner */}
      <section className="pt-24 sm:pt-28 pb-8 sm:pb-10 border-b border-white/10 bg-gradient-to-b from-[#111111] to-[#0D0D0D]">
        <Container>
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-[10px] sm:text-xs tracking-[0.25em] uppercase text-[#C58A5C] mb-2 font-semibold">AVAILABLE WORKS</p>
              <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl font-normal text-white">Shop</h1>
            </div>
            {cartCount > 0 && (
              <Link 
                to="/cart"
                className="flex items-center gap-2 px-4 sm:px-5 py-2 sm:py-2.5 bg-[#C58A5C] text-black text-xs sm:text-sm font-semibold rounded-none hover:bg-[#b07850] transition"
              >
                <ShoppingBag size={16} />
                <span>Cart ({cartCount})</span>
              </Link>
            )}
          </div>
        </Container>
      </section>

      {/* 2. Category Tabs & Toolbar Bar */}
      <section className="py-3 sm:py-4 border-b border-white/10 sticky top-16 sm:top-20 z-40 bg-[#0D0D0D]/95 backdrop-blur-md">
        <Container>
          <div className="flex flex-col gap-3">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 md:gap-4">
              {/* Horizontal Category Tabs */}
              <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-none w-full md:w-auto touch-pan-x">
                {categoryTabs.map((tab) => {
                  const isActive = category === tab.key || (tab.key === "Others" && othersSubcategories.includes(category));
                  return (
                    <button
                      key={tab.key}
                      onClick={() => setCategory(tab.key)}
                      className={`px-3.5 sm:px-4 py-1.5 sm:py-2 text-[11px] sm:text-xs uppercase tracking-wider font-medium whitespace-nowrap transition-all border shrink-0 ${
                        isActive
                          ? "bg-[#C58A5C] text-black border-[#C58A5C] font-semibold"
                          : "bg-transparent text-white/60 border-white/10 hover:border-white/30 hover:text-white"
                      }`}
                    >
                      {tab.label}
                    </button>
                  );
                })}
              </div>

              {/* Right Tools */}
              <div className="flex items-center gap-3 shrink-0 self-end md:self-auto">
                <button
                  onClick={() => setMobileFiltersOpen(true)}
                  className="flex items-center gap-2 bg-white/5 border border-white/10 px-4 py-2 text-xs uppercase tracking-wider text-white font-medium hover:bg-white/10 transition"
                >
                  <SlidersHorizontal size={14} /> Filters
                </button>

                <div className="relative">
                  <button
                    onClick={() => setSortDropdownOpen(!sortDropdownOpen)}
                    className="flex items-center gap-2 bg-white/5 border border-white/10 px-4 py-2 text-xs uppercase tracking-wider text-white font-medium hover:bg-white/10 transition cursor-pointer"
                  >
                    <ArrowUpDown size={14} /> Sort: <span className="text-[#C58A5C]">{currentSortLabel()}</span>
                    <ChevronDown size={14} className={`transition-transform duration-300 ${sortDropdownOpen ? "rotate-180" : ""}`} />
                  </button>

                  <AnimatePresence>
                    {sortDropdownOpen && (
                      <>
                        <div className="fixed inset-0 z-40" onClick={() => setSortDropdownOpen(false)} />
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 10 }}
                          className="absolute right-0 top-11 z-50 w-52 border border-white/10 bg-[#111111] p-2 shadow-2xl space-y-1"
                        >
                          {([
                            { id: "featured", label: "Featured" },
                            { id: "price-low", label: "Price: Low to High" },
                            { id: "price-high", label: "Price: High to Low" },
                            { id: "rating", label: "Highest Rating" }
                          ] as const).map((opt) => (
                            <button
                              key={opt.id}
                              onClick={() => {
                                setSort(opt.id);
                                setSortDropdownOpen(false);
                              }}
                              className={`w-full text-left px-4 py-2 text-xs uppercase tracking-wider transition-colors ${
                                sort === opt.id
                                  ? "bg-[#C58A5C] text-black font-semibold"
                                  : "text-white/60 hover:bg-white/5 hover:text-white"
                              }`}
                            >
                              {opt.label}
                            </button>
                          ))}
                        </motion.div>
                      </>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </div>

            {/* Subcategories Bar for "Others" */}
            {(category === "Others" || othersSubcategories.includes(category)) && (
              <motion.div 
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-2 overflow-x-auto pt-2 border-t border-white/10 scrollbar-none"
              >
                <span className="text-[10px] uppercase tracking-widest text-[#C58A5C] font-semibold shrink-0">Subcategories:</span>
                <button
                  onClick={() => setCategory("Others")}
                  className={`px-3 py-1 text-[11px] rounded-full whitespace-nowrap transition ${
                    category === "Others" ? "bg-[#C58A5C] text-black font-semibold" : "bg-white/5 text-white/70 hover:bg-white/10"
                  }`}
                >
                  All Others
                </button>
                {othersSubcategories.map((sub) => (
                  <button
                    key={sub}
                    onClick={() => setCategory(sub)}
                    className={`px-3 py-1 text-[11px] rounded-full whitespace-nowrap transition ${
                      category === sub ? "bg-[#C58A5C] text-black font-semibold" : "bg-white/5 text-white/70 hover:bg-white/10"
                    }`}
                  >
                    {sub}
                  </button>
                ))}
              </motion.div>
            )}
          </div>
        </Container>
      </section>

      {/* 3. Products Display (Reference Site Layout: Grouped by category when "all" selected) */}
      <section className="py-12">
        <Container>
          {products.length === 0 ? (
            <div className="text-center py-24 border border-dashed border-white/10 rounded-2xl bg-white/5 max-w-lg mx-auto">
              <SlidersHorizontal className="mx-auto text-white/30 mb-4" size={40} />
              <h3 className="text-xl font-serif mb-2">No matching works</h3>
              <p className="text-white/50 text-sm max-w-sm mx-auto mb-6">
                Try adjusting your category selection, max price limit, or search query.
              </p>
              <button
                onClick={resetFilters}
                className="h-11 rounded-none bg-[#C58A5C] px-6 text-black font-semibold uppercase tracking-wider text-xs hover:bg-[#b07850] transition"
              >
                Clear All Filters
              </button>
            </div>
          ) : category === "all" ? (
            /* Render Grouped Category Sections when "All" tab is selected */
            <div className="space-y-16">
              {categoryTabs.slice(1).map((tab) => {
                const target = tab.key.toLowerCase();
                const catProducts = allFilteredProducts.filter((p) => {
                  const cat = p.category.toLowerCase();
                  const subcat = (p.subcategory || "").toLowerCase();
                  if (target === "workshops") return cat.includes("workshop");
                  if (target.includes("snail mail")) return cat.includes("snail mail");
                  if (target === "portfolio") return cat.includes("portfolio");
                  if (target.includes("art kits") || target.includes("art materials")) return cat.includes("art kit") || cat.includes("art material");
                  if (target === "painting") return cat.includes("painting");
                  if (target === "sculpture") return cat.includes("sculpture");
                  if (target === "ceramic") return cat.includes("ceramic");
                  if (target === "resin art") return cat.includes("resin");
                  if (target === "prints") return cat === "prints" || (cat.includes("print") && !cat.includes("printmaking"));
                  if (target === "printmaking") return cat.includes("printmaking");
                  if (target === "art books") return cat.includes("book");
                  if (target === "others") return cat === "others" || subcat.length > 0;
                  return cat === target || subcat === target || cat.includes(target);
                });
                if (catProducts.length === 0) return null;

                return (
                  <section key={tab.key} className="space-y-6">
                    <div className="flex items-center gap-4">
                      <h2 className="text-xs font-semibold tracking-[0.2em] uppercase text-[#C58A5C]">
                        {tab.label}
                      </h2>
                      <div className="flex-1 h-px bg-white/10" />
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6">
                      {catProducts.map((product) => {
                        const wishlisted = isWishlisted(product.id);
                        return (
                          <div 
                            key={product.id}
                            className="group flex flex-col justify-between border border-white/5 rounded-none overflow-hidden bg-[#111111] hover:border-white/20 transition-all duration-300"
                          >
                            <div className="relative aspect-[3/4] overflow-hidden bg-black flex items-center justify-center">
                              <img
                                src={product.image}
                                alt={product.name}
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                              />

                              {/* Hover Quick Action Buttons */}
                              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3">
                                <Link 
                                  to={`/product/${product.slug}`} 
                                  className="p-3 bg-white text-black rounded-full hover:bg-[#C58A5C] hover:text-black transition shadow-md"
                                  title="Quick View / Details"
                                >
                                  <Eye size={18} />
                                </Link>
                                <button 
                                  onClick={(e) => handleQuickAdd(e, product)}
                                  disabled={!product.inStock}
                                  className="p-3 bg-white text-black rounded-full hover:bg-[#C58A5C] hover:text-black transition shadow-md disabled:bg-gray-800 disabled:text-gray-500"
                                  title="Add to Cart"
                                >
                                  <ShoppingBag size={18} />
                                </button>
                              </div>

                              {/* Wishlist Button */}
                              <button
                                onClick={(e) => handleWishlistToggle(e, product)}
                                className="absolute top-3 right-3 p-2 bg-[#111111]/80 backdrop-blur border border-white/10 rounded-full hover:border-[#C58A5C] transition-all z-10"
                              >
                                <Heart size={14} className={wishlisted ? "fill-[#C58A5C] text-[#C58A5C]" : "text-white/60"} />
                              </button>
                            </div>

                            <div className="p-4 space-y-1 text-left">
                              <div className="text-[10px] text-[#C58A5C] uppercase tracking-widest font-semibold">
                                {product.category}
                              </div>
                              <Link to={`/product/${product.slug}`} className="block">
                                <h3 className="font-serif text-base text-white hover:text-[#C58A5C] transition-colors leading-snug line-clamp-1">
                                  {product.name}
                                </h3>
                              </Link>
                              <div className="flex justify-between items-center pt-2 border-t border-white/5">
                                <span className="text-[11px] text-white/50">{product.medium || "Studio Craft"}</span>
                                <span className="font-semibold text-sm text-[#C58A5C]">₹ {product.price.toLocaleString("en-IN")}</span>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </section>
                );
              })}
            </div>
          ) : (
            /* Render Single Category Grid when specific Category tab selected */
            <div className="space-y-8">
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6">
                {products.map((product) => {
                  const wishlisted = isWishlisted(product.id);
                  return (
                    <div 
                      key={product.id}
                      className="group flex flex-col justify-between border border-white/5 rounded-none overflow-hidden bg-[#111111] hover:border-white/20 transition-all duration-300"
                    >
                      <div className="relative aspect-[3/4] overflow-hidden bg-black flex items-center justify-center">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />

                        {/* Hover Quick Action Buttons */}
                        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3">
                          <Link 
                            to={`/product/${product.slug}`} 
                            className="p-3 bg-white text-black rounded-full hover:bg-[#C58A5C] hover:text-black transition shadow-md"
                            title="Quick View / Details"
                          >
                            <Eye size={18} />
                          </Link>
                          <button 
                            onClick={(e) => handleQuickAdd(e, product)}
                            disabled={!product.inStock}
                            className="p-3 bg-white text-black rounded-full hover:bg-[#C58A5C] hover:text-black transition shadow-md disabled:bg-gray-800 disabled:text-gray-500"
                            title="Add to Cart"
                          >
                            <ShoppingBag size={18} />
                          </button>
                        </div>

                        {/* Wishlist Button */}
                        <button
                          onClick={(e) => handleWishlistToggle(e, product)}
                          className="absolute top-3 right-3 p-2 bg-[#111111]/80 backdrop-blur border border-white/10 rounded-full hover:border-[#C58A5C] transition-all z-10"
                        >
                          <Heart size={14} className={wishlisted ? "fill-[#C58A5C] text-[#C58A5C]" : "text-white/60"} />
                        </button>
                      </div>

                      <div className="p-4 space-y-1 text-left">
                        <div className="text-[10px] text-[#C58A5C] uppercase tracking-widest font-semibold">
                          {product.category}
                        </div>
                        <Link to={`/product/${product.slug}`} className="block">
                          <h3 className="font-serif text-base text-white hover:text-[#C58A5C] transition-colors leading-snug line-clamp-1">
                            {product.name}
                          </h3>
                        </Link>
                        <div className="flex justify-between items-center pt-2 border-t border-white/5">
                          <span className="text-[11px] text-white/50">{product.medium || "Studio Craft"}</span>
                          <span className="font-semibold text-sm text-[#C58A5C]">₹ {product.price.toLocaleString("en-IN")}</span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              <Pagination 
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
              />
            </div>
          )}
        </Container>
      </section>

      {/* 4. Filters Overlay Drawer */}
      <AnimatePresence>
        {mobileFiltersOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileFiltersOpen(false)}
              className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm"
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween", duration: 0.3 }}
              className="fixed top-0 right-0 z-50 h-full w-full max-w-sm bg-[#111111] p-6 overflow-y-auto border-l border-white/10 space-y-6"
            >
              <div className="flex justify-between items-center pb-4 border-b border-white/10">
                <h3 className="font-serif text-xl text-white">Filter Works</h3>
                <button
                  onClick={() => setMobileFiltersOpen(false)}
                  className="text-white/50 hover:text-white"
                >
                  <X size={24} />
                </button>
              </div>

              <FilterDrawerContent />
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
