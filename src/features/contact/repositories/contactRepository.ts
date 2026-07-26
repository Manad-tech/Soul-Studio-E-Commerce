// import { apiClient } from "@/api/client";
import type { ApiResponse } from "@/api/types";
import type { ContactFormPayload } from "../types";

export const ContactRepository = {
  /**
   * Endpoint: POST /contact
   * Expected Payload: ContactFormPayload
   * Expected Response: ApiResponse<boolean>
   */
  submitContactForm: async (payload: ContactFormPayload): Promise<ApiResponse<boolean>> => {
    // ACTUAL IMPLEMENTATION:
    // const { data } = await apiClient.post<ApiResponse<boolean>>('/contact', payload);
    // return data;

    // MOCK IMPLEMENTATION:
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    return !!payload && {
      success: true,
      data: true,
      message: "Message sent successfully"
    };
  }
};
