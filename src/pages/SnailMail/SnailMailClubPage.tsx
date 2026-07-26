import { useState } from "react";
import { useCart } from "@/hooks/useCart";
import { toast } from "sonner";
import { Sparkles, Mail, Plane, ShieldCheck, ShoppingBag, Loader2, Check } from "lucide-react";
import Container from "@/components/common/Container";
import type { Product } from "@/types/product";

export default function SnailMailClubPage() {
  const { addToCart } = useCart();
  const [tier, setTier] = useState<"National" | "International">("National");
  const [quantity, setQuantity] = useState<number>(1);
  const [isAdding, setIsAdding] = useState<boolean>(false);
  const [isAdded, setIsAdded] = useState<boolean>(false);

  const price = tier === "National" ? 999 : 2499;

  const handleAddToCart = async () => {
    setIsAdding(true);
    
    // Premium feedback simulation delay
    await new Promise((resolve) => setTimeout(resolve, 850));
    
    const productId = `snailmail_${tier.toLowerCase()}_${Date.now()}`;
    const clubProduct: Product = {
      id: productId,
      slug: `snail-mail-club-${tier.toLowerCase()}-${Date.now()}`,
      name: `Monthly Snail Mail Club - ${tier} Tier`,
      category: "Monthly Snail Mail Club",
      image: "https://images.unsplash.com/photo-1596464716127-f2a82984de30?w=800&q=80",
      images: ["https://images.unsplash.com/photo-1596464716127-f2a82984de30?w=800&q=80"],
      shortDescription: `Curated monthly delivery of handcrafted stationery and prints.`,
      description: `Monthly Snail Mail Club Subscription (${tier} Tier). Hand-signed postcards, bookmarks, and prints curated by Dr. Sheetal Chaudhary. Delivery: ${
        tier === "National" ? "India Speed Post (Free)" : "International Air Mail (Free)"
      }`,
      artist: "Dr. Sheetal Chaudhary",
      medium: "Monthly Handmade Prints & Ephemera",
      dimensions: "Postcard Sizes & Custom Layouts",
      year: new Date().getFullYear(),
      price: price,
      originalPrice: undefined,
      featured: true,
      bestseller: true,
      inStock: true,
      stock: 9999,
      rating: 5.0,
      reviews: 14,
      specifications: [
        { label: "Frequency", value: "Monthly" },
        { label: "Dispatch", value: "First week of every month" },
        { label: "Carrier", value: tier === "National" ? "India Post" : "International Air Mail" }
      ],
      features: ["Original Art Postcards", "Handmade Stickers", "Collectible Bookmarks", "Artist Curated Notes"],
      reviewList: []
    };

    addToCart(clubProduct, quantity);
    
    setIsAdding(false);
    setIsAdded(true);
    
    toast.success("Subscription Added", {
      description: `${quantity} × Monthly Snail Mail Club (${tier} Tier) added to your cart.`
    });

    // Reset button checkmark state after short delay
    setTimeout(() => {
      setIsAdded(false);
    }, 1500);
  };

  const inclusions = [
    { title: "Hand-Painted Postcards", desc: "Original mini art pieces on heavy cotton rag paper." },
    { title: "Artisan Collectibles", desc: "Unique bookmarks, calendars, and custom journal ephemera." },
    { title: "Handmade Stickers", desc: "Sticker releases featuring watercolor and linocut designs." },
    { title: "Personal Artist Note", desc: "A monthly letter from Dr. Sheetal Chaudhary sharing the concept behind the curation." }
  ];

  return (
    <div className="min-h-screen bg-[#0D0D0D] text-white py-20 pt-32">
      <Container className="space-y-16">
        
        {/* Editorial Header */}
        <div className="text-center space-y-4 max-w-2xl mx-auto">
          <p className="text-[#C58A5C] tracking-[0.3em] uppercase text-xs font-semibold flex items-center justify-center gap-1.5">
            <Sparkles size={14} /> Collector's Edition
          </p>
          <h1 className="font-serif text-5xl md:text-7xl text-white">Monthly Snail Mail Club</h1>
          <p className="text-white/50 text-base leading-relaxed">
            Welcome to the Monthly Snail Mail Club – a subscription for lovers of raw textures, written letters, and original handcrafted art. Recenter your relationship with art directly through your physical mailbox.
          </p>
        </div>

        {/* Premium Split Card Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch max-w-5xl mx-auto">
          
          {/* Card Left: Premium Artwork Visuals (Col 6) */}
          <div className="lg:col-span-6 rounded-3xl border border-white/10 bg-[#111111] overflow-hidden flex flex-col justify-between shadow-2xl relative min-h-[400px]">
            <div className="absolute inset-0 z-0">
              <img 
                src="https://images.unsplash.com/photo-1596464716127-f2a82984de30?w=1000&q=80" 
                alt="Snail Mail Envelopes" 
                className="w-full h-full object-cover opacity-25 hover:scale-105 transition duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
            </div>

            <div className="p-8 z-10">
              <span className="bg-[#C58A5C] text-black text-[9px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full">
                Monthly Curation
              </span>
            </div>

            <div className="p-8 z-10 space-y-3">
              <h3 className="font-serif text-3xl text-white">Letterbox Masterpieces</h3>
              <p className="text-white/60 text-sm leading-relaxed">
                Every month, we pack a custom envelope containing 4-5 original handmade art pieces. Curated, signed, and shipped by hand from Udaipur, Rajasthan.
              </p>
            </div>
          </div>

          {/* Card Right: Subscription Plan Toggle & Cart (Col 6) */}
          <div className="lg:col-span-6 rounded-3xl border border-white/10 bg-[#111111] p-8 flex flex-col justify-between shadow-2xl space-y-8">
            <div className="space-y-6">
              <div>
                <h3 className="font-serif text-2xl text-white">Select Subscription</h3>
                <p className="text-xs text-white/40 mt-1">Choose your geographic location tier for speed post logistics.</p>
              </div>

              {/* Toggle Selector tabs */}
              <div className="grid grid-cols-2 gap-3 p-1 bg-black/40 border border-white/5 rounded-xl">
                <button
                  type="button"
                  onClick={() => setTier("National")}
                  className={`py-3 rounded-lg text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-1.5 transition ${
                    tier === "National"
                      ? "bg-[#C58A5C] text-black font-bold"
                      : "text-white/60 hover:text-white"
                  }`}
                >
                  <Mail size={14} /> National
                </button>
                <button
                  type="button"
                  onClick={() => setTier("International")}
                  className={`py-3 rounded-lg text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-1.5 transition ${
                    tier === "International"
                      ? "bg-[#C58A5C] text-black font-bold"
                      : "text-white/60 hover:text-white"
                  }`}
                >
                  <Plane size={14} /> International
                </button>
              </div>

              {/* Dynamic Price Display */}
              <div className="space-y-2 border-b border-white/5 pb-6">
                <p className="text-white/40 text-xs tracking-wider uppercase">Subscription Fee</p>
                <h4 className="font-serif text-5xl text-[#C58A5C] font-bold">
                  ₹{price.toLocaleString("en-IN")} <span className="text-xs text-white/40 font-sans font-normal lowercase">/ month</span>
                </h4>
                <p className="text-[11px] text-green-400 font-semibold flex items-center gap-1.5 mt-2">
                  <ShieldCheck size={14} /> Free {tier === "National" ? "Speed Post" : "International Air Mail"} Shipping Included
                </p>
              </div>

              {/* Club Inclusions List */}
              <div className="space-y-4">
                <h4 className="text-xs uppercase tracking-widest text-white/40 font-semibold">Monthly Inclusions</h4>
                <div className="grid grid-cols-1 gap-3">
                  {inclusions.map((item, idx) => (
                    <div key={idx} className="flex gap-3 items-start text-xs">
                      <div className="w-5 h-5 rounded-full bg-[#C58A5C]/10 text-[#C58A5C] flex items-center justify-center shrink-0 mt-0.5 font-semibold">
                        ✓
                      </div>
                      <div>
                        <p className="font-semibold text-white/90">{item.title}</p>
                        <p className="text-white/50 text-[11px] mt-0.5 leading-relaxed">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Quantity Selector & Add Button */}
            <div className="space-y-4 pt-6 border-t border-white/5">
              <div className="flex items-center justify-between gap-4">
                <span className="text-xs uppercase tracking-widest text-white/40 font-semibold">Quantity</span>
                <div className="flex h-10 items-center overflow-hidden rounded-full border border-white/10 bg-black/40">
                  <button
                    onClick={() => setQuantity(prev => Math.max(1, prev - 1))}
                    className="flex h-9 w-9 items-center justify-center hover:bg-white/5 text-white/70"
                  >
                    -
                  </button>
                  <span className="w-10 text-center text-xs font-semibold">{quantity}</span>
                  <button
                    onClick={() => setQuantity(prev => prev + 1)}
                    className="flex h-9 w-9 items-center justify-center hover:bg-white/5 text-white/70"
                  >
                    +
                  </button>
                </div>
              </div>

              <button
                type="button"
                onClick={handleAddToCart}
                disabled={isAdding || isAdded}
                className="w-full h-12 rounded-full bg-[#C58A5C] hover:bg-[#b07850] text-black font-bold flex items-center justify-center gap-2 transition cursor-pointer shadow-lg shadow-[#C58A5C]/15 disabled:cursor-not-allowed disabled:opacity-80"
              >
                {isAdding ? (
                  <>
                    <Loader2 size={16} className="animate-spin" />
                    Subscribing...
                  </>
                ) : isAdded ? (
                  <>
                    <Check size={16} />
                    Subscribed!
                  </>
                ) : (
                  <>
                    Add Subscription <ShoppingBag size={16} />
                  </>
                )}
              </button>
            </div>

          </div>

        </div>

      </Container>
    </div>
  );
}
