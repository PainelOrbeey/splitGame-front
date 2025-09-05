export interface AvailableBalance {
  availableBalance: number
  protestBalance: number
  financialReserve: number
  toReceive: number
  lastUpdate: Date
}

export interface BalanceTransaction {
  id: string
  date: Date
  description: string
  type: "entrada" | "saida"
  status: "pending" | "processing" | "completed" | "failed" | "cancelled"
  entryValue: number
  exitValue: number
  total: number
  reference: string
  category: "transfer" | "payment" | "fee" | "refund" | "commission" | "withdrawal"
  source?: string
  destination?: string
}

export interface BalanceMetrics {
  totalTransactions: number
  totalEntries: number
  totalExits: number
  netBalance: number
  monthlyMovement: number
  pendingTransactions: number
}

export interface BalanceFilter {
  search: string
  status: string
  type: string
  category: string
  dateFrom: string
  dateTo: string
  minAmount: number | null
  maxAmount: number | null
  period: string
}
