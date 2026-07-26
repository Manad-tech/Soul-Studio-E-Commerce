import { Outlet } from "react-router-dom";
import Navbar from "@/components/layout/Navbar/Navbar";
import Footer from "@/components/layout/Footer/Footer";
import { SearchProvider } from "@/context/SearchContext";
import SearchOverlay from "@/features/search/components/SearchOverlay";
import ScrollToTop from "@/components/common/ScrollToTop";
import PageTransitionLoader from "@/components/common/PageTransitionLoader";
import CustomCursor from "@/components/common/CustomCursor";

export default function MainLayout() {
  return (
    <SearchProvider>
      <ScrollToTop />
      <CustomCursor />
      <PageTransitionLoader />
      <div className="flex min-h-screen flex-col bg-var(--background) text-var(--body)">
        <Navbar />
        
        <main className="flex-1">
          <Outlet />
        </main>
        
        <Footer />
        <SearchOverlay />
      </div>
    </SearchProvider>
  );
}