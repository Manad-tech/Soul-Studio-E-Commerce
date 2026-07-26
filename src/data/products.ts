import type { Product } from "@/types/product";

import p1 from "@/assets/images/products/product-1.jpg";
import p2 from "@/assets/images/products/product-2.jpg";
import p3 from "@/assets/images/products/product-3.jpg";
import p4 from "@/assets/images/products/product-4.jpg";
import p5 from "@/assets/images/products/product-5.jpg";
import p6 from "@/assets/images/products/product-6.jpg";
import p7 from "@/assets/images/products/product-7.jpg";
import p8 from "@/assets/images/products/product-8.jpg";

const makeProduct = (
  id: string, name: string, slug: string, category: string, image: string, gallery: string[],
  price: number, originalPrice: number | undefined, featured: boolean, bestseller: boolean,
  inStock: boolean, stock: number, rating: number, reviews: number, subcategory?: string
): Product => ({
  id, name, slug, category, subcategory, image,
  images: gallery.length > 0 ? gallery : [image],
  shortDescription: `Handcrafted ${subcategory || category} by Soul Studio.`,
  description: `${name} is an authentic ${subcategory || category} created using artisanal techniques by Dr. Sheetal Chaudhary for art lovers and collectors.`,
  artist: "Dr. Sheetal Chaudhary",
  medium: category === "Painting" ? "Acrylic on Canvas" : category === "Sculpture" ? "Bronze / Terracotta Composite" : category === "Ceramic" ? "Raku-Fired Ceramic" : category === "Printmaking" ? "Woodcut / Linocut" : "Artisanal Studio Craft",
  dimensions: '12" × 16"',
  year: 2025,
  price,
  originalPrice,
  featured,
  bestseller,
  inStock,
  stock,
  rating,
  reviews,
  specifications: [
    { label: "Edition", value: "Limited / Handmade" },
    { label: "Craftsmanship", value: "Handcrafted in Udaipur" },
    { label: "Certificate", value: "Included" },
    { label: "Shipping", value: "Insured Pan-India" },
  ],
  features: ["Handmade", "Certificate Included", "Gift Packaging", "Worldwide Shipping"],
  reviewList: [
    { id: `${id}-1`, name: "Aarav Sharma", rating: 5, comment: "Exceptional artistic quality and presentation.", date: "12 June 2026" },
    { id: `${id}-2`, name: "Neha Verma", rating: 5, comment: "Beautifully created, authentic Soul Studio piece.", date: "20 June 2026" },
  ],
});

