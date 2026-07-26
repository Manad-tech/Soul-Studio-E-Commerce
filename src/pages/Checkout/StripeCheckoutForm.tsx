import { useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

export default function StripeCheckoutForm({ totalAmount }: { totalAmount: number }) {
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsProcessing(true);

    // Simulate API call to process payment
    setTimeout(() => {
      setIsProcessing(false);
      toast.success("Payment successful! Order placed.");
      navigate("/");
    }, 2000);
  };

  return (
    <form onSubmit={handleSubmit} className="mt-8 space-y-6">
      <div className="rounded-xl border border-white/10 bg-black/30 p-5">
        <CardElement
          options={{
            style: {
              base: {
                fontSize: "16px",
                color: "#ffffff",
                "::placeholder": {
                  color: "#ffffff70",
                },
              },
              invalid: {
                color: "#ff3333",
              },
            },
          }}
        />
      </div>

      <button
        type="submit"
        disabled={!stripe || isProcessing}
        className="h-14 w-full rounded-full bg-[#C58A5C] font-semibold text-black transition hover:scale-105 disabled:opacity-50 disabled:hover:scale-100"
      >
        {isProcessing ? "Processing..." : `Pay ₹ ${totalAmount.toLocaleString("en-IN")}`}
      </button>
    </form>
  );
}
