export interface Product {
  id: number;

  name: string;

  slug: string;

  category: string;

  origin_country: string | null;

  short_description: string | null;

  description: string | null;

  moq: string | null;

  unit: string | null;

  price: number | null;

  currency: string;

  featured: boolean;

  published: boolean;

  image: string | null;

  created_at: string;

  updated_at: string;
}

export interface ProductFormData {
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
}