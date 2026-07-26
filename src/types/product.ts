export interface ProductReview {
  id: string;
  name: string;
  rating: number;
  comment: string;
  date: string;
}

export interface ProductSpecification {
  label: string;
  value: string;
}

export interface Product {
  id: string;

  slug: string;

  name: string;
  category: string;
  subcategory?: string;

  image: string;
  images: string[];

  shortDescription: string;
  description: string;

  artist: string;
  medium: string;
  dimensions: string;
  year: number;

  price: number;
  originalPrice?: number;

  featured: boolean;
  bestseller: boolean;

  inStock: boolean;
  stock: number;

  rating: number;
  reviews: number;

  specifications: ProductSpecification[];

  features: string[];

  reviewList: ProductReview[];
}