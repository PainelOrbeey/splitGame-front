export interface Transaction {
  id: string
  companyId: string
  companyName: string
  amount: number
  type: "payment" | "withdrawal" | "advance" | "fee" | "refund"
  status: "completed" | "pending" | "failed" | "cancelled" | "processing"
  paymentMethod: "pix" | "card" | "boleto" | "transfer" | "crypto"
  acquirer: string
  createdAt: Date
  processedAt: Date | null
  description: string
  fees: {
    acquirerFee: number
    platformFee: number
    totalFees: number
  }
  customer: {
    name: string
    email: string
    document: string
  }
  metadata?: {
    installments?: number
    cardBrand?: string
    authCode?: string
    nsu?: string
  }
}

export interface TransactionFilters {
  search: string
  type: string
  status: string
  paymentMethod: string
  acquirer: string
  companyId: string
  period: string
  dateFrom: string
  dateTo: string
  amountMin: number | null
  amountMax: number | null
  feesMin: number | null
  feesMax: number | null
}

export interface TransactionMetrics {
  totalTransactions: number
  totalVolume: number
  completedTransactions: number
  pendingTransactions: number
  failedTransactions: number
  totalFees: number
  averageTicket: number
  conversionRate: number
  volumeGrowth: number
  transactionGrowth: number
}
