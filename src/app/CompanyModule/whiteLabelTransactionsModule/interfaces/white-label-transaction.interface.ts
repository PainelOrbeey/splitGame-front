export interface WhiteLabelTransaction {
  id: string
  partnerName: string
  brandName: string
  transactionType: "PIX" | "CREDIT_CARD" | "DEBIT_CARD" | "BOLETO" | "TRANSFER"
  amount: number
  fee: number
  netAmount: number
  status: "COMPLETED" | "PENDING" | "FAILED" | "CANCELLED"
  createdAt: Date
  processedAt?: Date
  description: string
  customerEmail: string
  partnerCommission: number
  platformFee: number
  paymentMethod?: string
  customerName?: string
  customerDocument?: string
  acquirer?: string
  authorizationCode?: string
  nsu?: string
  installments?: number
  cardBrand?: string
  cardLastDigits?: string
}

export interface TransactionFilters {
  search: string
  status: string
  transactionType?: string
  partnerName?: string
  brandName?: string
  paymentMethod?: string
  acquirer?: string
  minAmount?: number
  maxAmount?: number
  period?: string
  dateFrom?: string
  dateTo?: string
}

export interface TransactionMetrics {
  totalTransactions: number
  totalVolume: number
  totalCommissions: number
  totalFees: number
  averageTicket: number
  conversionRate: number
  approvalRate: number
  topPartners: Array<{
    name: string
    volume: number
    transactions: number
  }>
  transactionsByType: Array<{
    type: string
    count: number
    volume: number
  }>
}
