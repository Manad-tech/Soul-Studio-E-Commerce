export interface SearchResult {
  id: string;
  type: "product" | "portfolio" | "page";
  title: string;
  subtitle?: string;
  url: string;
  image?: string;
}

export interface SearchSuggestion {
  text: string;
  type: "recent" | "trending" | "category";
}
