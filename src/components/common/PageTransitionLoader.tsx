import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

export default function PageTransitionLoader() {
  const location = useLocation();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 850); // Show loader for 850ms to allow smooth fade out

    return () => clearTimeout(timer);
  }, [location.pathname]);

  return (
    <AnimatePresence mode="wait">
      {isVisible && (
        <motion.div
          key="page-loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.4, ease: "easeInOut" } }}
          className="fixed inset-0 z-[99999] flex flex-col items-center justify-center bg-[#0D0D0D]"
        >
          <div className="text-center space-y-6">
            {/* Elegant rotating dashed gold geometry */}
            <motion.div 
              initial={{ scale: 0.8, rotate: 0 }}
              animate={{ scale: 1.1, rotate: 360 }}
              transition={{ 
                duration: 1.5, 
                ease: "easeInOut",
                repeat: Infinity,
                repeatType: "reverse"
              }}
              className="w-16 h-16 rounded-full border-2 border-dashed border-[#C58A5C] mx-auto flex items-center justify-center"
            >
              <div className="w-8 h-8 rounded-full border border-[#C58A5C]/30" />
            </motion.div>

            {/* Typography motion */}
            <div className="space-y-1">
              <motion.h2
                initial={{ letterSpacing: "0.2em", opacity: 0.6 }}
                animate={{ letterSpacing: "0.45em", opacity: 1 }}
                transition={{ duration: 0.7, ease: "easeOut" }}
                className="font-serif text-lg uppercase text-white font-medium pl-[0.45em]"
              >
                SOUL STUDIO<span className="text-[#C58A5C]">.</span>
              </motion.h2>
              <p className="text-[9px] text-white/30 uppercase tracking-[0.3em] font-semibold">Curation in Progress</p>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
