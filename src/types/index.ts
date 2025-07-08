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
