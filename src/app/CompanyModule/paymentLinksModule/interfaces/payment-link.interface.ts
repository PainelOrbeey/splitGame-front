export interface PaymentLink {
  id: string
  name: string
  description: string
  price: number
  status: "ativo" | "inativo" | "pausado"
  url: string
  createdAt: Date
  updatedAt: Date
  customization?: {
    backgroundColor?: string
    textColor?: string
    logoUrl?: string
    customCss?: string
  }
  analytics?: {
    views: number
    clicks: number
    conversions: number
    revenue: number
  }
}

export interface PaymentLinkFilters {
  status?: string
  priceRange: {
    min: number | null
    max: number | null
  }
  dateRange?: {
    start: Date
    end: Date
  }
  search?: string
}

export interface CreatePaymentLinkRequest {
  name: string
  description: string
  price: number
  customization?: {
    backgroundColor?: string
    textColor?: string
    logoUrl?: string
    customCss?: string
  }
}
