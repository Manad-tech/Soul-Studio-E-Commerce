import type { AxiosInstance, AxiosError, InternalAxiosRequestConfig } from "axios";
import { toast } from "sonner";

export function setupInterceptors(apiClient: AxiosInstance) {
  // Request Interceptor
  apiClient.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
      // TODO: Backend Integration
      // Get token from secure storage (e.g., Zustand state or localStorage)
      const token = localStorage.getItem("auth_token");
      if (token && config.headers) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error: AxiosError) => {
      return Promise.reject(error);
    }
  );

  // Response Interceptor
  apiClient.interceptors.response.use(
    (response) => {
      // Pass through successful responses
      return response;
    },
    (error: AxiosError) => {
      // Global error handling
      if (error.response) {
        const { status, data } = error.response;
        
        // Handle specific status codes
        if (status === 401) {
          toast.error("Session expired. Please log in again.");
          // TODO: Dispatch logout action and redirect
        } else if (status === 403) {
          toast.error("You do not have permission to perform this action.");
        } else if (status >= 500) {
          toast.error("A server error occurred. Please try again later.");
        } else {
          // General validation or bad request errors
          const apiError = data as { error?: string, message?: string };
          toast.error(apiError?.message || apiError?.error || "An error occurred");
        }
      } else if (error.request) {
        toast.error("Network error. Please check your connection.");
      }
      
      return Promise.reject(error);
    }
  );
}
