import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function NavLogo() {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Link
        to="/"
        className="flex items-center gap-2 sm:gap-3 transition-opacity hover:opacity-90 shrink-0"
      >
        <img
          src="/logo.jpeg"
          alt="Soul Studio Logo"
          className="h-8 sm:h-12 w-auto object-contain rounded-md shrink-0"
        />
        <div className="leading-none text-left">
          <h1 className="font-serif text-base sm:text-2xl text-white font-normal tracking-wide whitespace-nowrap">
            SOUL STUDIO
          </h1>
          <p className="text-[8px] sm:text-[9px] uppercase tracking-[0.25em] text-[#C58A5C] mt-0.5 whitespace-nowrap">
            UN ARTE VENTURA
          </p>
        </div>
      </Link>
    </motion.div>
  );
}
