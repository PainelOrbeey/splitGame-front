export interface Withdrawal {
  id: string
  userId: string
  userName: string
  userEmail: string
  amount: number
  fee: number
  netAmount: number
  status: "pending" | "processing" | "completed" | "failed" | "cancelled"
  method: "pix" | "ted" | "bank_transfer" | "crypto"
  pixKey?: string
  bankAccount?: {
    bank: string
    agency: string
    account: string
    accountType: "checking" | "savings"
  }
  requestDate: Date
  processedDate?: Date
  completedDate?: Date
  priority: "low" | "normal" | "high" | "urgent"
  approvedBy?: string
  transactionId?: string
  reason?: string
  notes?: string
}

export interface WithdrawalFilters {
  search: string
  status: string
  method: string
  priority: string
  minAmount: number | null
  maxAmount: number | null
  dateFrom: string
  dateTo: string
  approvedBy: string
  period: string
}

export interface WithdrawalMetrics {
  totalWithdrawals: number
  totalAmount: number
  totalFees: number
  averageAmount: number
  pendingCount: number
  completedCount: number
  failedCount: number
  conversionRate: number
  averageProcessingTime: number
}
