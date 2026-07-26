import Container from "@/components/common/Container";
import { HelpCircle, RefreshCcw, Landmark, ShieldAlert } from "lucide-react";

export default function ReturnsPage() {
  return (
    <div className="min-h-screen bg-[#0D0D0D] py-20 text-white">
      <Container className="max-w-4xl">
        <div className="text-center mb-16">
          <h1 className="font-serif text-4xl md:text-6xl text-white mb-4">Returns & Exchanges</h1>
          <p className="text-white/50 text-base max-w-xl mx-auto">
            Our priority is your complete satisfaction. Learn about our luxury return policies.
          </p>
        </div>

        <div className="space-y-12">
          {/* Policy Overview */}
          <div className="rounded-2xl border border-white/10 bg-[#111111] p-8 flex flex-col md:flex-row gap-6 items-start">
            <RefreshCcw size={40} className="text-[#C58A5C] shrink-0" />
            <div>
              <h3 className="font-serif text-2xl mb-2 text-white">14-Day Return Guarantee</h3>
              <p className="text-white/60 leading-relaxed text-sm">
                We accept returns on all catalog artpieces and items within 14 calendar days from the date of delivery, provided the item is in its original condition and returned inside its custom packing container.
              </p>
            </div>
          </div>

          {/* Refund process */}
          <div className="rounded-2xl border border-white/10 bg-[#111111] p-8 flex flex-col md:flex-row gap-6 items-start">
            <Landmark size={40} className="text-[#C58A5C] shrink-0" />
            <div>
              <h3 className="font-serif text-2xl mb-2 text-white">Refund Issuance</h3>
              <p className="text-white/60 leading-relaxed text-sm">
                Once we receive the returned item at our central gallery and inspect it for authenticity and condition, a full refund will be processed to your original payment method within 5 to 7 business days.
              </p>
            </div>
          </div>

          {/* Exceptions */}
          <div className="rounded-2xl border border-white/10 bg-[#111111] p-8 flex flex-col md:flex-row gap-6 items-start">
            <ShieldAlert size={40} className="text-[#C58A5C] shrink-0" />
            <div>
              <h3 className="font-serif text-2xl mb-2 text-white">Custom Commission Exceptions</h3>
              <p className="text-white/60 leading-relaxed text-sm">
                Please note that customized or bespoke commissions created to your exact dimensional parameters cannot be returned or refunded. We involve you throughout the step-by-step design approval phase before final crafting.
              </p>
            </div>
          </div>

          {/* Assistance */}
          <div className="rounded-2xl border border-white/10 bg-[#111111] p-8 flex flex-col md:flex-row gap-6 items-start">
            <HelpCircle size={40} className="text-[#C58A5C] shrink-0" />
            <div>
              <h3 className="font-serif text-2xl mb-2 text-white">Initiating a Return</h3>
              <p className="text-white/60 leading-relaxed text-sm">
                To request a return, contact our customer support team at <span className="text-[#C58A5C]">hello@soulstudio.in</span> or via our Contact Page. We will arrange a fine-art logistics team to collect the package directly from your address.
              </p>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
