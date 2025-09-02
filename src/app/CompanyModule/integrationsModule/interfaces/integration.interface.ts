export interface Integration {
  id: string
  name: string
  description: string
  category: "payment" | "analytics" | "marketing" | "communication" | "storage" | "security"
  status: "connected" | "disconnected" | "error" | "pending"
  icon: string
  color: string
  isActive: boolean
  connectedAt?: Date
  lastSync?: Date
  version: string
  features: string[]
  settings?: IntegrationSettings
  metrics?: IntegrationMetrics
}

export interface IntegrationSettings {
  apiKey?: string
  webhookUrl?: string
  environment: "production" | "sandbox"
  autoSync: boolean
  syncInterval: number
  notifications: boolean
  customFields?: { [key: string]: any }
}

export interface IntegrationMetrics {
  totalRequests: number
  successRate: number
  lastRequest?: Date
  errorCount: number
  avgResponseTime: number
}

export interface IntegrationFilters {
  search: string
  category: string
  status: string
}
