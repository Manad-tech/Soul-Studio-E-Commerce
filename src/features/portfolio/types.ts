export interface PortfolioItem {
  id: string;
  slug: string;
  title: string;
  category: string;
  coverImage: string;
  client: string;
  year: number;
}

export interface PortfolioDetail extends PortfolioItem {
  projectStory: string;
  clientStory: string;
  gallery: string[];
  beforeImage?: string;
  afterImage?: string;
  relatedProjects: PortfolioItem[];
}
