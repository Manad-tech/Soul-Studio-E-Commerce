import { products as initialProducts } from "@/data/products";
import type { Product } from "@/types/product";

const STORAGE_KEY = "soul_studio_products";

export const productStorage = {
  getProducts: (): Product[] => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(initialProducts));
      return initialProducts;
    }
    
    // Auto-merge & sync logic to update category, subcategory & images from initialProducts
    const parsed = JSON.parse(stored) as Product[];
    const initialMap = new Map(initialProducts.map(p => [p.id, p]));
    const synced = parsed.map(item => {
      const init = initialMap.get(item.id);
      if (init) {
        return {
          ...item,
          name: init.name,
          slug: init.slug,
          description: init.description,
          shortDescription: init.shortDescription,
          category: init.category,
          subcategory: init.subcategory || item.subcategory,
          image: item.image || init.image,
          images: item.images && item.images.length > 0 ? item.images : init.images,
        };
      }
      return item;
    });

    const parsedIds = new Set(parsed.map(p => p.id));
    const missing = initialProducts.filter(p => !parsedIds.has(p.id));
    const finalProducts = [...synced, ...missing];
    
    if (missing.length > 0 || JSON.stringify(finalProducts) !== JSON.stringify(parsed)) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(finalProducts));
      return finalProducts;
    }
    
    return parsed;
  },
  
  saveProducts: (products: Product[]): void => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
    // Dispatch custom event to notify components that products changed
    window.dispatchEvent(new Event("products-updated"));
  },

  getProductBySlug: (slug: string): Product | undefined => {
    const products = productStorage.getProducts();
    return products.find(p => p.slug === slug);
  },

  createProduct: (product: Product): void => {
    const products = productStorage.getProducts();
    products.push(product);
    productStorage.saveProducts(products);
  },

  updateProduct: (updated: Product): void => {
    const products = productStorage.getProducts();
    const index = products.findIndex(p => p.id === updated.id);
    if (index !== -1) {
      products[index] = updated;
      productStorage.saveProducts(products);
    }
  },

  deleteProduct: (id: string): void => {
    const products = productStorage.getProducts();
    const filtered = products.filter(p => p.id !== id);
    productStorage.saveProducts(filtered);
  }
};
