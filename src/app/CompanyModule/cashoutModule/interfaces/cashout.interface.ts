export interface Cashout {
  id: string
  client: string
  total: number
  description: string
  status: "PENDENTE" | "PROCESSANDO" | "CONCLUIDO" | "CANCELADO" | "ERRO"
  createdAt: Date
  updatedAt: Date
  reference?: string
  paymentMethod?: string
  destination?: string
  fee?: number
}

export interface CashoutMetrics {
  totalCashouts: number
  pendingCashouts: number
  completedCashouts: number
  cancelledCashouts: number
  totalAmount: number
  totalFees: number
}
