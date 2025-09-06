export interface BaasService {
  id: string
  name: string
  provider: string
  logo: string
  category: "banking" | "payment" | "identity" | "credit" | "investment" | "insurance"
  status: "active" | "inactive" | "maintenance" | "deprecated"
  version: string
  environment: "production" | "sandbox" | "development"
  lastUpdate: Date
  createdAt: Date
  usingSince: Date
  api: {
    baseUrl: string
    version: string
    authentication: "api_key" | "oauth2" | "jwt" | "basic"
    rateLimit: {
      requests: number
      period: "minute" | "hour" | "day"
    }
    timeout: number
    retries: number
  }
  security: {
    encryption: string
    compliance: string[]
    certifications: string[]
    dataLocation: string
    backupFrequency: string
  }
  metrics: {
    totalRequests: number
    successfulRequests: number
    failedRequests: number
    averageResponseTime: number
    uptime: number
    errorRate: number
    monthlyUsage: number
    costPerRequest: number
    totalCost: number
  }
  features: {
    name: string
    enabled: boolean
    description: string
    cost: number
  }[]
  limits: {
    dailyRequests: number
    monthlyRequests: number
    concurrentConnections: number
    dataStorage: number
    bandwidth: number
  }
  support: {
    level: "basic" | "premium" | "enterprise"
    email: string
    phone?: string
    documentation: string
    sla: string
    responseTime: string
  }
  billing: {
    model: "pay_per_use" | "subscription" | "freemium"
    currency: string
    baseCost: number
    additionalCosts: { [key: string]: number }
    billingCycle: "monthly" | "yearly"
  }
}

export interface BaasFilters {
  search: string
  category: string
  status: string
  provider: string
  environment: string
  compliance: string
  dateFrom: string
  dateTo: string
  minCost: string
  maxCost: string
}

export interface BaasMetrics {
  totalServices: { value: number; delta: string; deltaType: "up" | "down" | "neutral" }
  activeServices: { value: number; delta: string; deltaType: "up" | "down" | "neutral" }
  totalRequests: { value: number; delta: string; deltaType: "up" | "down" | "neutral" }
  averageUptime: { value: number; delta: string; deltaType: "up" | "down" | "neutral" }
  totalCost: { value: number; delta: string; deltaType: "up" | "down" | "neutral" }
  averageResponseTime: { value: number; delta: string; deltaType: "up" | "down" | "neutral" }
  errorRate: { value: number; delta: string; deltaType: "up" | "down" | "neutral" }
  complianceScore: { value: number; delta: string; deltaType: "up" | "down" | "neutral" }
}
