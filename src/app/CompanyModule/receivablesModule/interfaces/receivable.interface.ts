export interface Receivable {
  id: string
  companyId: string
  companyName: string
  amount: number
  netAmount: number
  fees: number
  status: "pending" | "processing" | "received" | "failed" | "cancelled"
  paymentMethod: "pix" | "ted" | "transfer" | "boleto" | "card"
  dueDate: Date
  receivedDate?: Date
  createdDate: Date
  description: string
  reference: string
  acquirer: string
  installments: number
  currentInstallment: number
  priority: "low" | "normal" | "high" | "urgent"
  tags: string[]
  customer: {
    name: string
    email: string
    document: string
    phone: string
  }
  bankAccount?: {
    bank: string
    agency: string
    account: string
    accountType: string
  }
  pixKey?: string
  metadata: {
    source: string
    campaign?: string
    affiliate?: string
  }
}

export interface ReceivableMetrics {
  totalReceivables: number
  totalAmount: number
  receivedAmount: number
  pendingAmount: number
  averageAmount: number
  successRate: number
  averageProcessingTime: number
}

export interface ReceivableFilters {
  search: string
  status: string
  paymentMethod: string
  acquirer: string
  priority: string
  minAmount: number | null
  maxAmount: number | null
  dateFrom: string
  dateTo: string
  period: string
  hasInstallments: boolean | null
  customer: string
  reference: string
}
