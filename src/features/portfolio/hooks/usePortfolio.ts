import { useQuery } from "@tanstack/react-query";
import { PortfolioRepository } from "../repositories/portfolioRepository";

export function usePortfolio(category?: string) {
  return useQuery({
    queryKey: ["portfolio", category],
    queryFn: () => PortfolioRepository.getAll(category),
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
}

export function usePortfolioDetail(slug: string) {
  return useQuery({
    queryKey: ["portfolio", "detail", slug],
    queryFn: () => PortfolioRepository.getBySlug(slug),
    enabled: !!slug,
  });
}
