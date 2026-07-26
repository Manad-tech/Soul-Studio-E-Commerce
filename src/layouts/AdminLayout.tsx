import { Outlet, Link, useNavigate } from "react-router-dom";
import { LayoutDashboard, ShoppingBag, Users, LogOut } from "lucide-react";
import ScrollToTop from "@/components/common/ScrollToTop";
import PageTransitionLoader from "@/components/common/PageTransitionLoader";
import CustomCursor from "@/components/common/CustomCursor";

export default function AdminLayout() {
  const navigate = useNavigate();
  return (
    <div className="flex min-h-screen bg-[#0B0B0B] text-white">
      <ScrollToTop />
      <CustomCursor />
      <PageTransitionLoader />
      {/* Sidebar */}
      <aside className="w-64 border-r border-white/10 bg-[#111111] p-6 flex flex-col">
        <Link to="/" className="font-serif text-2xl tracking-widest text-white mb-10 block">
          SOUL<span className="text-[#C58A5C]">.</span>
        </Link>
        <nav className="flex-1 space-y-4">
          <Link to="/admin" className="flex items-center gap-3 text-white/70 hover:text-white transition">
            <LayoutDashboard size={20} /> Dashboard
          </Link>
          <Link to="/admin/products" className="flex items-center gap-3 text-white/70 hover:text-white transition">
            <ShoppingBag size={20} /> Products
          </Link>
          <Link to="/admin/orders" className="flex items-center gap-3 text-white/70 hover:text-white transition">
            <Users size={20} /> Orders
          </Link>
        </nav>
        <button onClick={() => navigate("/")} className="mt-auto flex items-center gap-3 text-red-400 hover:text-red-300 transition">
          <LogOut size={20} /> Exit Admin
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto p-10">
        <Outlet />
      </main>
    </div>
  );
}
