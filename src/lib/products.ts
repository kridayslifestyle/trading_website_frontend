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

export const PRODUCT_CATEGORIES = [
  "Agriculture",
  "Rice",
  "Spices",
  "Pulses",
  "Textiles",
  "Cotton",
  "Pharmaceuticals",
  "Chemicals",
  "Industrial Machinery",
  "Construction Materials",
  "Furniture",
  "Electrical",
  "Packaging",
  "Plastic",
  "Other",
];