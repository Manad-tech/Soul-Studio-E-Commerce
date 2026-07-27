import { useState, useEffect } from "react";
import Container from "@/components/common/Container";
import NavLogo from "./NavLogo";
import NavLinks from "./NavLinks";
import NavActions from "./NavActions";
import MobileNav from "./MobileNav";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header 
      className={`sticky top-0 z-50 transition-all duration-500 border-b w-full ${
        isScrolled 
          ? "h-16 bg-black/90 backdrop-blur-md border-white/5 shadow-2xl shadow-black/30" 
          : "h-20 bg-black/40 backdrop-blur-sm border-white/5"
      }`}
    >
      <Container className="h-full">
        <div className="flex h-full items-center justify-between gap-4 lg:gap-6 xl:gap-8">
          <NavLogo />
          
          <NavLinks />
          
          <div className="flex items-center gap-6 shrink-0">
            <NavActions />
            <MobileNav />
          </div>
        </div>
      </Container>
    </header>
  );
}
