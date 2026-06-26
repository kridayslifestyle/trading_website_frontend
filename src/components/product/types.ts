export interface Product {
  id: number;
  name: string;
  slug: string;

  category: string;

  origin_country: string;

  short_description: string;

  description: string;

  moq: string;

  unit: string;

  price: number;

  currency: string;

  featured: boolean;

  published: boolean;

  image: string;

  created_at: string;

  updated_at: string;
}