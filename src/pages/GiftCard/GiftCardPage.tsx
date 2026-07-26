import Container from "@/components/common/Container";
import GiftCardBuilder from "@/components/shop/GiftCardBuilder";
import { Sparkles } from "lucide-react";

export default function GiftCardPage() {
  return (
    <div className="min-h-screen bg-[#0D0D0D] text-white py-20 pt-32">
      <Container className="space-y-12">
        <div className="text-center space-y-4 max-w-2xl mx-auto mb-16">
          <p className="text-[#C58A5C] tracking-[0.3em] uppercase text-xs font-semibold flex items-center justify-center gap-1.5">
            <Sparkles size={14} /> Studio Curations
          </p>
          <h1 className="font-serif text-5xl md:text-7xl text-white leading-tight">
            Soul Studio e-Gift Card
          </h1>
          <p className="text-white/50 text-base leading-relaxed">
            Give the gift of choice. Share the beauty of handmade expression, luxury printmaking, or bespoke pottery. Delivered directly via email to your recipient.
          </p>
        </div>

        <GiftCardBuilder />
      </Container>
    </div>
  );
}
