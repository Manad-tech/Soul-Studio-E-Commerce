import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, GraduationCap, Award, Compass, BookOpen, MapPin, Landmark, Globe } from "lucide-react";
import Container from "@/components/common/Container";

export default function AboutPage() {
  const [activeTab, setActiveTab] = useState<"solo" | "group" | "participation" | "awards" | "collections">("solo");

  const soloExhibitions = [
    { year: "2011", title: "Two-Woman Exhibition", venue: "Lalit Kala Akademi, New Delhi" }
  ];

  const groupExhibitions = [
    { year: "2018", title: "Together 2018", venue: "Lalit Kala Akademi, New Delhi" },
    { year: "2018", title: "Khajuraho Festival Exhibition", venue: "Madhya Pradesh" },
    { year: "2018", title: "Women's Group Exhibition", venue: "Garhi Art Gallery, New Delhi" },
    { year: "2017", title: "Exhibition @ Graphics", venue: "Garhi Art Gallery, New Delhi" },
    { year: "2017–2018", title: "Garhi Artists Association Annual Exhibitions", venue: "New Delhi" },
    { year: "2016", title: "ICAC International Graphic Print Exchange Program", venue: "Mumbai" },
    { year: "2014", title: "Nehru Centre Art Gallery", venue: "Mumbai" },
    { year: "2005, 2011, 2013, 2014, 2017", title: "Jehangir Art Gallery Printmaking Exhibitions", venue: "Mumbai" },
    { year: "2012", title: "Together", venue: "Lalit Kala Akademi, New Delhi" },
    { year: "2008", title: "Gallery Art Vasti", venue: "Mumbai" },
    { year: "2008", title: "Tendril – All India Art Exhibition", venue: "Palette Art Gallery, Jodhpur" },
    { year: "2008", title: "All India Mini Contemporary Art Exhibition", venue: "Ravindra Bhavan Art Mall, New Delhi" },
    { year: "2006", title: "Group Exhibition", venue: "Garhi Studio, New Delhi" },
    { year: "1997–2001", title: "West Zone Cultural Centre Exhibitions", venue: "Udaipur & Silvassa" }
  ];

  const participations = [
    "National Exhibitions of Art (Lalit Kala Akademi)",
    "AIFACS Annual Exhibitions",
    "Rajasthan Lalit Kala Akademi Annual Exhibitions",
    "Bharat Bhavan International Biennial of Print Art",
    "Egyptian International Print Triennale",
    "International Print Biennale of India",
    "International Kala Mela, Lalit Kala Akademi",
    "Hida Takayama International Contemporary Woodblock Print Triennale, Japan",
    "International Virtual Engravist Printmaking Biennial, Istanbul, Turkey"
  ];

  const awardsList = [
    { type: "Award", title: "National Award", detail: "International Women's Day Art Exhibition, Modinagar, Uttar Pradesh (2011)" },
    { type: "Award", title: "AIFACS Award", detail: "80th & 81st All India Drawing & Graphic Exhibition (2009)" },
    { type: "Award", title: "Rajasthan State Lalit Kala Academy Award", detail: "Jaipur (2006)" },
    { type: "Award", title: "Silver Medal", detail: "National ABC Art Show, Bhubaneswar, Odisha" },
    { type: "Scholarship", title: "Young Artist Scholarship", detail: "Ministry of Culture, Government of India (2001–02)" },
    { type: "Scholarship", title: "Scholarship", detail: "Lalit Kala Akademi (2004–05)" },
    { type: "Scholarship", title: "Scholarship", detail: "Rajasthan Lalit Kala Academy (2000–01)" }
  ];

  const collections = [
    "National Lalit Kala Akademi, New Delhi",
    "West Zone Cultural Centre, Udaipur",
    "Rajasthan Lalit Kala Academy, Jaipur",
    "Rashtriya Lalit Kala Kendra, Lucknow",
    "Takhman-28, Udaipur"
  ];

  return (
    <div className="min-h-screen bg-[#0D0D0D] text-white overflow-hidden pt-20">
      
      {/* 1. Hero Quote Banner */}
      <section className="relative min-h-[50vh] flex items-center justify-center border-b border-white/5 bg-[#111111]/30 py-16">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=2000&q=80" 
            alt="Artistic Workspace" 
            className="h-full w-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-transparent to-[#0D0D0D]" />
        </div>
        
        <Container className="relative z-10 text-center space-y-6 max-w-4xl mx-auto">
          <p className="text-[#C58A5C] tracking-[0.3em] uppercase text-xs font-semibold flex items-center justify-center gap-1.5">
            <Sparkles size={14} /> Soul Studio &bull; Udaipur
          </p>
          <h1 className="font-serif text-3xl md:text-5xl lg:text-6xl leading-tight text-white tracking-wide">
            "A Soulful Journey of Artistic exploration, Creativity and handmade expression"
          </h1>
        </Container>
      </section>

      {/* 2. About Studio Section */}
      <section className="py-24 relative">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            
            {/* Left Narrative (Col 7) */}
            <div className="lg:col-span-7 space-y-8">
              <div className="space-y-2">
                <span className="text-[#C58A5C] text-xs font-bold uppercase tracking-widest flex items-center gap-1.5">
                  <Compass size={14} /> About Studio
                </span>
                <h2 className="font-serif text-3xl md:text-4xl text-white">Welcome to Soul Studio – Un Arte Ventura</h2>
              </div>
              
              <div className="space-y-6 text-white/70 text-sm leading-relaxed font-light">
                <p>
                  <strong>Soul Studio – Un Arte Ventura</strong> is the creative world of artist <strong>Sheetal Chaudhary</strong>, where imagination, craftsmanship, and emotion come together to create meaningful works of art. Every piece is thoughtfully designed and handcrafted, celebrating the beauty of artistic expression and the uniqueness of handmade creations.
                </p>
                <p>
                  The studio embraces a multidisciplinary approach, offering original paintings, sculptures, ceramic art, printmaking, resin art, wearable art, and a carefully curated collection of hand-painted and handcrafted products. Each creation carries its own story, inspired by nature, culture, emotions, and everyday experiences.
                </p>
                <p>
                  At Soul Studio, art is more than an object—it is an experience that connects people, spaces, and emotions. Whether it is a painting that transforms a wall, a ceramic piece that enriches everyday life, or wearable art that expresses individuality, every creation is made with authenticity, passion, and attention to detail.
                </p>
                <p>
                  Un Arte Ventura reflects the spirit of an artistic adventure—a journey of continuous exploration, creativity, and soulful expression. It represents a commitment to creating art that inspires, connects, and becomes a cherished part of everyday living.
                </p>
                <p className="font-serif text-base text-[#C58A5C] italic border-l-2 border-[#C58A5C] pl-4 py-1">
                  Thank you for being a part of this creative journey. May every piece you discover here bring beauty, inspiration, and a touch of soul into your life.
                </p>
              </div>
            </div>

            {/* Right Images Collage (Col 5) */}
            <div className="lg:col-span-5 relative grid grid-cols-2 gap-4">
              <div className="absolute inset-0 bg-[#C58A5C]/5 rounded-full blur-3xl pointer-events-none -z-10" />
              <div className="rounded-2xl overflow-hidden aspect-[3/4] border border-white/10 mt-8 shadow-2xl">
                <img 
                  src="https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?auto=format&fit=crop&w=600&q=80" 
                  alt="Ceramics work" 
                  className="w-full h-full object-cover hover:scale-105 transition duration-500"
                />
              </div>
              <div className="rounded-2xl overflow-hidden aspect-[3/4] border border-white/10 shadow-2xl">
                <img 
                  src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=600&q=80" 
                  alt="Printmaking studio" 
                  className="w-full h-full object-cover hover:scale-105 transition duration-500"
                />
              </div>
            </div>

          </div>
        </Container>
      </section>

      {/* 3. About Artist Section */}
      <section className="py-24 bg-[#111111]/40 border-t border-b border-white/5">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            
            {/* Left Profile Frame (Col 4) */}
            <div className="lg:col-span-4 space-y-6">
              <div className="relative rounded-3xl overflow-hidden border border-white/10 aspect-[4/5] shadow-2xl">
                <img 
                  src="https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&w=800&q=80" 
                  alt="Dr. Sheetal Chaudhary" 
                  className="w-full h-full object-cover filter contrast-105"
                />
              </div>
              <div className="space-y-2 text-center lg:text-left">
                <h3 className="font-serif text-2xl text-white">Dr. Sheetal Chaudhary</h3>
                <p className="text-white/40 text-xs uppercase tracking-widest font-semibold flex items-center justify-center lg:justify-start gap-1.5">
                  <MapPin size={12} className="text-[#C58A5C]" /> Founder & Master Artisan &bull; Udaipur
                </p>
              </div>
            </div>

            {/* Right Biography (Col 8) */}
            <div className="lg:col-span-8 space-y-8">
              <div className="space-y-2">
                <span className="text-[#C58A5C] text-xs font-bold uppercase tracking-widest flex items-center gap-1.5">
                  <BookOpen size={14} /> Biography & Practice
                </span>
                <h2 className="font-serif text-3xl md:text-4xl text-white">About the Artist</h2>
              </div>

              <div className="space-y-6 text-white/75 text-sm leading-relaxed font-light">
                <p>
                  <strong>Dr. Sheetal Chaudhary</strong> is an Indian visual artist, educator, researcher, and founder of <strong>Soul Studio – Un Arte Ventura</strong>. Based in Udaipur, Rajasthan, she has dedicated over two decades to exploring the language of contemporary art through painting, printmaking, ceramics, sculpture, resin art, and mixed media.
                </p>
                <div className="flex flex-col sm:flex-row gap-6 py-4 border-y border-white/5">
                  <div className="flex gap-3 items-start sm:w-1/2">
                    <GraduationCap size={24} className="text-[#C58A5C] shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-serif text-white font-semibold">Academic Excellence</h4>
                      <p className="text-xs text-white/50 mt-1">Gold Medalist in Drawing & Painting, holder of a Ph.D. in Fine Arts.</p>
                    </div>
                  </div>
                  <div className="flex gap-3 items-start sm:w-1/2">
                    <Award size={24} className="text-[#C58A5C] shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-serif text-white font-semibold">National & Global Recognition</h4>
                      <p className="text-xs text-white/50 mt-1">Exhibited across India, Japan, Egypt, and Turkey; Ministry of Culture Fellow.</p>
                    </div>
                  </div>
                </div>
                <p>
                  A Gold Medalist in Drawing & Painting and holder of a Ph.D. in Fine Arts, Dr. Chaudhary combines traditional craftsmanship with contemporary artistic expression. Her creative practice celebrates texture, emotion, culture, and storytelling, transforming everyday materials into meaningful works of art.
                </p>
                <p>
                  Her artworks have been exhibited at prestigious galleries and institutions across India and internationally, including Lalit Kala Akademi, Jehangir Art Gallery, Garhi Artists' Centre, Bharat Bhavan, and international printmaking exhibitions in Japan, Egypt, and Turkey. Her works are part of important public and institutional collections, and she has received numerous national awards and scholarships from organizations including the Ministry of Culture, Government of India, Lalit Kala Akademi, AIFACS, and Rajasthan Lalit Kala Academy.
                </p>
                <p>
                  Alongside her studio practice, Dr. Chaudhary is deeply passionate about art education, design thinking, and nurturing creativity in young artists. Through workshops, research, and teaching, she encourages learners to discover their own artistic voice while preserving the richness of handmade art.
                </p>
              </div>
            </div>

          </div>
        </Container>
      </section>

      {/* 4. Exhibitions, Awards & Collections Section (Interactive Tabbing System) */}
      <section className="py-24 relative bg-[#0D0D0D]">
        <Container className="space-y-16">
          <div className="text-center max-w-xl mx-auto space-y-3">
            <p className="text-[#C58A5C] tracking-[0.2em] uppercase text-xs font-semibold">Exhibitions & Awards</p>
            <h2 className="font-serif text-3xl md:text-5xl">Professional Archive</h2>
            <p className="text-white/40 text-xs">Over two decades of national & international exhibitions, honours, and institutional collections.</p>
          </div>

          {/* Interactive Navigation Tabs */}
          <div className="flex flex-wrap justify-center gap-2 max-w-4xl mx-auto border-b border-white/5 pb-6">
            {[
              { id: "solo", label: "Solo & Two-Person" },
              { id: "group", label: "Group Exhibitions" },
              { id: "participation", label: "National & International" },
              { id: "awards", label: "Awards & Fellowships" },
              { id: "collections", label: "Public Collections" }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-4 py-2.5 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all duration-300 cursor-pointer ${
                  activeTab === tab.id 
                    ? "bg-[#C58A5C] text-black font-bold" 
                    : "text-white/60 hover:text-white hover:bg-white/5"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tab Contents */}
          <div className="max-w-4xl mx-auto min-h-[300px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                {/* 1. Solo Exhibitions */}
                {activeTab === "solo" && (
                  <div className="space-y-6">
                    <h3 className="text-xs uppercase tracking-widest text-[#C58A5C] font-semibold mb-4">Selected Solo & Two-Person Exhibitions</h3>
                    {soloExhibitions.map((item, idx) => (
                      <div key={idx} className="flex gap-6 items-baseline border-b border-white/5 pb-4">
                        <span className="font-serif text-xl text-[#C58A5C] font-bold w-16 shrink-0">{item.year}</span>
                        <div>
                          <h4 className="font-serif text-lg text-white font-semibold">{item.title}</h4>
                          <p className="text-xs text-white/50 mt-1 flex items-center gap-1.5">
                            <MapPin size={10} className="text-[#C58A5C]" /> {item.venue}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* 2. Group Exhibitions */}
                {activeTab === "group" && (
                  <div className="space-y-6">
                    <div className="border-b border-white/10 pb-3 mb-6">
                      <h3 className="text-xs uppercase tracking-widest text-[#C58A5C] font-semibold">Selected Group Exhibitions</h3>
                      <p className="text-xs text-white/50 mt-1">Over the past two decades, Dr. Sheetal Chaudhary has participated in numerous prestigious exhibitions across India in painting and printmaking.</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {groupExhibitions.map((item, idx) => (
                        <div key={idx} className="flex gap-4 items-baseline border border-white/5 bg-[#111111]/40 p-4 rounded-xl">
                          <span className="font-serif text-xs text-[#C58A5C] font-bold w-20 shrink-0">{item.year}</span>
                          <div>
                            <h4 className="font-serif text-sm text-white font-semibold">{item.title}</h4>
                            <p className="text-[11px] text-white/40 mt-1">{item.venue}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* 3. National & International Participation */}
                {activeTab === "participation" && (
                  <div className="space-y-6">
                    <div className="border-b border-white/10 pb-3 mb-6">
                      <h3 className="text-xs uppercase tracking-widest text-[#C58A5C] font-semibold">National & International Participation</h3>
                      <p className="text-xs text-white/50 mt-1">Dr. Chaudhary has represented her work in numerous prestigious national and international exhibitions, biennales and printmaking events.</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {participations.map((item, idx) => (
                        <div key={idx} className="flex gap-3 items-center bg-[#111111]/30 border border-white/5 p-4 rounded-xl">
                          <Globe size={18} className="text-[#C58A5C] shrink-0" />
                          <p className="text-xs text-white/80 font-medium">{item}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* 4. Awards & Scholarships */}
                {activeTab === "awards" && (
                  <div className="space-y-6">
                    <div className="border-b border-white/10 pb-3 mb-6">
                      <h3 className="text-xs uppercase tracking-widest text-[#C58A5C] font-semibold">Awards & Fellowships</h3>
                      <p className="text-xs text-white/50 mt-1">Honoured with several prestigious national awards and scholarships in recognition of her contribution to contemporary visual arts.</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {awardsList.map((item, idx) => (
                        <div key={idx} className="border border-white/5 bg-[#111111]/40 rounded-2xl p-5 space-y-2 flex flex-col justify-between">
                          <div className="flex justify-between items-center">
                            <span className={`text-[9px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full border ${
                              item.type === "Award" 
                                ? "bg-[#C58A5C]/10 text-[#C58A5C] border-[#C58A5C]/20" 
                                : "bg-blue-500/10 text-blue-300 border-blue-500/20"
                            }`}>
                              {item.type}
                            </span>
                          </div>
                          <h4 className="font-serif text-base text-white font-semibold leading-tight">{item.title}</h4>
                          <p className="text-xs text-white/50 border-t border-white/5 pt-2 flex items-center gap-1.5">
                            <Landmark size={12} className="text-[#C58A5C] shrink-0" /> {item.detail}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* 5. Public Collections */}
                {activeTab === "collections" && (
                  <div className="space-y-6">
                    <div className="border-b border-white/10 pb-3 mb-6">
                      <h3 className="text-xs uppercase tracking-widest text-[#C58A5C] font-semibold">Public Collections</h3>
                      <p className="text-xs text-white/50 mt-1">Works by Dr. Sheetal Chaudhary are included in the permanent collections of major cultural institutions.</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {collections.map((item, idx) => (
                        <div key={idx} className="flex gap-4 items-center bg-[#111111]/25 border border-white/5 p-5 rounded-2xl">
                          <span className="w-7 h-7 rounded-full bg-[#C58A5C]/10 text-[#C58A5C] flex items-center justify-center shrink-0 text-xs font-bold border border-[#C58A5C]/20">
                            {idx + 1}
                          </span>
                          <p className="text-sm text-white/90 leading-relaxed font-medium">{item}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </Container>
      </section>

    </div>
  );
}
