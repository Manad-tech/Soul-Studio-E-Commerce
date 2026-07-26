import { useMemo, useState, useEffect } from "react";
import { productStorage } from "@/utils/productStorage";

export type SortOption =
  | "featured"
  | "price-low"
  | "price-high"
  | "rating";

export function useShop() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [sort, setSort] = useState<SortOption>("featured");
  const [maxPrice, setMaxPrice] = useState(50000);
  const [rating, setRating] = useState(0);
  const [availability, setAvailability] = useState<"all" | "stock" | "out">("all");
  
  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  const [allProducts, setAllProducts] = useState(() => productStorage.getProducts());

  useEffect(() => {
    const handleUpdate = () => {
      setAllProducts(productStorage.getProducts());
    };
    window.addEventListener("products-updated", handleUpdate);
    return () => window.removeEventListener("products-updated", handleUpdate);
  }, []);

  // Reset to page 1 whenever any filter changes
  useEffect(() => {
    setCurrentPage(1);
  }, [search, category, maxPrice, rating, availability]);

  const filteredProducts = useMemo(() => {
    let data = [...allProducts];

    // Search
    if (search.trim()) {
      data = data.filter((item) =>
        item.name
          .toLowerCase()
          .includes(search.toLowerCase())
      );
    }

    // Category & Subcategory Filter
    if (category !== "all") {
      const target = category.toLowerCase().trim();
      data = data.filter((item) => {
        const cat = item.category.toLowerCase().trim();
        const subcat = (item.subcategory || "").toLowerCase().trim();

        if (target === "workshops") {
          return cat.includes("workshop");
        }
        if (target.includes("snail mail")) {
          return cat.includes("snail mail");
        }
        if (target === "portfolio") {
          return cat.includes("portfolio");
        }
        if (target.includes("art kits") || target.includes("art materials")) {
          return cat.includes("art kit") || cat.includes("art material") || subcat.includes("art kit") || subcat.includes("art material");
        }
        if (target === "painting" || target === "paintings") {
          return cat.includes("painting");
        }
        if (target === "sculpture" || target === "sculptures") {
          return cat.includes("sculpture");
        }
        if (target === "ceramic" || target === "ceramics") {
          return cat.includes("ceramic");
        }
        if (target === "resin art") {
          return cat.includes("resin");
        }
        if (target === "printmaking") {
          return cat.includes("printmaking") || subcat.includes("printmaking");
        }
        if (target === "prints") {
          return cat === "prints" || subcat === "prints" || (cat.includes("print") && !cat.includes("printmaking"));
        }
        if (target === "art books") {
          return cat.includes("book") || subcat.includes("book");
        }
        if (target === "others") {
          const othersList = [
            "others", "post cards", "stickers", "book marks", "calendars", 
            "hand painted", "home decor", "wearable art", "rakhis", "candles", "festive combos"
          ];
          return cat === "others" || othersList.some(o => subcat.includes(o) || cat.includes(o));
        }

        return cat === target || subcat === target || cat.includes(target) || subcat.includes(target);
      });
    }

    // Price
    data = data.filter(
      (item) => item.price <= maxPrice
    );

    // Rating
    if (rating > 0) {
      data = data.filter(
        (item) => item.rating >= rating
      );
    }

    // Stock
    if (availability === "stock") {
      data = data.filter(
        (item) => item.inStock
      );
    }

    if (availability === "out") {
      data = data.filter(
        (item) => !item.inStock
      );
    }

    // Sorting
    switch (sort) {
      case "price-low":
        data.sort(
          (a, b) => a.price - b.price
        );
        break;

      case "price-high":
        data.sort(
          (a, b) => b.price - a.price
        );
        break;

      case "rating":
        data.sort(
          (a, b) => b.rating - a.rating
        );
        break;

      default:
        data.sort((a, b) => {
          if (
            a.featured &&
            !b.featured
          )
            return -1;

          if (
            !a.featured &&
            b.featured
          )
            return 1;

          return 0;
        });
    }

    return data;
  }, [
    allProducts,
    search,
    category,
    sort,
    maxPrice,
    rating,
    availability,
  ]);

  // Calculate Sliced Products for Page
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  
  const paginatedProducts = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return filteredProducts.slice(startIndex, endIndex);
  }, [filteredProducts, currentPage, itemsPerPage]);

  return {
    search,
    setSearch,
    category,
    setCategory,
    sort,
    setSort,
    maxPrice,
    setMaxPrice,
    rating,
    setRating,
    availability,
    setAvailability,
    products: paginatedProducts,
    allFilteredProducts: filteredProducts,
    totalProductsCount: filteredProducts.length,
    currentPage,
    totalPages,
    setCurrentPage
  };
}