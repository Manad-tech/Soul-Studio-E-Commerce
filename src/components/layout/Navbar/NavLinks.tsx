import { useState } from "react";
import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";
import { navigation } from "@/constants/navigation";

export default function NavLinks() {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  return (
    <nav className="hidden items-center gap-1 xl:gap-4 lg:flex relative shrink-0">
      {navigation.map((item, idx) => (
        <NavLink
          key={item.href}
          to={item.href}
          onMouseEnter={() => setHoveredIdx(idx)}
          onMouseLeave={() => setHoveredIdx(null)}
          className={({ isActive }) =>
            `relative py-1.5 px-1.5 xl:px-3 text-[10.5px] xl:text-xs uppercase tracking-wider xl:tracking-[0.18em] font-semibold transition-colors duration-300 whitespace-nowrap shrink-0 ${
              isActive ? "text-[#C58A5C]" : "text-white/60 hover:text-white"
            }`
          }
        >
          {({ isActive }) => (
            <>
              {/* Hover highlight background */}
              {hoveredIdx === idx && (
                <motion.span
                  layoutId="navHover"
                  className="absolute inset-0 rounded-full bg-white/5 z-0"
                  transition={{ type: "spring", stiffness: 350, damping: 30 }}
                />
              )}
              {/* Active Dot indicator */}
              {isActive && (
                <motion.span 
                  layoutId="activeDot"
                  className="absolute bottom-0 left-1/2 -translate-x-1/2 h-1 w-1 rounded-full bg-[#C58A5C]"
                />
              )}
              <span className="relative z-10">{item.label}</span>
            </>
          )}
        </NavLink>
      ))}
    </nav>
  );
}
