import { useState } from "react";
import { useCart } from "@/hooks/useCart";
import { toast } from "sonner";
import { Gift, Calendar, Mail, User, MessageSquare, Plus, Minus, Sparkles, Loader2, Check } from "lucide-react";
import type { Product } from "@/types/product";

const DENOMINATIONS = [
  500, 1000, 2000, 3000, 5000, 7500, 10000, 15000, 20000, 25000, 30000, 40000, 50000
];

export default function GiftCardBuilder() {
  const { addToCart } = useCart();
  
  const [denomination, setDenomination] = useState<number>(5000);
  const [quantity, setQuantity] = useState<number>(1);
  const [isGift, setIsGift] = useState<boolean>(false);
  const [recipientEmail, setRecipientEmail] = useState<string>("");
  const [recipientName, setRecipientName] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [sendDate, setSendDate] = useState<string>("");
  const [isAdding, setIsAdding] = useState<boolean>(false);
  const [isAdded, setIsAdded] = useState<boolean>(false);

  const handleQuantityChange = (amount: number) => {
    setQuantity(prev => Math.max(1, prev + amount));
  };

  const handleAddToCart = async (e: React.FormEvent) => {
    e.preventDefault();

    if (isGift && !recipientEmail) {
      toast.error("Please enter the recipient's email address.");
      return;
    }

    if (message.length > 200) {
      toast.error("Message exceeds the 200 character limit.");
      return;
    }

    setIsAdding(true);
    
    // Premium feedback simulation delay
    await new Promise((resolve) => setTimeout(resolve, 850));

    // Build a unique custom Product instance for the Gift Card
    const giftCardId = `giftcard_${denomination}_${Date.now()}`;
    const giftCardProduct: Product = {
      id: giftCardId,
      slug: `gift-card-${denomination}-${Date.now()}`,
      name: `Soul Studio e-Gift Card (₹${denomination.toLocaleString("en-IN")})`,
      category: "Gift Card",
      image: "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=800&q=80",
      images: ["https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=800&q=80"],
      shortDescription: `Curated digital gift card for Soul Studio masterpieces.`,
      description: `Soul Studio digital e-Gift Card. Denomination: ₹${denomination.toLocaleString("en-IN")}. ${
        isGift 
          ? `Gift for: ${recipientName || "Valued Recipient"} (${recipientEmail}). Message: "${message || "No message provided"}". Send Date: ${sendDate || "Immediate"}`
          : "Personal Purchase."
      }`,
      artist: "Soul Studio",
      medium: "Digital Code Delivery",
      dimensions: "Virtual Delivery via Email",
      year: new Date().getFullYear(),
      price: denomination,
      originalPrice: undefined,
      featured: false,
      bestseller: false,
      inStock: true,
      stock: 9999,
      rating: 5.0,
      reviews: 0,
      specifications: [
        { label: "Delivery", value: "Instant Email" },
        { label: "Validity", value: "1 Year from issuance" },
        { label: "Redeemable", value: "Site-wide" }
      ],
      features: ["Instant Delivery", "Secure Redemption", "Personalized Message option"],
      reviewList: []
    };

    addToCart(giftCardProduct, quantity);
    
    setIsAdding(false);
    setIsAdded(true);
    
    toast.success("Gift Card Added", {
      description: `${quantity} × Gift Card(s) of ₹${denomination.toLocaleString("en-IN")} added to your cart.`
    });

    // Reset inputs & button checkmark state after delay
    setTimeout(() => {
      setIsAdded(false);
      setQuantity(1);
      setIsGift(false);
      setRecipientEmail("");
      setRecipientName("");
      setMessage("");
      setSendDate("");
    }, 1500);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
      
      {/* Left: Luxury Card Preview (Col 5) */}
      <div className="lg:col-span-5 flex flex-col justify-between rounded-3xl border border-white/10 bg-gradient-to-br from-[#1c1a15] to-[#0D0D0D] p-8 shadow-2xl relative overflow-hidden min-h-[320px]">
        {/* Decorative Light Flares */}
        <div className="absolute top-0 right-0 w-48 h-48 bg-[#C58A5C]/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-[#C58A5C]/5 rounded-full blur-3xl pointer-events-none" />

        <div className="flex justify-between items-start z-10">
          <div>
            <p className="text-[10px] tracking-[0.3em] uppercase text-[#C58A5C] font-semibold flex items-center gap-1.5">
              <Sparkles size={10} /> Gift of Art
            </p>
            <h3 className="font-serif text-2xl text-white mt-1">SOUL STUDIO</h3>
          </div>
          <Gift size={24} className="text-[#C58A5C] opacity-70" />
        </div>

        <div className="my-8 z-10">
          <p className="text-white/40 text-xs tracking-wider uppercase mb-1">Denomination</p>
          <h4 className="font-serif text-5xl md:text-6xl text-white font-bold tracking-tight">
            ₹{denomination.toLocaleString("en-IN")}
          </h4>
        </div>

        <div className="flex justify-between items-end border-t border-white/5 pt-6 z-10">
          <div>
            <p className="text-white/30 text-[9px] uppercase tracking-widest">Card Issuance</p>
            <p className="text-white/60 text-xs mt-0.5">Redeemable Online</p>
          </div>
          <div className="text-right">
            <p className="text-white/30 text-[9px] uppercase tracking-widest">Recipient</p>
            <p className="text-[#C58A5C] text-xs font-semibold mt-0.5 max-w-[150px] truncate">
              {isGift && recipientName ? recipientName : isGift && recipientEmail ? recipientEmail : "Personal Use"}
            </p>
          </div>
        </div>
      </div>

      {/* Right: Configurator Form (Col 7) */}
      <form onSubmit={handleAddToCart} className="lg:col-span-7 rounded-3xl border border-white/10 bg-[#111111] p-8 space-y-6 flex flex-col justify-between shadow-2xl">
        <div className="space-y-6">
          <div>
            <h2 className="font-serif text-3xl text-white">Purchase a Gift Card</h2>
            <p className="text-white/50 text-sm mt-1">Delight someone special with local fine arts and bespoke sculptures.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Price Denominations Selector */}
            <div>
              <label className="block text-xs uppercase tracking-widest text-white/40 mb-2 font-semibold">Select Value *</label>
              <select 
                value={denomination}
                onChange={(e) => setDenomination(Number(e.target.value))}
                className="w-full h-12 rounded-xl border border-white/10 bg-black/40 px-4 text-sm text-white outline-none focus:border-[#C58A5C] transition-colors cursor-pointer"
              >
                {DENOMINATIONS.map((val) => (
                  <option key={val} value={val}>
                    ₹{val.toLocaleString("en-IN")}
                  </option>
                ))}
              </select>
            </div>

            {/* Quantity Selector */}
            <div>
              <label className="block text-xs uppercase tracking-widest text-white/40 mb-2 font-semibold">Quantity</label>
              <div className="flex h-12 items-center justify-between rounded-xl border border-white/10 bg-black/40 px-4">
                <button 
                  type="button" 
                  onClick={() => handleQuantityChange(-1)}
                  className="p-1 hover:text-[#C58A5C] transition"
                >
                  <Minus size={16} />
                </button>
                <span className="font-semibold text-sm">{quantity}</span>
                <button 
                  type="button" 
                  onClick={() => handleQuantityChange(1)}
                  className="p-1 hover:text-[#C58A5C] transition"
                >
                  <Plus size={16} />
                </button>
              </div>
            </div>
          </div>

          {/* Send as Gift checkbox toggle */}
          <label className="flex items-center gap-3 cursor-pointer group py-1">
            <input 
              type="checkbox" 
              checked={isGift}
              onChange={(e) => setIsGift(e.target.checked)}
              className="w-4 h-4 rounded border-white/10 accent-[#C58A5C] cursor-pointer"
            />
            <span className="text-sm font-semibold text-white/80 group-hover:text-white transition">
              This is a Gift (Send to recipient via Email)
            </span>
          </label>

          {/* Conditional Gift Form Fields */}
          {isGift && (
            <div className="space-y-4 pt-2 border-t border-white/5 animate-fadeIn">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Recipient Email */}
                <div>
                  <label className="block text-xs uppercase tracking-widest text-white/40 mb-2 font-semibold flex items-center gap-1.5">
                    <Mail size={12} /> Recipient Email *
                  </label>
                  <input 
                    type="email"
                    required
                    value={recipientEmail}
                    onChange={(e) => setRecipientEmail(e.target.value)}
                    placeholder="recipient@email.com"
                    className="w-full h-11 rounded-xl border border-white/10 bg-black/40 px-4 text-xs text-white outline-none focus:border-[#C58A5C] transition-colors"
                  />
                </div>

                {/* Recipient Name */}
                <div>
                  <label className="block text-xs uppercase tracking-widest text-white/40 mb-2 font-semibold flex items-center gap-1.5">
                    <User size={12} /> Recipient Name (Optional)
                  </label>
                  <input 
                    type="text"
                    value={recipientName}
                    onChange={(e) => setRecipientName(e.target.value)}
                    placeholder="e.g. Jane Doe"
                    className="w-full h-11 rounded-xl border border-white/10 bg-black/40 px-4 text-xs text-white outline-none focus:border-[#C58A5C] transition-colors"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Custom Message */}
                <div>
                  <div className="flex justify-between items-baseline mb-2">
                    <label className="block text-xs uppercase tracking-widest text-white/40 font-semibold flex items-center gap-1.5">
                      <MessageSquare size={12} /> Message (Optional)
                    </label>
                    <span className="text-[10px] text-white/30">{message.length}/200</span>
                  </div>
                  <textarea 
                    maxLength={200}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Write a custom note (Max 200 characters)..."
                    className="w-full h-20 rounded-xl border border-white/10 bg-black/40 p-3 text-xs text-white outline-none focus:border-[#C58A5C] transition-colors resize-none"
                  />
                </div>

                {/* Send Date */}
                <div>
                  <label className="block text-xs uppercase tracking-widest text-white/40 mb-2 font-semibold flex items-center gap-1.5">
                    <Calendar size={12} /> Delivery Date (Optional)
                  </label>
                  <input 
                    type="date"
                    value={sendDate}
                    min={new Date().toISOString().split("T")[0]}
                    onChange={(e) => setSendDate(e.target.value)}
                    className="w-full h-11 rounded-xl border border-white/10 bg-black/40 px-4 text-xs text-white outline-none focus:border-[#C58A5C] transition-colors cursor-pointer"
                  />
                </div>
              </div>
            </div>
          )}
        </div>

        <button 
          type="submit"
          disabled={isAdding || isAdded}
          className="w-full h-12 rounded-full bg-[#C58A5C] hover:bg-[#b07850] text-black font-bold flex items-center justify-center gap-2 transition cursor-pointer shadow-lg mt-4 disabled:opacity-80 disabled:cursor-not-allowed"
        >
          {isAdding ? (
            <>
              <Loader2 size={16} className="animate-spin" />
              Adding...
            </>
          ) : isAdded ? (
            <>
              <Check size={16} />
              Added!
            </>
          ) : (
            <>
              Add to Cart <Plus size={16} />
            </>
          )}
        </button>
      </form>

    </div>
  );
}
