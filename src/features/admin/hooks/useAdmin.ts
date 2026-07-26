import { useQuery } from "@tanstack/react-query";
import { AdminRepository } from "../repositories/adminRepository";

export function useAdminStats() {
  return useQuery({
    queryKey: ["admin", "stats"],
    queryFn: () => AdminRepository.getDashboardStats(),
    staleTime: 1000 * 60, // 1 minute
  });
}
