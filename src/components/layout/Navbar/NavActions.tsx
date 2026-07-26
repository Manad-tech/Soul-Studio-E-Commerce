import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Heart, Search, ShoppingBag, User, Sun, Moon } from "lucide-react";

import { useCart } from "@/hooks/useCart";
import { useWishlist } from "@/hooks/useWishlist";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { useSearchModal } from "@/context/SearchContext";
import { useTheme } from "@/context/ThemeContext";

export default function NavActions() {
  const { totalItems } = useCart();
  const { totalItems: wishlistCount } = useWishlist();
  const { isAuthenticated } = useAuth();
  const { openSearch } = useSearchModal();
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="flex items-center gap-2 sm:gap-6">
      {/* Theme Toggle Button (Desktop & Tablet) */}
      <button 
        onClick={toggleTheme} 
        className="p-1.5 rounded-full hover:bg-white/5 transition-colors duration-300 hidden sm:flex"
        aria-label="Toggle Theme"
      >
        {theme === "dark" ? (
          <Sun className="h-5 w-5 text-white/80 hover:text-[#C58A5C] transition-colors" />
        ) : (
          <Moon className="h-5 w-5 text-white/80 hover:text-[#C58A5C] transition-colors" />
        )}
      </button>

      {/* Search Button */}
      <button 
        onClick={openSearch} 
        className="p-1.5 rounded-full hover:bg-white/5 transition-colors duration-300"
        aria-label="Open Search"
      >
        <Search className="h-5 w-5 cursor-pointer text-white/80 hover:text-[#C58A5C] transition-colors" />
      </button>

      {/* Wishlist Link */}
      <Link 
        to="/wishlist" 
        className="relative p-1.5 rounded-full hover:bg-white/5 transition-colors duration-300 block"
        aria-label="Wishlist"
      >
        <Heart className="h-5 w-5 text-white/80 hover:text-[#C58A5C] transition-colors" />
        {wishlistCount > 0 && (
          <motion.span 
            key={wishlistCount}
            initial={{ scale: 0.6, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 400, damping: 15 }}
            className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white shadow-lg"
          >
            {wishlistCount}
          </motion.span>
        )}
      </Link>

      {/* Cart Link */}
      <Link 
        to="/cart" 
        className="relative p-1.5 rounded-full hover:bg-white/5 transition-colors duration-300 block"
        aria-label="Cart"
      >
        <ShoppingBag className="h-5 w-5 text-white/80 hover:text-[#C58A5C] transition-colors" />
        {totalItems > 0 && (
          <motion.span 
            key={totalItems}
            initial={{ scale: 0.6, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 400, damping: 15 }}
            className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-[#C58A5C] text-[10px] font-bold text-black shadow-lg"
          >
            {totalItems}
          </motion.span>
        )}
      </Link>

      {/* Auth / Profile Link */}
      <Link 
        to={isAuthenticated ? "/profile" : "/login"}
        className="p-1.5 rounded-full hover:bg-white/5 transition-colors duration-300 hidden lg:block"
        aria-label="Account"
      >
        <User className="h-5 w-5 cursor-pointer text-white/80 hover:text-[#C58A5C] transition-colors" />
      </Link>
    </div>
  );
}