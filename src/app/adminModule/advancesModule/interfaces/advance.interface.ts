export interface Advance {
  id: string
  companyId: string
  companyName: string
  requestedAmount: number
  approvedAmount: number
  discountRate: number
  netAmount: number
  status: "pending" | "analyzing" | "approved" | "rejected" | "paid" | "cancelled"
  priority: "low" | "normal" | "high" | "urgent"
  requestDate: Date
  approvalDate?: Date
  paymentDate?: Date
  dueDate: Date
  paymentMethod: "pix" | "ted" | "transfer" | "check"
  bankAccount?: {
    bank: string
    agency: string
    account: string
    accountType: "checking" | "savings"
  }
  pixKey?: string
  documents: string[]
  reason: string
  analysisNotes?: string
  approvedBy?: string
  rejectionReason?: string
  fees: {
    processingFee: number
    interestRate: number
    totalFees: number
  }
  receivables: {
    totalValue: number
    count: number
    averageDays: number
  }
  riskScore: number
  createdAt: Date
  updatedAt: Date
}

export interface AdvanceFilters {
  search: string
  status: string
  priority: string
  paymentMethod: string
  minAmount: number | null
  maxAmount: number | null
  minRiskScore: number | null
  maxRiskScore: number | null
  dateFrom: string
  dateTo: string
  approvedBy: string
  period: string
}
