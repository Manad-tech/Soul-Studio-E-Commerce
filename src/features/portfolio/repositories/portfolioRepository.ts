import type { PortfolioItem, PortfolioDetail } from "../types";
import type { PaginatedResponse, ApiResponse } from "@/api/types";

const MOCK_PORTFOLIO: PortfolioItem[] = [
  {
    id: "p1",
    slug: "whispers-of-udaipur",
    title: "Whispers of Udaipur",
    category: "Paintings",
    coverImage: "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?auto=format&fit=crop&w=800&q=80",
    client: "Udaipur Heritage Palace",
    year: 2024
  },
  {
    id: "p2",
    slug: "linocut-shadows",
    title: "Linocut Shadows",
    category: "Printmaking",
    coverImage: "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=800&q=80",
    client: "Modern Graphic Arts Council",
    year: 2025
  },
  {
    id: "p3",
    slug: "silent-monolith",
    title: "Silent Monolith",
    category: "Sculpture",
    coverImage: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=800&q=80",
    client: "Aranya Luxury Resorts",
    year: 2024
  },
  {
    id: "p4",
    slug: "terracotta-vessel",
    title: "Terracotta Vessel",
    category: "Ceramics",
    coverImage: "https://images.unsplash.com/photo-1612196808214-b8e1d6145a8c?auto=format&fit=crop&w=800&q=80",
    client: "Clay & Fire Exhibition Group",
    year: 2025
  },
  {
    id: "p5",
    slug: "liquid-nebula-resin",
    title: "Liquid Nebula Art",
    category: "Resin Art",
    coverImage: "https://images.unsplash.com/photo-1541701494587-cb58502866ab?auto=format&fit=crop&w=800&q=80",
    client: "Metropolitan Design Collective",
    year: 2026
  },
  {
    id: "p6",
    slug: "vintage-letterpress",
    title: "Vintage Letterpress Prints",
    category: "Prints",
    coverImage: "https://images.unsplash.com/photo-1578301978693-85fa9c0320b9?auto=format&fit=crop&w=800&q=80",
    client: "Artisan Prints Inc.",
    year: 2023
  },
  {
    id: "p7",
    slug: "un-arte-ventura-book",
    title: "Un Arte Ventura Anthology",
    category: "Art Books",
    coverImage: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&w=800&q=80",
    client: "Soul Studio Press",
    year: 2025
  },
  {
    id: "p8",
    slug: "hand-painted-keepsakes",
    title: "Handpainted Keepsakes & Rakhis",
    category: "Others",
    coverImage: "https://images.unsplash.com/photo-1596464716127-f2a82984de30?auto=format&fit=crop&w=800&q=80",
    client: "Private Collector Ensemble",
    year: 2025
  }
];

export const PortfolioRepository = {
  getAll: async (category?: string): Promise<PaginatedResponse<PortfolioItem[]>> => {
    await new Promise(resolve => setTimeout(resolve, 300));
    
    const filtered = category && category !== 'All' 
      ? MOCK_PORTFOLIO.filter(p => p.category.toLowerCase() === category.toLowerCase())
      : MOCK_PORTFOLIO;
      
    return {
      success: true,
      data: filtered,
      meta: { page: 1, limit: 10, total: filtered.length, totalPages: 1 }
    };
  },

  getBySlug: async (slug: string): Promise<ApiResponse<PortfolioDetail>> => {
    await new Promise(resolve => setTimeout(resolve, 300));
    const item = MOCK_PORTFOLIO.find(p => p.slug === slug);
    if (!item) throw new Error("Not found");

    // Populate multiple high-quality gallery images for the Lightbox component
    const defaultGallery = [
      item.coverImage,
      "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?auto=format&fit=crop&w=800&q=80"
    ];

    return {
      success: true,
      data: {
        ...item,
        projectStory: `This masterwork captures the core design values of Soul Studio. Handcrafted by Dr. Sheetal Chaudhary in our Udaipur studio, it represents a deep study of raw materials, light interactions, and structural balance, transforming negative space into a physical sanctuary.`,
        clientStory: `Soul Studio has completely elevated our collection. This creation does not just occupy wall space; it defines the visual identity of our entire residential interior and evokes deep emotions.`,
        gallery: defaultGallery,
        relatedProjects: MOCK_PORTFOLIO.filter(p => p.id !== item.id).slice(0, 3)
      }
    };
  }
};
