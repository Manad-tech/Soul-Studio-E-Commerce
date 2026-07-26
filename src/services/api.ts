import { productStorage } from "@/utils/productStorage";
import type { Product } from "@/types/product";

// This file acts as a mock API service.
// The backend developer can easily swap these mock functions with real Axios/fetch calls.

export const api = {
  products: {
    getAll: async (): Promise<Product[]> => {
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 500));
      return productStorage.getProducts();
    },
    getById: async (id: string): Promise<Product | undefined> => {
      await new Promise(resolve => setTimeout(resolve, 500));
      return productStorage.getProducts().find(p => p.id === id);
    },
    // Admin functions
    create: async (data: Partial<Product>): Promise<Product> => {
      await new Promise(resolve => setTimeout(resolve, 800));
      const newProduct = { ...data, id: Date.now().toString() } as Product;
      productStorage.createProduct(newProduct);
      return newProduct;
    },
    update: async (id: string, data: Partial<Product>): Promise<Product> => {
      await new Promise(resolve => setTimeout(resolve, 800));
      const current = productStorage.getProducts().find(p => p.id === id);
      if (!current) throw new Error("Product not found");
      const updated = { ...current, ...data } as Product;
      productStorage.updateProduct(updated);
      return updated;
    },
    delete: async (id: string): Promise<boolean> => {
      await new Promise(resolve => setTimeout(resolve, 500));
      productStorage.deleteProduct(id);
      return true;
    }
  },
  auth: {
    login: async (credentials: any) => {
      await new Promise(resolve => setTimeout(resolve, 800));
      return { token: "mock_token_123", user: { id: "1", name: "Admin User", email: credentials.email } };
    },
    register: async (data: any) => {
      await new Promise(resolve => setTimeout(resolve, 800));
      return { token: "mock_token_123", user: { id: "1", name: data.name, email: data.email } };
    }
  },
  orders: {
    getAll: async () => {
      await new Promise(resolve => setTimeout(resolve, 500));
      return [
        { id: "ORD-1234", customer: "John Doe", total: 18500, status: "Processing", date: "2026-07-18" },
        { id: "ORD-1235", customer: "Jane Smith", total: 7800, status: "Shipped", date: "2026-07-17" }
      ];
    }
  }
};
