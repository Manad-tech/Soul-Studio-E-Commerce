import Container from "@/components/common/Container";
import { EyeOff, Key, Database, BookOpen } from "lucide-react";

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-[#0D0D0D] py-20 text-white">
      <Container className="max-w-4xl">
        <div className="text-center mb-16">
          <h1 className="font-serif text-4xl md:text-6xl text-white mb-4">Privacy Policy</h1>
          <p className="text-white/50 text-base max-w-xl mx-auto">
            Your personal privacy and billing security are protected under strict encryption standards.
          </p>
        </div>

        <div className="space-y-12">
          {/* Data collection */}
          <div className="rounded-2xl border border-white/10 bg-[#111111] p-8 flex flex-col md:flex-row gap-6 items-start">
            <Database size={40} className="text-[#C58A5C] shrink-0" />
            <div>
              <h3 className="font-serif text-2xl mb-2 text-white">Information We Collect</h3>
              <p className="text-white/60 leading-relaxed text-sm">
                We only collect basic delivery information (name, address, telephone, email) to ship products and orders. We do not sell or distribute user registry items to third-party marketing services.
              </p>
            </div>
          </div>

          {/* Secure Payment */}
          <div className="rounded-2xl border border-white/10 bg-[#111111] p-8 flex flex-col md:flex-row gap-6 items-start">
            <Key size={40} className="text-[#C58A5C] shrink-0" />
            <div>
              <h3 className="font-serif text-2xl mb-2 text-white">Secure Transaction Protocol</h3>
              <p className="text-white/60 leading-relaxed text-sm">
                All payment transactions are encrypted using Secure Socket Layer (SSL) technology and processed directly through licensed payment gateways. Your CVV and credit card numbers are never stored in our local databases.
              </p>
            </div>
          </div>

          {/* User Rights */}
          <div className="rounded-2xl border border-white/10 bg-[#111111] p-8 flex flex-col md:flex-row gap-6 items-start">
            <EyeOff size={40} className="text-[#C58A5C] shrink-0" />
            <div>
              <h3 className="font-serif text-2xl mb-2 text-white">Your Consent & Control</h3>
              <p className="text-white/60 leading-relaxed text-sm">
                You retain complete control of your account settings. You can request deletion of saved billing addresses or request account profile termination at any time by contacting our privacy officers.
              </p>
            </div>
          </div>

          {/* Legal */}
          <div className="rounded-2xl border border-white/10 bg-[#111111] p-8 flex flex-col md:flex-row gap-6 items-start">
            <BookOpen size={40} className="text-[#C58A5C] shrink-0" />
            <div>
              <h3 className="font-serif text-2xl mb-2 text-white">Compliance Standard</h3>
              <p className="text-white/60 leading-relaxed text-sm">
                Soul Studio maintains strict compliance with standard global privacy regulations (including GDPR and CCPA) for secure user data lifecycle processing.
              </p>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
