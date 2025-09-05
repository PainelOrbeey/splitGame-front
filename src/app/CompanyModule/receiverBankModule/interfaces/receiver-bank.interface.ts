export interface BankAccount {
  id: string
  accountNumber: string
  agency: string
  bank: string
  bankCode: string
  accountType: "checking" | "savings"
  balance: number
  status: "active" | "inactive" | "blocked"
  isDefault: boolean
  createdAt: Date
  lastTransaction?: Date
}

export interface ReceiverBalance {
  totalBalance: number
  availableBalance: number
  blockedBalance: number
  pendingBalance: number
  lastUpdate: Date
}

export interface Transfer {
  id: string
  fromAccount: string
  toAccount: string
  amount: number
  description: string
  status: "pending" | "processing" | "completed" | "failed" | "cancelled"
  type: "internal" | "pix" | "ted" | "doc"
  fee: number
  createdAt: Date
  completedAt?: Date
  reference: string
  priority?: "low" | "normal" | "high" | "urgent"
  acquirer?: string
  customer?: string
}

export interface Anticipation {
  id: string
  accountId: string
  requestedAmount: number
  approvedAmount: number
  fee: number
  feePercentage: number
  status: "pending" | "processing" | "approved" | "rejected" | "paid" | "cancelled"
  requestDate: Date
  paymentDate?: Date
  dueDate: Date
  description: string
  reference: string
  priority?: "low" | "normal" | "high" | "urgent"
  customer?: string
}

export interface ReceiverBankMetrics {
  totalAccounts: number
  activeAccounts: number
  totalBalance: number
  monthlyTransfers: number
  pendingAnticipations: number
  totalAnticipated: number
}
