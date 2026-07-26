// import { apiClient } from "@/api/client";
import type { ApiResponse } from "@/api/types";
import type { SearchResult, SearchSuggestion } from "../types";

export const SearchRepository = {
  /**
   * Endpoint: GET /search/suggestions
   * Expected Response: ApiResponse<SearchSuggestion[]>
   */
  getSuggestions: async (): Promise<ApiResponse<SearchSuggestion[]>> => {
    await new Promise(resolve => setTimeout(resolve, 300));
    return {
      success: true,
      data: [
        { text: "Minimalist Vases", type: "trending" },
        { text: "Modern Art", type: "trending" },
        { text: "Lounge Chairs", type: "trending" },
        { text: "Ceramics", type: "recent" },
      ]
    };
  },

  /**
   * Endpoint: GET /search?q={query}
   * Expected Response: ApiResponse<SearchResult[]>
   */
  performSearch: async (query: string): Promise<ApiResponse<SearchResult[]>> => {
    await new Promise(resolve => setTimeout(resolve, 600));
    
    if (!query) return { success: true, data: [] };

    // Simulated search results across modules
    return {
      success: true,
      data: [
        {
          id: "res-1",
          type: "product",
          title: "Abstract Bronze Sculpture",
          subtitle: "Sculpture • ₹ 8,500",
          url: "/product/abstract-bronze-sculpture",
          image: "https://images.unsplash.com/photo-1544531586-fde5298cdd40?w=800&q=80"
        } as SearchResult,
        {
          id: "res-2",
          type: "portfolio" as const,
          title: "Modern Minimalism",
          subtitle: "Project • Residential",
          url: "/portfolio/serenity-villa",
          image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80"
        } as SearchResult
      ].filter(item => item.title.toLowerCase().includes(query.toLowerCase()))
    };
  }
};
