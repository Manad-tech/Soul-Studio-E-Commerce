import Container from "@/components/common/Container";
import { Truck, ShieldCheck, Clock, MapPin } from "lucide-react";

export default function ShippingPage() {
  return (
    <div className="min-h-screen bg-[#0D0D0D] py-20 text-white">
      <Container className="max-w-4xl">
        <div className="text-center mb-16">
          <h1 className="font-serif text-4xl md:text-6xl text-white mb-4">Shipping & Logistics</h1>
          <p className="text-white/50 text-base max-w-xl mx-auto">
            Our specialized transport logistics ensure your high-value masterpieces arrive in flawless condition.
          </p>
        </div>

        <div className="space-y-12">
          {/* Packaging Section */}
          <div className="rounded-2xl border border-white/10 bg-[#111111] p-8 flex flex-col md:flex-row gap-6 items-start">
            <ShieldCheck size={40} className="text-[#C58A5C] shrink-0" />
            <div>
              <h3 className="font-serif text-2xl mb-2 text-white">Fine-Art Preservation Packing</h3>
              <p className="text-white/60 leading-relaxed text-sm">
                Each sculpture, ceramic, and canvas is protected with moisture-resistant barriers, impact-absorbing foam frames, and encased in custom-built, double-reinforced wooden crates. We secure the shipment to withstand transit stress.
              </p>
            </div>
          </div>

          {/* Timelines Section */}
          <div className="rounded-2xl border border-white/10 bg-[#111111] p-8 flex flex-col md:flex-row gap-6 items-start">
            <Clock size={40} className="text-[#C58A5C] shrink-0" />
            <div>
              <h3 className="font-serif text-2xl mb-2 text-white">Estimated Timelines</h3>
              <p className="text-white/60 leading-relaxed text-sm mb-4">
                We work diligently to ensure rapid processing:
              </p>
              <ul className="list-disc pl-5 space-y-2 text-sm text-white/50">
                <li><strong>Domestic Courier:</strong> 3-5 business days from fulfillment.</li>
                <li><strong>International Freight:</strong> 8-15 business days (custom regulations apply).</li>
                <li><strong>Bespoke Work:</strong> Commences packing immediately upon custom completion.</li>
              </ul>
            </div>
          </div>

          {/* Insurance */}
          <div className="rounded-2xl border border-white/10 bg-[#111111] p-8 flex flex-col md:flex-row gap-6 items-start">
            <Truck size={40} className="text-[#C58A5C] shrink-0" />
            <div>
              <h3 className="font-serif text-2xl mb-2 text-white">Transit Insurance Coverage</h3>
              <p className="text-white/60 leading-relaxed text-sm">
                Soul Studio provides 100% comprehensive transit insurance coverage on every package. In the extremely rare event of delivery issues or damage, you are fully covered for refunds or replacements.
              </p>
            </div>
          </div>

          {/* Tracking */}
          <div className="rounded-2xl border border-white/10 bg-[#111111] p-8 flex flex-col md:flex-row gap-6 items-start">
            <MapPin size={40} className="text-[#C58A5C] shrink-0" />
            <div>
              <h3 className="font-serif text-2xl mb-2 text-white">Courier Tracking</h3>
              <p className="text-white/60 leading-relaxed text-sm">
                A personal shipping coordinator will send you complete tracking links alongside the Bill of Lading and Certificate of Authenticity via email once your order has been dispatched.
              </p>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
