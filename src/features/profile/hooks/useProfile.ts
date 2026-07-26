import { useQuery } from "@tanstack/react-query";
import { ProfileRepository } from "../repositories/profileRepository";

export function useProfile() {
  return useQuery({
    queryKey: ["profile"],
    queryFn: () => ProfileRepository.getProfile(),
    staleTime: 1000 * 60 * 5, // 5 minutes
    retry: false, // Don't retry if unauthorized
  });
}
