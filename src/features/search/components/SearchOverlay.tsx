import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Search, X, Loader2, TrendingUp, History } from "lucide-react";
import { useSearchModal } from "@/context/SearchContext";
import { useSearch } from "@/features/search/hooks/useSearch";

export default function SearchOverlay() {
  const { isOpen, closeSearch } = useSearchModal();
  const [query, setQuery] = useState("");
  const { results, suggestions, isLoading } = useSearch(query);

  // Keyboard Shortcut: Cmd/Ctrl + K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        isOpen ? closeSearch() : window.dispatchEvent(new CustomEvent('open-search'));
      }
      if (e.key === "Escape" && isOpen) {
        closeSearch();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, closeSearch]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] flex flex-col bg-black/90 backdrop-blur-md"
      >
        <div className="flex items-center justify-between border-b border-white/10 px-8 py-6">
          <div className="flex w-full max-w-3xl items-center gap-4">
            <Search className="text-white/50" size={24} />
            <input
              autoFocus
              type="text"
              placeholder="Search products, collections, or projects..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full bg-transparent text-2xl text-white outline-none placeholder:text-white/30"
            />
            {isLoading && <Loader2 className="animate-spin text-[#C58A5C]" size={20} />}
          </div>
          <button onClick={closeSearch} className="text-white/50 transition hover:text-white">
            <X size={28} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-8 py-10">
          <div className="mx-auto max-w-3xl">
            {/* Suggestions View (when no query) */}
            {!query.trim() && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <div>
                  <h3 className="mb-4 text-sm font-semibold uppercase tracking-widest text-white/40 flex items-center gap-2">
                    <TrendingUp size={16} /> Trending
                  </h3>
                  <ul className="space-y-3">
                    {suggestions.filter(s => s.type === "trending").map((s, idx) => (
                      <li key={idx}>
                        <button onClick={() => setQuery(s.text)} className="text-lg text-white/70 hover:text-[#C58A5C] transition">
                          {s.text}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="mb-4 text-sm font-semibold uppercase tracking-widest text-white/40 flex items-center gap-2">
                    <History size={16} /> Recent
                  </h3>
                  <ul className="space-y-3">
                    {suggestions.filter(s => s.type === "recent").map((s, idx) => (
                      <li key={idx}>
                        <button onClick={() => setQuery(s.text)} className="text-lg text-white/70 hover:text-[#C58A5C] transition">
                          {s.text}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            {/* Search Results */}
            {query.trim() && results.length > 0 && (
              <div className="space-y-6">
                <h3 className="text-sm font-semibold uppercase tracking-widest text-white/40">Results</h3>
                {results.map((result) => (
                  <Link 
                    key={result.id} 
                    to={result.url}
                    onClick={closeSearch}
                    className="group flex items-center gap-6 rounded-xl p-4 transition hover:bg-white/5"
                  >
                    {result.image && (
                      <img src={result.image} alt={result.title} className="h-16 w-16 object-cover rounded-lg" />
                    )}
                    <div>
                      <h4 className="font-serif text-xl text-white group-hover:text-[#C58A5C] transition">
                        {result.title}
                      </h4>
                      {result.subtitle && <p className="text-sm text-white/50 mt-1">{result.subtitle}</p>}
                    </div>
                  </Link>
                ))}
              </div>
            )}

            {query.trim() && results.length === 0 && !isLoading && (
              <div className="text-center py-20">
                <p className="text-white/50 text-lg">No results found for "{query}"</p>
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
