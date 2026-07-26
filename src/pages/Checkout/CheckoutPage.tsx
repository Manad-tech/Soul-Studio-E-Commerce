import { useState } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { 
  CreditCard, Smartphone, Landmark, Truck, ShieldCheck, 
  CheckCircle, ArrowRight, Home, Calendar, AlertCircle
} from "lucide-react";
import { toast } from "sonner";

import Container from "@/components/common/Container";
import { useCart } from "@/hooks/useCart";

const checkoutSchema = z.object({
  firstName: z.string().min(2, "First name is required"),
  lastName: z.string().min(2, "Last name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().regex(/^\d{10}$/, "Phone must be a valid 10-digit number"),
  address: z.string().min(5, "Address must be at least 5 characters"),
  city: z.string().min(2, "City is required"),
  pincode: z.string().regex(/^\d{6}$/, "Pincode must be exactly 6 digits"),
  paymentMethod: z.enum(["card", "upi", "netbanking", "cod"]),
  
  // Card details (Optional at zod level, manually refined during validation)
  cardHolder: z.string().optional(),
  cardNumber: z.string().optional(),
  cardExpiry: z.string().optional(),
  cardCvv: z.string().optional(),
  
  // UPI Details
  upiId: z.string().optional(),
  
  // Net Banking Details
  bankName: z.string().optional(),
});

type CheckoutFormValues = z.infer<typeof checkoutSchema>;

export default function CheckoutPage() {
  const { items, totalPrice, clearCart } = useCart();
  
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [placedOrderNumber, setPlacedOrderNumber] = useState("");

  const { register, handleSubmit, watch, setError, formState: { errors } } = useForm<CheckoutFormValues>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      paymentMethod: "card",
      bankName: "",
    }
  });

  const selectedPaymentMethod = watch("paymentMethod");

  const onSubmit = async (data: CheckoutFormValues) => {
    // 1. Strict Payment Field Verification
    if (data.paymentMethod === "card") {
      const cleanCard = (data.cardNumber || "").replace(/\s+/g, "");
      if (!cleanCard || !/^\d{16}$/.test(cleanCard)) {
        setError("cardNumber", { message: "Card number must be exactly 16 digits" });
        return;
      }
      if (!data.cardCvv || !/^\d{3}$/.test(data.cardCvv)) {
        setError("cardCvv", { message: "CVV must be exactly 3 digits" });
        return;
      }
      if (!data.cardExpiry || !/^(0[1-9]|1[0-2])\/\d{2}$/.test(data.cardExpiry)) {
        setError("cardExpiry", { message: "Expiry must be in MM/YY format" });
        return;
      }
      
      // Future date validation
      const [month, year] = data.cardExpiry.split("/").map(Number);
      const expiryDate = new Date(2000 + year, month - 1);
      if (expiryDate < new Date()) {
        setError("cardExpiry", { message: "Expiry date must be in the future" });
        return;
      }

      if (!data.cardHolder || data.cardHolder.trim().length < 3) {
        setError("cardHolder", { message: "Cardholder name is required" });
        return;
      }
    } else if (data.paymentMethod === "upi") {
      if (!data.upiId || !/^.+@.+$/.test(data.upiId)) {
        setError("upiId", { message: "UPI ID must be in format username@upi" });
        return;
      }
    } else if (data.paymentMethod === "netbanking") {
      if (!data.bankName) {
        setError("bankName", { message: "Please select your bank" });
        return;
      }
    }

    // 2. Submit payment processing simulation
    setIsProcessing(true);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setIsProcessing(false);

    // Save mock order details
    const orderNo = `ORD-${Math.floor(100000 + Math.random() * 900000)}`;
    setPlacedOrderNumber(orderNo);
    setOrderPlaced(true);
    clearCart();
    toast.success("Order placed successfully!");
  };

  // If order is completed, render success screen
  if (orderPlaced) {
    return (
      <div className="min-h-[85vh] bg-[#0D0D0D] text-white flex items-center justify-center py-20">
        <Container className="max-w-xl text-center space-y-8">
          <div className="inline-flex p-4 rounded-full bg-green-500/10 text-green-400 mb-2">
            <CheckCircle size={48} className="animate-bounce" />
          </div>
          
          <div className="space-y-3">
            <h1 className="font-serif text-4xl">Order Confirmed</h1>
            <p className="text-white/60">Thank you for collecting with Soul Studio.</p>
            <p className="text-sm text-[#C58A5C] font-semibold uppercase tracking-wider">
              Order Reference: {placedOrderNumber}
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-[#111111] p-6 space-y-4 text-sm text-left">
            <div className="flex justify-between border-b border-white/5 pb-2">
              <span className="text-white/40">Logistics status</span>
              <span className="text-green-400 font-semibold">Processing Delivery</span>
            </div>
            <div className="flex justify-between">
              <span className="text-white/40">Estimated Arrival</span>
              <span className="text-white font-medium flex items-center gap-1.5">
                <Calendar size={14} className="text-[#C58A5C]" /> 3 - 5 Business Days
              </span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link 
              to="/shop" 
              className="w-full sm:w-auto h-12 px-8 rounded-full bg-[#C58A5C] text-black font-semibold hover:bg-[#b07850] transition flex items-center justify-center gap-2"
            >
              Continue Curation <ArrowRight size={16} />
            </Link>
            <Link 
              to="/" 
              className="w-full sm:w-auto h-12 px-8 rounded-full border border-white/20 hover:bg-white/5 transition flex items-center justify-center gap-2 text-sm font-semibold"
            >
              <Home size={14} /> Go to Home
            </Link>
          </div>
        </Container>
      </div>
    );
  }

  return (
    <section className="py-20 bg-[#0D0D0D] text-white">
      <Container>
        <h1 className="font-serif text-5xl md:text-6xl text-white mb-12">Checkout</h1>

        <form onSubmit={handleSubmit(onSubmit)} className="grid gap-12 lg:grid-cols-[1fr_400px] items-start">
          
          {/* Left Column: Billing Details & Payment Option grids */}
          <div className="space-y-10">
            
            {/* Billing Details Block */}
            <div className="rounded-2xl border border-white/10 bg-[#111111] p-8 space-y-6">
              <h2 className="font-serif text-2xl text-white border-b border-white/5 pb-3">Billing Details</h2>
              
              <div className="grid gap-5 md:grid-cols-2">
                <div>
                  <input
                    {...register("firstName")}
                    placeholder="First Name *"
                    className="w-full h-12 rounded-xl border border-white/10 bg-black/40 px-4 text-sm text-white outline-none focus:border-[#C58A5C] transition-colors"
                  />
                  {errors.firstName && <p className="text-red-400 text-xs mt-1">{errors.firstName.message}</p>}
                </div>

                <div>
                  <input
                    {...register("lastName")}
                    placeholder="Last Name *"
                    className="w-full h-12 rounded-xl border border-white/10 bg-black/40 px-4 text-sm text-white outline-none focus:border-[#C58A5C] transition-colors"
                  />
                  {errors.lastName && <p className="text-red-400 text-xs mt-1">{errors.lastName.message}</p>}
                </div>

                <div className="md:col-span-2">
                  <input
                    {...register("email")}
                    placeholder="Email Address *"
                    className="w-full h-12 rounded-xl border border-white/10 bg-black/40 px-4 text-sm text-white outline-none focus:border-[#C58A5C] transition-colors"
                  />
                  {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email.message}</p>}
                </div>

                <div className="md:col-span-2">
                  <input
                    {...register("phone")}
                    placeholder="Phone Number (10 digits) *"
                    className="w-full h-12 rounded-xl border border-white/10 bg-black/40 px-4 text-sm text-white outline-none focus:border-[#C58A5C] transition-colors"
                  />
                  {errors.phone && <p className="text-red-400 text-xs mt-1">{errors.phone.message}</p>}
                </div>

                <div className="md:col-span-2">
                  <input
                    {...register("address")}
                    placeholder="Street Address *"
                    className="w-full h-12 rounded-xl border border-white/10 bg-black/40 px-4 text-sm text-white outline-none focus:border-[#C58A5C] transition-colors"
                  />
                  {errors.address && <p className="text-red-400 text-xs mt-1">{errors.address.message}</p>}
                </div>

                <div>
                  <input
                    {...register("city")}
                    placeholder="City *"
                    className="w-full h-12 rounded-xl border border-white/10 bg-black/40 px-4 text-sm text-white outline-none focus:border-[#C58A5C] transition-colors"
                  />
                  {errors.city && <p className="text-red-400 text-xs mt-1">{errors.city.message}</p>}
                </div>

                <div>
                  <input
                    {...register("pincode")}
                    placeholder="Pincode (6 digits) *"
                    className="w-full h-12 rounded-xl border border-white/10 bg-black/40 px-4 text-sm text-white outline-none focus:border-[#C58A5C] transition-colors"
                  />
                  {errors.pincode && <p className="text-red-400 text-xs mt-1">{errors.pincode.message}</p>}
                </div>
              </div>
            </div>

            {/* Payment Method Select Block */}
            <div className="rounded-2xl border border-white/10 bg-[#111111] p-8 space-y-6">
              <h2 className="font-serif text-2xl text-white border-b border-white/5 pb-3">Payment Method</h2>
              
              {/* Selector Tabs */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {[
                  { id: "card", label: "Cards", icon: <CreditCard size={16} /> },
                  { id: "upi", label: "UPI Pay", icon: <Smartphone size={16} /> },
                  { id: "netbanking", label: "NetBanking", icon: <Landmark size={16} /> },
                  { id: "cod", label: "Cash (COD)", icon: <Truck size={16} /> }
                ].map((opt) => (
                  <label 
                    key={opt.id}
                    className={`flex flex-col items-center justify-center p-3 rounded-xl border cursor-pointer transition ${
                      selectedPaymentMethod === opt.id
                        ? "border-[#C58A5C] bg-[#C58A5C]/10 text-white"
                        : "border-white/10 bg-black/20 text-white/50 hover:border-white/20 hover:text-white"
                    }`}
                  >
                    <input 
                      type="radio"
                      value={opt.id}
                      {...register("paymentMethod")}
                      className="hidden"
                    />
                    {opt.icon}
                    <span className="text-xs font-semibold mt-1.5">{opt.label}</span>
                  </label>
                ))}
              </div>

              {/* Conditional Payment Views */}
              <div className="pt-4 border-t border-white/5 min-h-[160px]">
                
                {/* 1. Credit/Debit Card Input Fields */}
                {selectedPaymentMethod === "card" && (
                  <div className="space-y-4">
                    <div>
                      <input 
                        type="text"
                        {...register("cardHolder")}
                        placeholder="Cardholder Name *"
                        className="w-full h-11 rounded-xl border border-white/10 bg-black/40 px-4 text-xs text-white outline-none focus:border-[#C58A5C] transition-colors"
                      />
                      {errors.cardHolder && <p className="text-red-400 text-xs mt-1">{errors.cardHolder.message}</p>}
                    </div>

                    <div>
                      <input 
                        type="text"
                        {...register("cardNumber")}
                        maxLength={19}
                        placeholder="Card Number (16 digits) *"
                        className="w-full h-11 rounded-xl border border-white/10 bg-black/40 px-4 text-xs text-white outline-none focus:border-[#C58A5C] transition-colors"
                      />
                      {errors.cardNumber && <p className="text-red-400 text-xs mt-1">{errors.cardNumber.message}</p>}
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <input 
                          type="text"
                          {...register("cardExpiry")}
                          maxLength={5}
                          placeholder="Expiry (MM/YY) *"
                          className="w-full h-11 rounded-xl border border-white/10 bg-black/40 px-4 text-xs text-white outline-none focus:border-[#C58A5C] transition-colors"
                        />
                        {errors.cardExpiry && <p className="text-red-400 text-xs mt-1">{errors.cardExpiry.message}</p>}
                      </div>
                      <div>
                        <input 
                          type="password"
                          {...register("cardCvv")}
                          maxLength={3}
                          placeholder="CVV (3 digits) *"
                          className="w-full h-11 rounded-xl border border-white/10 bg-black/40 px-4 text-xs text-white outline-none focus:border-[#C58A5C] transition-colors"
                        />
                        {errors.cardCvv && <p className="text-red-400 text-xs mt-1">{errors.cardCvv.message}</p>}
                      </div>
                    </div>
                  </div>
                )}

                {/* 2. UPI Id input */}
                {selectedPaymentMethod === "upi" && (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-[10px] text-white/40 uppercase tracking-widest mb-2 font-semibold">Enter UPI ID</label>
                      <input 
                        type="text"
                        {...register("upiId")}
                        placeholder="e.g. name@paytm / name@okaxis"
                        className="w-full h-11 rounded-xl border border-white/10 bg-black/40 px-4 text-xs text-white outline-none focus:border-[#C58A5C] transition-colors"
                      />
                      {errors.upiId && <p className="text-red-400 text-xs mt-1">{errors.upiId.message}</p>}
                    </div>
                    <p className="text-[10px] text-white/40 leading-relaxed">
                      * Please keep your mobile UPI App (Paytm, GooglePay, PhonePe) open to accept the transaction mandate.
                    </p>
                  </div>
                )}

                {/* 3. Net Banking */}
                {selectedPaymentMethod === "netbanking" && (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-[10px] text-white/40 uppercase tracking-widest mb-2 font-semibold">Select Bank</label>
                      <select
                        {...register("bankName")}
                        className="w-full h-11 rounded-xl border border-white/10 bg-black/40 px-4 text-xs text-white outline-none focus:border-[#C58A5C] transition-colors cursor-pointer"
                      >
                        <option value="">-- Choose Your Bank --</option>
                        <option value="SBI">State Bank of India (SBI)</option>
                        <option value="HDFC">HDFC Bank</option>
                        <option value="ICICI">ICICI Bank</option>
                        <option value="AXIS">Axis Bank</option>
                      </select>
                      {errors.bankName && <p className="text-red-400 text-xs mt-1">{errors.bankName.message}</p>}
                    </div>
                  </div>
                )}

                {/* 4. Cash on Delivery */}
                {selectedPaymentMethod === "cod" && (
                  <div className="rounded-xl border border-dashed border-[#C58A5C]/20 bg-[#C58A5C]/5 p-4 flex gap-3 items-start">
                    <AlertCircle className="text-[#C58A5C] shrink-0 mt-0.5" size={16} />
                    <div className="text-xs text-white/70 space-y-1">
                      <p className="font-semibold text-white">Cash on Delivery Selected</p>
                      <p>Payable Amount: <strong>₹ {totalPrice.toLocaleString("en-IN")}</strong> upon safe container dropoff.</p>
                      <p>An authentication SMS confirmation will be sent to complete packaging dispatch.</p>
                    </div>
                  </div>
                )}
                
              </div>
            </div>

          </div>

          {/* Right Column: Summaries & Payment Buttons */}
          <aside className="rounded-2xl border border-white/10 bg-[#111111] p-6 space-y-6">
            <h2 className="font-serif text-2xl text-white border-b border-white/5 pb-3">Review Items</h2>
            
            <div className="space-y-4 max-h-56 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-white/10">
              {items.map((item) => (
                <div key={item.product.id} className="flex justify-between items-start gap-4 text-xs">
                  <span className="text-white/70 flex-1 leading-snug">
                    {item.product.name} <span className="text-[#C58A5C] font-semibold">×{item.quantity}</span>
                  </span>
                  <span className="text-white font-semibold shrink-0">
                    ₹ {(item.product.price * item.quantity).toLocaleString("en-IN")}
                  </span>
                </div>
              ))}
            </div>

            <div className="border-t border-white/5 pt-4 space-y-3 text-xs">
              <div className="flex justify-between text-white/60">
                <span>Subtotal</span>
                <span className="text-white font-semibold">₹ {totalPrice.toLocaleString("en-IN")}</span>
              </div>
              <div className="flex justify-between text-white/60">
                <span>Shipping Freight</span>
                <span className="text-green-400">Free</span>
              </div>
              
              <div className="h-px bg-white/5 my-2" />

              <div className="flex justify-between items-baseline">
                <span className="text-sm text-white font-semibold">Payable Total</span>
                <span className="text-xl font-bold text-[#C58A5C]">₹ {totalPrice.toLocaleString("en-IN")}</span>
              </div>
            </div>

            <button
              type="submit"
              disabled={isProcessing || items.length === 0}
              className="w-full h-12 rounded-full bg-[#C58A5C] text-black font-bold flex items-center justify-center gap-2 hover:bg-[#b07850] transition disabled:opacity-50 cursor-pointer shadow-lg shadow-[#C58A5C]/15"
            >
              {isProcessing ? "Processing..." : `Complete Order`}
            </button>

            <div className="flex items-center justify-center gap-1.5 text-[9px] text-white/30 uppercase tracking-widest pt-2">
              <ShieldCheck size={12} className="text-[#C58A5C]" />
              <span>Verified 256-bit SSL Transaction</span>
            </div>
          </aside>

        </form>
      </Container>
    </section>
  );
}