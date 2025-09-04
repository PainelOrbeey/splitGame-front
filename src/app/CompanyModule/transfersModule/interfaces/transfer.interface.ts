export interface Transfer {
  id: string
  destination: string
  document: string
  status: "PENDENTE" | "APROVADO" | "REJEITADO" | "EM_PROCESSO" | "REEMBOLSADO" | "ERRO"
  transferredAmount: number
  fee: number
  isSubaccount: boolean
  createdAt: Date
  updatedAt: Date
  client: string
  receiver: string
  pixKey?: string
  bankingId?: string
  description?: string
}

export interface TransferRequest {
  destination: string
  document: string
  amount: number
  description?: string
  pixKey?: string
}

export interface TransferMetrics {
  totalTransfers: number
  pendingTransfers: number
  approvedTransfers: number
  rejectedTransfers: number
  totalAmount: number
  totalFees: number
}