export const products: Product[] = [
  makeProduct("1", "Golden Horizon", "golden-horizon", "Painting", p1, [p1, p2, p3, p4], 18500, 22000, true, true, true, 8, 4.9, 42),
  makeProduct("2", "Silent Form", "silent-form", "Sculpture", p2, [p2, p6, p1, p4], 26500, undefined, true, false, true, 5, 4.8, 27),
  makeProduct("3", "Clay Essence", "clay-essence", "Ceramic", p3, [p3, p7, p1, p5], 7800, 9200, false, true, true, 12, 4.7, 15),
  makeProduct("4", "Ocean Resin", "ocean-resin", "Resin Art", p4, [p4, p8, p2, p1], 11800, 13500, true, false, true, 7, 4.9, 18),
  makeProduct("5", "Golden Canvas", "golden-canvas", "Painting", p5, [p5, p1, p2, p3], 24000, 28000, false, true, true, 6, 5.0, 61),
  makeProduct("6", "Stone Silence", "stone-silence", "Sculpture", p6, [p6, p2, p5, p1], 32000, 36000, true, true, false, 0, 4.8, 21),
  makeProduct("7", "Earth Pottery", "earth-pottery", "Ceramic", p7, [p7, p3, p5, p1], 9600, 11000, false, false, true, 9, 4.6, 11),
  makeProduct("8", "Luxury Resin", "luxury-resin", "Resin Art", p8, [p8, p4, p2, p6], 13200, 15000, true, false, true, 10, 4.9, 34),
  
  makeProduct("9", "Ethereal Whispers", "ethereal-whispers", "Painting", "https://images.unsplash.com/photo-1579783902614-a3fb3927b675?w=800&q=80", [], 19200, 24000, false, false, true, 4, 4.8, 12),
  makeProduct("10", "Enigma Canvas", "enigma-canvas", "Painting", "https://images.unsplash.com/photo-1541701494587-cb58502866ab?w=800&q=80", [], 21000, undefined, true, true, true, 3, 4.7, 9),
  makeProduct("11", "Curved Serenity", "curved-serenity", "Sculpture", "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=800&q=80", [], 29000, 31000, false, false, true, 5, 4.9, 14),
  makeProduct("12", "Obsidian Core", "obsidian-core", "Sculpture", "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80", [], 34000, undefined, false, true, true, 2, 5.0, 8),
  makeProduct("13", "Alabaster Vase", "alabaster-vase", "Ceramic", "https://images.unsplash.com/photo-1612196808214-b8e1d6145a8c?w=800&q=80", [], 8900, 10500, true, false, true, 11, 4.5, 23),
  makeProduct("14", "Rustic Bowl", "rustic-bowl", "Ceramic", "https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?w=800&q=80", [], 6500, undefined, false, false, true, 15, 4.6, 17),
  makeProduct("15", "Amber Ripple", "amber-ripple", "Resin Art", "https://images.unsplash.com/photo-1507608869274-d3177c8bb4c7?w=800&q=80", [], 14500, 16000, false, false, true, 8, 4.8, 19),
  makeProduct("16", "Liquid Nebula", "liquid-nebula", "Resin Art", "https://images.unsplash.com/photo-1541701494587-cb58502866ab?w=800&q=80", [], 15500, 18000, true, false, false, 0, 4.9, 29),

  // Art Kits / Art Materials
  makeProduct("17", "DIY Linocut Printmaking Kit", "diy-linocut-kit", "Art Kits / Art Materials", "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?w=800&q=80", [], 2200, 2500, false, true, true, 15, 4.9, 12, "Art Kits"),
  makeProduct("18", "Handmade Cotton Rag Paper Pack", "cotton-rag-papers", "Art Kits / Art Materials", "https://images.unsplash.com/photo-1586075010923-2dd4570fb338?w=800&q=80", [], 850, 1000, false, false, true, 50, 4.8, 31, "Art Materials"),

  // Printmaking & Prints
  makeProduct("19", "Aravalli Sunrise Linocut Print", "aravalli-sunrise-print", "Printmaking", "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?w=800&q=80", [], 3800, 4500, true, true, true, 10, 4.9, 16),
  makeProduct("20", "Udaipur Heritage Fine Art Print", "udaipur-heritage-print", "Prints", "https://images.unsplash.com/photo-1579783902614-a3fb3927b675?w=800&q=80", [], 2900, 3400, false, false, true, 20, 4.8, 22),

  // Art Books
  makeProduct("21", "Un Arte Ventura Retrospective Art Book", "un-arte-ventura-art-book", "Art Books", "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=800&q=80", [], 1850, 2200, true, false, true, 25, 5.0, 14),

  // Others & Subcategories
  makeProduct("22", "Soul Studio Collector Postcards (Set of 10)", "soul-studio-postcards", "Others", "https://images.unsplash.com/photo-1586075010923-2dd4570fb338?w=800&q=80", [], 450, 600, false, true, true, 40, 4.9, 29, "Post cards"),
  makeProduct("23", "Handpainted Botanical Vinyl Stickers", "botanical-stickers", "Others", "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&q=80", [], 250, 350, false, false, true, 60, 4.8, 35, "Stickers"),
  makeProduct("24", "Hand-Painted Leather & Brass Bookmark", "painted-leather-bookmark", "Others", "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=800&q=80", [], 350, 450, false, true, true, 50, 5.0, 41, "Book marks"),
  makeProduct("25", "2026 Art & Soul Desk Calendar", "2026-art-calendar", "Others", "https://images.unsplash.com/photo-1506784983877-45594efa4cbe?w=800&q=80", [], 750, 950, true, false, true, 30, 4.9, 19, "Calendars"),
  makeProduct("26", "Hand Painted Terracotta Wall Decor Plate", "terracotta-decor-plate", "Others", "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=800&q=80", [], 1650, 2000, true, false, true, 12, 4.8, 15, "Hand painted products / Home decor / wearable art"),
  makeProduct("27", "Handcrafted Ceramic & Silk Thread Rakhi", "ceramic-silk-rakhi", "Others", "https://images.unsplash.com/photo-1628744448840-55bdb2497bd4?w=800&q=80", [], 490, 650, false, true, true, 80, 5.0, 52, "Rakhis"),
  makeProduct("28", "Sculpted Terracotta Scented Soy Candle", "terracotta-scented-candle", "Others", "https://images.unsplash.com/photo-1603006905003-be475563bc59?w=800&q=80", [], 890, 1100, true, false, true, 35, 4.9, 27, "Candles"),
  makeProduct("29", "Festive Celebrations Art Gift Box", "festive-art-gift-box", "Others", "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=800&q=80", [], 2450, 3000, true, true, true, 15, 5.0, 38, "Festive Combos"),

  // Workshops
  makeProduct("30", "Clay & Pottery Weekend Masterclass", "clay-pottery-workshop", "Workshops", "https://images.unsplash.com/photo-1565192647048-f997ed8799d4?w=800&q=80", [], 3500, 4500, true, false, true, 20, 5.0, 18),
  makeProduct("31", "Linocut Printmaking Masterclass Workshop", "linocut-workshop", "Workshops", "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?w=800&q=80", [], 4200, 5000, false, true, true, 15, 4.9, 24),

  // Monthly Snail Mail Club
  makeProduct("32", "Monthly Snail Mail Club Subscription", "snail-mail-subscription", "Monthly Snail Mail Club", "https://images.unsplash.com/photo-1596464716127-f2a82984de30?w=800&q=80", [], 1000, undefined, true, false, true, 999, 5.0, 8),

  // Portfolio
  makeProduct("33", "Selected Archival Art Portfolio", "archival-portfolio", "Portfolio", "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?w=800&q=80", [], 12500, 15000, true, true, true, 5, 5.0, 10),
];
