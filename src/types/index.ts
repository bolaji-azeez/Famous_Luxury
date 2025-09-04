import { ReactNode } from "react";


export interface Product {
  _id: string
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




export interface BrandWithProductsResponse {
  brand: Brand;
  products: Product[];
}


export interface SignupCredentials {
  email: string;
  password: string;
  fullName?: string;
  phoneNumber?: number;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface UserAPIResponse {
  _id: string;
  fullName: string;
  email: string;
  phoneNumber?: number;
}

export interface AuthSuccessResponse {
  _id: string;
  fullName: string;
  email: string;
  token: string;
  phoneNumber?: number;
}

export interface APIError {
  message: string;
  statusCode?: number;
}



    export interface Order {
  _id: string;
  userId: {
    _id: string;
    fullName: string;
    email: string;
    items: Array<{
      productId: string;
      quantity: number;
      price: number;
      image: string;
      name: string;
      brand: string;
    }>;
  };
  totalQuantity: number;
  totalPrice: number;
  orderId: number;
  products: Array<{
    productId: string | null;
    price: number;
    quantity: number;
    _id: string;
  }>;
  createdAt: string;
  updatedAt: string;
  status: string;
  shippingAddress: {
    address: string;
    city: string;
    state: string;
    zipCode: string;
    street: string;
    country: string;
  };
  payment: {
    method: string;
    status: string;
  };
  paymentMethod: string;
  customer: {
    fullName: string;
    email: string;
    phone: string;
  };
  shipping: {
    method: string;
    cost: number;
    trackingNumber: string;
    carrier: string;
    estimatedDelivery: string;
  };
  totals: {
    subtotal: number;
    tax: number;
    shipping: number;
    total: number;
  };
  __v: number;
  items: Array<{
    productId: string;
    quantity: number;
    price: number;
    image: string;
    id: string;
    name: string;
    brand: string;
    total: number;
  }>;
  timeline: Array<{
    status: string;
    date: string;
  }>;
  paymentStatus: string;
  paymentId: string;
  paymentDetails: {
    transactionId: string;
    method: string;
    status: string;
  };

  carrier: string;
  estimatedDelivery: string;
}

export interface OrderTableItem {
  _id: string;
  customer: string;
  product: string;
  amount: string;
  status: "pending" | "confirmed" | "delivered";
  date: string;
}  