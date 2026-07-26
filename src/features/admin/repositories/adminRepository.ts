// import { apiClient } from "@/api/client";
import type { ApiResponse } from "@/api/types";
import type { AdminStats } from "../types";

export const AdminRepository = {
  /**
   * Endpoint: GET /admin/stats
   * Expected Response: ApiResponse<AdminStats>
   */
  getDashboardStats: async (): Promise<ApiResponse<AdminStats>> => {
    // ACTUAL IMPLEMENTATION:
    // const { data } = await apiClient.get<ApiResponse<AdminStats>>('/admin/stats');
    // return data;

    // MOCK IMPLEMENTATION:
    await new Promise(resolve => setTimeout(resolve, 800));
    
    return {
      success: true,
      data: {
        totalProducts: 142,
        totalOrders: 38,
        totalRevenue: 285400
      }
    };
  }
};
