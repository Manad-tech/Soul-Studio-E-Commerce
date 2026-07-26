import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Minus, Plus, Trash2, ArrowRight, ShoppingBag, Percent, Gift, Shield } from "lucide-react";
import { toast } from "sonner";

import Container from "@/components/common/Container";
import { useCart } from "@/hooks/useCart";

export default function CartPage() {
  const {
    items,
    totalPrice,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
  } = useCart();

  const [promoCode, setPromoCode] = useState("");
  const [appliedDiscount, setAppliedDiscount] = useState(0); // in percentage
  const [promoApplied, setPromoApplied] = useState(false);

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (promoCode.trim().toUpperCase() === "SOUL10") {
      setAppliedDiscount(10);
      setPromoApplied(true);
      toast.success("Promo code SOUL10 applied (10% Off!)");
    } else {
      toast.error("Invalid promo code. Try using SOUL10");
    }
  };

  const discountAmount = (totalPrice * appliedDiscount) / 100;
  const finalPrice = totalPrice - discountAmount;

  // Free Box target logic
  const giftThreshold = 25000;
  const differenceToGift = Math.max(0, giftThreshold - totalPrice);
  const giftPercent = Math.min(100, (totalPrice / giftThreshold) * 100);

  if (items.length === 0) {
    return (
      <section className="py-24 bg-[#0D0D0D]">
        <Container>
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mx-auto max-w-2xl rounded-[36px] border border-white/10 bg-[#111111] p-16 text-center space-y-6"
          >
            <div className="inline-flex p-4 rounded-full bg-[#C58A5C]/10 text-[#C58A5C] mb-2">
              <ShoppingBag size={40} />
            </div>
            <h1 className="font-serif text-4xl text-white">Your Cart is Empty</h1>
            <p className="text-white/50 max-w-sm mx-auto">
              Your cart is waiting for a masterpiece. Explore our shop to find the perfect artwork for your environment.
            </p>
            <Link
              to="/shop"
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#C58A5C] px-8 py-3.5 font-semibold text-black hover:bg-[#b07850] transition cursor-pointer"
            >
              Start Collecting <ArrowRight size={16} />
            </Link>
          </motion.div>
        </Container>
      </section>
    );
  }

  return (
    <section className="py-20 bg-[#0D0D0D] text-white">
      <Container>
        <div className="mb-12">
          <h1 className="font-serif text-5xl md:text-6xl text-white">Shopping Cart</h1>
          <p className="text-white/40 mt-2">You have {items.length} premium artpiece(s) in your bag</p>
        </div>

        <div className="grid gap-12 lg:grid-cols-[1fr_400px] items-start">
          
          {/* Left Column: Cart Items List */}
          <div className="space-y-6">
            
            {/* Free Gift Indicator Bar */}
            <div className="rounded-2xl border border-white/10 bg-[#111111] p-6 space-y-3">
              <div className="flex items-center justify-between text-sm">
                <p className="flex items-center gap-2 text-white/80 font-medium">
                  <Gift className="text-[#C58A5C] shrink-0" size={18} />
                  {differenceToGift > 0 ? (
                    <span>Add <strong className="text-[#C58A5C]">₹ {differenceToGift.toLocaleString("en-IN")}</strong> more to unlock a <strong>Free Collector's Certificate Box</strong></span>
                  ) : (
                    <span className="text-[#C58A5C] font-semibold">You have unlocked the Collector's Box!</span>
                  )}
                </p>
              </div>
              <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: `${giftPercent}%` }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  className="h-full bg-[#C58A5C]"
                />
              </div>
            </div>

            <div className="space-y-4">
              <AnimatePresence mode="popLayout">
                {items.map((item) => (
                  <motion.article
                    key={item.product.id}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: -60, transition: { duration: 0.3 } }}
                    className="flex gap-6 rounded-2xl border border-white/5 bg-[#111111] p-6 hover:border-white/15 transition-all duration-300 relative group"
                  >
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="h-32 w-28 rounded-xl object-cover border border-white/10 bg-black shrink-0"
                    />

                    <div className="flex flex-1 flex-col justify-between">
                      <div className="space-y-1">
                        <div className="flex justify-between items-start gap-2">
                          <span className="text-[10px] uppercase tracking-widest text-[#C58A5C] font-semibold">
                            {item.product.category}
                          </span>
                          <button
                            onClick={() => {
                              removeFromCart(item.product.id);
                              toast.success(`Removed ${item.product.name} from cart`);
                            }}
                            className="text-white/40 hover:text-red-400 p-1 rounded transition duration-200"
                            title="Remove work"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                        <h2 className="font-serif text-xl text-white group-hover:text-[#C58A5C] transition-colors leading-snug">
                          {item.product.name}
                        </h2>
                        <p className="text-white/40 text-xs font-medium">Artist: {item.product.artist || "Soul Studio"}</p>
                      </div>

                      <div className="flex items-center justify-between pt-4 mt-2 border-t border-white/5">
                        <div className="flex items-center overflow-hidden rounded-full border border-white/10 bg-black/40">
                          <button
                            onClick={() => decreaseQuantity(item.product.id)}
                            className="flex h-9 w-9 items-center justify-center hover:bg-white/5 font-bold text-white/70"
                          >
                            <Minus size={12} />
                          </button>
                          <span className="w-10 text-center text-sm font-semibold">{item.quantity}</span>
                          <button
                            onClick={() => increaseQuantity(item.product.id)}
                            className="flex h-9 w-9 items-center justify-center hover:bg-white/5 font-bold text-white/70"
                          >
                            <Plus size={12} />
                          </button>
                        </div>

                        <p className="font-bold text-[#C58A5C]">
                          ₹ {(item.product.price * item.quantity).toLocaleString("en-IN")}
                        </p>
                      </div>
                    </div>
                  </motion.article>
                ))}
              </AnimatePresence>
            </div>
          </div>

          {/* Right Column: Checkout Pricing Summary */}
          <aside className="space-y-6">
            <div className="rounded-2xl border border-white/10 bg-[#111111] p-6 space-y-6">
              <h2 className="font-serif text-2xl text-white border-b border-white/5 pb-3">Order Summary</h2>

              <div className="space-y-4 text-sm">
                <div className="flex justify-between text-white/60">
                  <span>Subtotal</span>
                  <span className="text-white">₹ {totalPrice.toLocaleString("en-IN")}</span>
                </div>
                
                {promoApplied && (
                  <div className="flex justify-between text-green-400">
                    <span className="flex items-center gap-1.5"><Percent size={14} /> Coupon Discount (10%)</span>
                    <span>- ₹ {discountAmount.toLocaleString("en-IN")}</span>
                  </div>
                )}

                <div className="flex justify-between text-white/60">
                  <span>Shipping Freight</span>
                  <span className="text-green-400">Free</span>
                </div>

                <div className="h-px bg-white/5" />

                <div className="flex justify-between items-baseline">
                  <span className="text-white font-semibold">Total</span>
                  <span className="text-2xl font-bold text-[#C58A5C]">₹ {finalPrice.toLocaleString("en-IN")}</span>
                </div>
              </div>

              {/* Promo input field */}
              <form onSubmit={handleApplyPromo} className="flex gap-2">
                <input 
                  type="text"
                  placeholder="Promo Code (e.g. SOUL10)"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                  className="flex-1 h-11 bg-black/40 border border-white/10 rounded-xl px-3 text-xs text-white outline-none focus:border-[#C58A5C] transition-colors"
                />
                <button 
                  type="submit"
                  className="h-11 rounded-xl bg-white/5 border border-white/10 text-xs px-4 hover:bg-[#C58A5C] hover:text-black font-semibold transition"
                >
                  Apply
                </button>
              </form>

              <Link
                to="/checkout"
                state={{ discountedPrice: finalPrice }} // Pass discounted price to checkout
                className="w-full h-12 rounded-full bg-[#C58A5C] hover:bg-[#b07850] text-black font-bold flex items-center justify-center gap-2 transition cursor-pointer shadow-lg shadow-[#C58A5C]/15"
              >
                Proceed to Checkout <ArrowRight size={16} />
              </Link>
            </div>

            {/* Secure payment seal */}
            <div className="flex items-center justify-center gap-2 text-[10px] text-white/40 uppercase tracking-widest">
              <Shield size={14} className="text-[#C58A5C]" />
              <span>SSL Secure Payments Guaranteed</span>
            </div>
          </aside>

        </div>
      </Container>
    </section>
  );
}
