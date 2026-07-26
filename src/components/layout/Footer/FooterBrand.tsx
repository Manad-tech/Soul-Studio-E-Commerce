import { Link } from "react-router-dom";
import { siteConfig } from "@/config/site";

export default function FooterBrand() {
  return (
    <div className="space-y-5">
      <Link to="/" className="flex items-center gap-3 transition-opacity hover:opacity-90 inline-flex">
        <img
          src="/logo.jpeg"
          alt="Soul Studio Logo"
          className="h-10 sm:h-12 w-auto object-contain rounded-md shrink-0"
        />
        <div className="leading-none text-left">
          <h2 className="font-serif text-2xl sm:text-3xl text-white font-normal tracking-wide whitespace-nowrap">
            SOUL STUDIO
          </h2>
          <p className="text-[9px] sm:text-[10px] uppercase tracking-[0.25em] text-[#C58A5C] mt-1 whitespace-nowrap">
            UN ARTE VENTURA
          </p>
        </div>
      </Link>

      <p className="max-w-sm leading-7 text-white/60 text-sm">
        {siteConfig.description}
      </p>
    </div>
  );
}