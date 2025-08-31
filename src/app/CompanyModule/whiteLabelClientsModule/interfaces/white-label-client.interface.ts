export interface WhiteLabelClient {
  id: string
  partnerName: string
  brandName: string
  clientName: string
  clientEmail: string
  clientPhone: string
  clientDocument: string
  clientType: "INDIVIDUAL" | "BUSINESS"
  status: "ACTIVE" | "INACTIVE" | "PENDING" | "BLOCKED"
  registrationDate: Date
  lastActivity: Date
  totalTransactions: number
  totalVolume: number
  averageTicket: number
  preferredPaymentMethod: string
  address: {
    street: string
    city: string
    state: string
    zipCode: string
    country: string
  }
  kycStatus: "PENDING" | "APPROVED" | "REJECTED" | "EXPIRED"
  riskLevel: "LOW" | "MEDIUM" | "HIGH"
  tags: string[]
  companyInfo?: {
    cnpj: string
    corporateName: string
    tradeName: string
    businessType: string
  }
  bankAccount?: {
    bank: string
    agency: string
    account: string
    accountType: string
  }
}

export interface ClientFilters {
  search: string
  status: string
  clientType?: string
  kycStatus?: string
  riskLevel?: string
  partnerName?: string
  brandName?: string
  minVolume?: number
  maxVolume?: number
  period?: string
  dateFrom?: string
  dateTo?: string
  preferredPaymentMethod?: string
}

export interface ClientMetrics {
  totalClients: number
  activeClients: number
  newClientsThisMonth: number
  totalVolume: number
  averageTicket: number
  conversionRate: number
  clientsByType: Array<{
    type: string
    count: number
    percentage: number
  }>
  clientsByStatus: Array<{
    status: string
    count: number
    percentage: number
  }>
  topPartnersByClients: Array<{
    partnerName: string
    clientCount: number
    volume: number
  }>
}
