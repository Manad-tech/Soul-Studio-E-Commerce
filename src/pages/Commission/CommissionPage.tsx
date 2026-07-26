import { useState } from "react";
import { Sparkles, ShieldCheck, Send, Loader2 } from "lucide-react";
import { toast } from "sonner";
import Container from "@/components/common/Container";

export default function CommissionPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [category, setCategory] = useState("Painting");
  const [budget, setBudget] = useState("₹ 25,000 - ₹ 50,000");
  const [dimensions, setDimensions] = useState("");
  const [notes, setNotes] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !dimensions) {
      toast.error("Please fill in all required fields.");
      return;
    }

    setIsSubmitting(true);
    // Simulate backend submission API call
    await new Promise((resolve) => setTimeout(resolve, 1200));
    setIsSubmitting(false);

    toast.success("Bespoke commission request submitted successfully! We will contact you in 24-48 hours.");
    setName("");
    setEmail("");
    setDimensions("");
    setNotes("");
  };

  const steps = [
    { title: "01 / Consultation", desc: "Share your spatial details, moodboards, and preferred color palettes with our Lead Architect." },
    { title: "02 / Conceptualization", desc: "Our artisan drafts blueprint sketches and materials lists for your direct approval." },
    { title: "03 / Craftsmanship", desc: "Each piece is sculpted or painted by hand over a period of 4 to 8 weeks." },
    { title: "04 / Insured Delivery", desc: "We dispatch the finished masterpiece in heavy-duty wood packing with full transport insurance." }
  ];

  return (
    <div className="min-h-screen bg-[#0D0D0D] text-white">
      {/* Banner */}
      <section className="relative py-24 bg-gradient-to-b from-[#111111] to-[#0D0D0D] border-b border-white/5">
        <Container className="text-center">
          <p className="text-[#C58A5C] tracking-[0.3em] uppercase text-xs mb-3 font-semibold flex items-center justify-center gap-1.5">
            <Sparkles size={14} /> Custom Commissions
          </p>
          <h1 className="font-serif text-4xl md:text-6xl text-white">Bespoke Architectural Art</h1>
          <p className="mt-4 text-white/50 text-base max-w-xl mx-auto">
            Collaborate directly with our master artisans to design customized paintings, sculptures, or resin works tailored precisely for your residential or commercial interior.
          </p>
        </Container>
      </section>

      <section className="py-20">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            
            {/* Left side: Process Info */}
            <div className="space-y-12">
              <div>
                <h2 className="font-serif text-3xl md:text-4xl mb-4">The Creation Process</h2>
                <p className="text-white/60 leading-relaxed">
                  Bespoke art is a collaborative journey. We translate your spatial dimensions, lighting conditions, and aesthetic preferences into custom heirlooms.
                </p>
              </div>

              {/* Step checklist */}
              <div className="space-y-6">
                {steps.map((step, idx) => (
                  <div key={idx} className="border border-white/5 bg-white/5 rounded-2xl p-6 transition-all hover:border-white/10">
                    <h3 className="font-serif text-lg text-[#C58A5C] mb-2">{step.title}</h3>
                    <p className="text-sm text-white/60">{step.desc}</p>
                  </div>
                ))}
              </div>

              {/* Integrity statement */}
              <div className="flex items-center gap-3 text-sm text-white/40">
                <ShieldCheck className="text-[#C58A5C] shrink-0" size={20} />
                <span>All commission commissions come with an official Certificate of Authenticity.</span>
              </div>
            </div>

            {/* Right side: Request Form */}
            <div className="bg-[#111111] border border-white/10 rounded-3xl p-8 shadow-2xl">
              <h3 className="font-serif text-2xl text-white mb-6">Commission Request Brief</h3>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs uppercase tracking-widest text-white/40 mb-2 font-semibold">Your Name *</label>
                    <input 
                      type="text" 
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. John Doe"
                      className="w-full h-12 rounded-xl border border-white/10 bg-black/40 px-4 text-white outline-none focus:border-[#C58A5C] transition-colors text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs uppercase tracking-widest text-white/40 mb-2 font-semibold">Email Address *</label>
                    <input 
                      type="email" 
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="e.g. john@example.com"
                      className="w-full h-12 rounded-xl border border-white/10 bg-black/40 px-4 text-white outline-none focus:border-[#C58A5C] transition-colors text-sm"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs uppercase tracking-widest text-white/40 mb-2 font-semibold">Preferred Medium</label>
                    <select 
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      className="w-full h-12 rounded-xl border border-white/10 bg-black/40 px-4 text-white outline-none focus:border-[#C58A5C] transition-colors text-sm cursor-pointer"
                    >
                      <option value="Painting">Painting</option>
                      <option value="Sculpture">Sculpture</option>
                      <option value="Ceramic">Ceramic</option>
                      <option value="Resin Art">Resin Art</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs uppercase tracking-widest text-white/40 mb-2 font-semibold">Target Budget *</label>
                    <select 
                      value={budget}
                      onChange={(e) => setBudget(e.target.value)}
                      className="w-full h-12 rounded-xl border border-white/10 bg-black/40 px-4 text-white outline-none focus:border-[#C58A5C] transition-colors text-sm cursor-pointer"
                    >
                      <option value="₹ 25,000 - ₹ 50,000">₹ 25,000 - ₹ 50,000</option>
                      <option value="₹ 50,000 - ₹ 1,000,000">₹ 50,000 - ₹ 100,000</option>
                      <option value="₹ 100,000+">₹ 100,000+</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-widest text-white/40 mb-2 font-semibold">Target Dimensions *</label>
                  <input 
                    type="text" 
                    required
                    value={dimensions}
                    onChange={(e) => setDimensions(e.target.value)}
                    placeholder="e.g. 36 x 48 inches"
                    className="w-full h-12 rounded-xl border border-white/10 bg-black/40 px-4 text-white outline-none focus:border-[#C58A5C] transition-colors text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-widest text-white/40 mb-2 font-semibold">Brief Design Concept / Spatial Notes</label>
                  <textarea 
                    rows={4}
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Tell us about the space, color scheme, lighting, or ideas you have..."
                    className="w-full rounded-xl border border-white/10 bg-black/40 p-4 text-white outline-none focus:border-[#C58A5C] transition-colors text-sm resize-none"
                  />
                </div>

                <button 
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full h-12 rounded-full bg-[#C58A5C] text-black font-semibold hover:bg-[#b07850] transition flex items-center justify-center gap-2 cursor-pointer disabled:opacity-75"
                >
                  {isSubmitting ? (
                    <Loader2 size={18} className="animate-spin" />
                  ) : (
                    <>
                      <Send size={16} /> Submit Commission Brief
                    </>
                  )}
                </button>
              </form>
            </div>

          </div>
        </Container>
      </section>
    </div>
  );
}
