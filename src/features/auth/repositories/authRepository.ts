// import { apiClient } from "@/api/client";
import type { ApiResponse } from "@/api/types";
import type { AuthResponse, LoginPayload, RegisterPayload } from "../types";

// ----------------------------------------------------------
// BACKEND INTEGRATION
// Replace the mock implementations with actual Axios calls 
// once the backend endpoints are ready.
// ----------------------------------------------------------

export const AuthRepository = {
  /**
   * Endpoint: POST /auth/login
   * Expected Payload: LoginPayload
   * Expected Response: ApiResponse<AuthResponse>
   */
  login: async (payload: LoginPayload): Promise<ApiResponse<AuthResponse>> => {
    // ACTUAL IMPLEMENTATION:
    // const { data } = await apiClient.post<ApiResponse<AuthResponse>>('/auth/login', payload);
    // return data;

    // MOCK IMPLEMENTATION:
    await new Promise(resolve => setTimeout(resolve, 800));

    return {
      success: true,
      data: {
        token: "mock_jwt_token_123",
        user: {
          id: "u1",
          name: "Admin User",
          email: payload.email,
          role: "admin"
        }
      }
    };
  },

  /**
   * Endpoint: POST /auth/register
   * Expected Payload: RegisterPayload
   * Expected Response: ApiResponse<AuthResponse>
   */
  register: async (payload: RegisterPayload): Promise<ApiResponse<AuthResponse>> => {
    // ACTUAL IMPLEMENTATION:
    // const { data } = await apiClient.post<ApiResponse<AuthResponse>>('/auth/register', payload);
    // return data;

    // MOCK IMPLEMENTATION:
    await new Promise(resolve => setTimeout(resolve, 800));
    
    return {
      success: true,
      data: {
        token: "mock_jwt_token_123",
        user: {
          id: Date.now().toString(),
          name: payload.name,
          email: payload.email,
          role: "customer"
        }
      }
    };
  }
};
