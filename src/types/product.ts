export interface Product {
  id: number;

  name: string;
  slug: string;

  category: string;
  origin_country: string;

  price: string;
  currency: string;

  moq: string;
  unit: string;

  image: string;

  short_description: string;
  description: string;

  featured: boolean;
  published: boolean;

  created_at: string;
  updated_at: string;
}