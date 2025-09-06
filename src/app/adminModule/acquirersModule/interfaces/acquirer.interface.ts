export interface Acquirer {
  id: string
  name: string
  logo: string
  type: "credit" | "debit" | "pix" | "boleto" | "all"
  status: "active" | "inactive" | "maintenance"
  integration: "api" | "sdk" | "webhook"
  environment: "production" | "sandbox"
  apiVersion: string
  lastSync: Date
  createdAt: Date
  updatedAt: Date
  config: {
    merchantId: string
    apiKey: string
    secretKey: string
    webhookUrl: string
    callbackUrl: string
    timeout: number
    retryAttempts: number
  }
  fees: {
    creditCard: number
    debitCard: number
    pix: number
    boleto: number
    installments: {
      [key: number]: number
    }
  }
  metrics: {
    totalTransactions: number
    totalVolume: number
    successRate: number
    averageResponseTime: number
    monthlyTransactions: number
    monthlyVolume: number
    errorRate: number
    uptime: number
  }
  limits: {
    dailyLimit: number
    monthlyLimit: number
    transactionLimit: number
    minimumAmount: number
    maximumAmount: number
  }
  support: {
    email: string
    phone: string
    documentation: string
    status: "available" | "limited" | "unavailable"
  }
  paymentMethods: {
    pix: boolean
    creditCard: boolean
    debitCard: boolean
    boleto: boolean
  }
  usingSince: Date
}

export interface AcquirerFilters {
  search: string
  type: string
  status: string
  integration: string
  environment: string
  dateFrom: string
  dateTo: string
  minVolume: string
  maxVolume: string
}

export interface AcquirerMetrics {
  totalAcquirers: { value: number; delta: string; deltaType: "up" | "down" | "neutral" }
  activeAcquirers: { value: number; delta: string; deltaType: "up" | "down" | "neutral" }
  totalVolume: { value: number; delta: string; deltaType: "up" | "down" | "neutral" }
  averageSuccessRate: { value: number; delta: string; deltaType: "up" | "down" | "neutral" }
  totalTransactions: { value: number; delta: string; deltaType: "up" | "down" | "neutral" }
  averageResponseTime: { value: number; delta: string; deltaType: "up" | "down" | "neutral" }
  systemUptime: { value: number; delta: string; deltaType: "up" | "down" | "neutral" }
  errorRate: { value: number; delta: string; deltaType: "up" | "down" | "neutral" }
}
