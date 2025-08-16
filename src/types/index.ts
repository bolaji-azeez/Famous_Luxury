import { ReactNode } from "react";

// Core data types for the e-commerce platform
export interface Product {
  id: string
  name: string
  description: string
  price: number
  originalPrice?: number
  images: string[]
  category: "watches" | "glasses"
  subcategory: string
  brand: string
  isNew?: boolean
  isBestSeller?: boolean
  rating: number
  reviewCount: number
  inStock: boolean
  tags: string[]
  specifications: Record<string, string>
}

export interface Category {
  id: string
  name: string
  slug: string
  image: string
  description: string
  productCount: number
  parentCategory?: "watches" | "glasses"
}

export interface Collection {
  id: string
  name: string
  description: string
  image: string
  products: Product[]
  slug: string
}

export interface Review {
  id: string
  productId: string
  customerName: string
  customerImage?: string
  rating: number
  comment: string
  date: string
  verified: boolean
}

export interface HeroSlide {
  id: string
  title: string
  subtitle: string
  description: string
  image: string
  cta: {
    text: string
    link: string
  }
  category: "watches" | "glasses"
}

export interface ApiResponse<T> {
  data: T
  success: boolean
  message?: string
  pagination?: {
    page: number
    limit: number
    total: number
    totalPages: number
  }
}

export interface SlideData {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  alt: string;
}

export interface Cases {
  id: number;
  name: string;
  description: string;
  image: string;
  link: string;
}

export interface Product2 {
  id: number
  name: string
  description: string
  price: number
  image: string
  hoverImage: string
  isNew?: boolean
}



export interface NavItem {
  name: string;
  path?: string;
  action?: () => void;
  icon?: ReactNode;
  dropdown?: boolean;
  dropdownItems?: { name: string; path: string }[];
}


export interface Watch {
  id: string;
  name: string;
  initialImage: string;
  hoverImage: string;
  amount: number;
  description: string;
}

export interface CartItem {
  id: string;
  title: string;
  price: number;
  quantity: number;
  image?: string;
}

export  interface ProductCardProps {
  product: {
    id: number;
    title: string;
    price: number;
    oldPrice?: number;
    image: string;
    hoverImage?: string;
  };
}

export interface Brand {
  _id: string;
  name: string;
  productsCount?: number;
  status?: "active" | "inactive";
}


export interface BrandState {
  items: [];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
  page: number;
  totalPages: number;
}









      