import { useState, useEffect } from "react";
import { SearchRepository } from "../repositories/searchRepository";
import type { SearchResult, SearchSuggestion } from "../types";

export function useSearch(query: string) {
  const [results, setResults] = useState<SearchResult[]>([]);
  const [suggestions, setSuggestions] = useState<SearchSuggestion[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // Fetch suggestions on mount
  useEffect(() => {
    SearchRepository.getSuggestions().then(res => {
      if (res.success) setSuggestions(res.data);
    });
  }, []);

  // Debounced Search
  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }

    const delay = setTimeout(async () => {
      setIsLoading(true);
      try {
        const res = await SearchRepository.performSearch(query);
        if (res.success) setResults(res.data);
      } catch (e) {
        console.error("Search failed", e);
      } finally {
        setIsLoading(false);
      }
    }, 400); // 400ms debounce

    return () => clearTimeout(delay);
  }, [query]);

  return {
    results,
    suggestions,
    isLoading
  };
}
