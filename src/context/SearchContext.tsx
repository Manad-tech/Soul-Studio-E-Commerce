import { createContext, useContext, useState, type ReactNode } from "react";

interface SearchContextType {
  isOpen: boolean;
  openSearch: () => void;
  closeSearch: () => void;
}

const SearchContext = createContext<SearchContextType | undefined>(undefined);

export function SearchProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <SearchContext.Provider value={{ isOpen, openSearch: () => setIsOpen(true), closeSearch: () => setIsOpen(false) }}>
      {children}
    </SearchContext.Provider>
  );
}

export function useSearchModal() {
  const context = useContext(SearchContext);
  if (!context) throw new Error("useSearchModal must be used within SearchProvider");
  return context;
}
