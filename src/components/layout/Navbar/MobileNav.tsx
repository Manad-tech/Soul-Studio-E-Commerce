import { useState } from "react";
import { Menu, User, Sun, Moon } from "lucide-react";
import { Link, NavLink } from "react-router-dom";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { navigation } from "@/constants/navigation";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { useTheme } from "@/context/ThemeContext";

export default function MobileNav() {
  const [open, setOpen] = useState(false);
  const { isAuthenticated } = useAuth();
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="lg:hidden">
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <button
            className="rounded-full p-2 transition hover:bg-white/10"
            aria-label="Open Menu"
          >
            <Menu className="h-6 w-6 text-white" />
          </button>
        </SheetTrigger>

        <SheetContent
          side="left"
          className="w-[300px] sm:w-[340px] border-white/10 bg-[#0B0B0B] text-white p-6"
        >
          <div className="mt-8 flex flex-col gap-8">
            <Link
              to="/"
              onClick={() => setOpen(false)}
              className="text-xl font-serif font-semibold tracking-[0.15em] text-[#C58A5C]"
            >
              SOUL STUDIO
            </Link>

            <nav className="flex flex-col gap-5">
              {navigation.map((item) => (
                <NavLink
                  key={item.href}
                  to={item.href}
                  onClick={() => setOpen(false)}
                  className={({ isActive }) =>
                    `text-sm font-semibold uppercase tracking-wider transition-colors ${
                      isActive ? "text-[#C58A5C]" : "text-white/70 hover:text-white"
                    }`
                  }
                >
                  {item.label}
                </NavLink>
              ))}

              <div className="pt-6 border-t border-white/10 mt-2 space-y-4">
                <button
                  onClick={toggleTheme}
                  className="flex items-center gap-3 text-sm font-semibold uppercase tracking-wider text-white/70 hover:text-white w-full text-left"
                >
                  {theme === "dark" ? (
                    <>
                      <Sun size={18} className="text-[#C58A5C]" />
                      <span>Light Theme</span>
                    </>
                  ) : (
                    <>
                      <Moon size={18} className="text-[#C58A5C]" />
                      <span>Dark Theme</span>
                    </>
                  )}
                </button>

                <NavLink
                  to={isAuthenticated ? "/profile" : "/login"}
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-3 text-sm font-semibold uppercase tracking-wider text-white/70 hover:text-white"
                >
                  <User size={18} className="text-[#C58A5C]" />
                  <span>{isAuthenticated ? "My Account" : "Sign In / Register"}</span>
                </NavLink>
              </div>
            </nav>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}