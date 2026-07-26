// import { apiClient } from "@/api/client";
import type { ApiResponse } from "@/api/types";
import type { UserProfile } from "../types";

export const ProfileRepository = {
  /**
   * Endpoint: GET /profile
   * Expected Response: ApiResponse<UserProfile>
   */
  getProfile: async (): Promise<ApiResponse<UserProfile>> => {
    // ACTUAL IMPLEMENTATION:
    // const { data } = await apiClient.get<ApiResponse<UserProfile>>('/profile');
    // return data;

    // MOCK IMPLEMENTATION:
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // Simulating checking auth token
    const token = localStorage.getItem("auth_token");
    if (!token) throw new Error("Unauthorized");

    return {
      success: true,
      data: {
        id: "u1",
        name: "Jane Collector",
        email: "jane@example.com",
        phone: "+1 555-0198",
        addresses: [
          {
            id: "addr1",
            type: "Shipping",
            street: "123 Luxury Ave",
            city: "New York",
            zipCode: "10001",
            country: "USA"
          }
        ],
        orders: [
          {
            id: "ORD-9932",
            date: "2026-07-15",
            total: 12500,
            status: "Shipped",
            items: 2
          },
          {
            id: "ORD-8821",
            date: "2026-06-10",
            total: 4500,
            status: "Delivered",
            items: 1
          }
        ]
      }
    };
  }
};
