export interface WhiteLabelClient {
  id: string
  clientName: string
  clientEmail: string
  clientPhone: string
  clientDocument: string
  clientType: "INDIVIDUAL" | "BUSINESS"
  partnerName: string
  brandName: string
  status: "ACTIVE" | "INACTIVE" | "PENDING" | "BLOCKED"
  kycStatus: "APPROVED" | "PENDING" | "REJECTED" | "EXPIRED"
  riskLevel: "LOW" | "MEDIUM" | "HIGH"
  totalTransactions: number
  totalVolume: number
  averageTicket: number
  registrationDate: Date
  lastActivity: Date
  preferredPaymentMethod: string
  avatar: string
  address: {
    street: string
    city: string
    state: string
    zipCode: string
    country: string
  }
  companyInfo?: {
    cnpj: string
    corporateName: string
    tradeName: string
    businessType: string
  }
  tags: string[]
}

export interface ClientMetrics {
  totalClients: number
  activeClients: number
  totalVolume: number
  averageTicket: number
  conversionRate: number
  newClientsThisMonth: number
}

export interface ClientFilters {
  search: string
  status: string
  clientType: string
  kycStatus: string
  riskLevel: string
  partnerName: string
  brandName: string
  minVolume: number | null
  maxVolume: number | null
  period: string
  dateFrom: string
  dateTo: string
  preferredPaymentMethod: string
}
