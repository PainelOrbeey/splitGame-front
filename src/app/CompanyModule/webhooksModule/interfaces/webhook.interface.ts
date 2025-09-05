export interface Webhook {
  id: string
  url: string
  type: WebhookType
  status: "ativo" | "inativo" | "erro"
  createdAt: Date
  updatedAt: Date
  lastTriggered?: Date
  events: WebhookEvent[]
  retryCount: number
  maxRetries: number
  secret?: string
}

export interface WebhookEvent {
  id: string
  webhookId: string
  eventType: string
  payload: any
  status: "success" | "failed" | "pending"
  responseCode?: number
  responseBody?: string
  createdAt: Date
  retriedAt?: Date
}

export interface WebhookType {
  id: string
  name: string
  description: string
  events: string[]
}

export interface CreateWebhookRequest {
  url: string
  type: string
  secret?: string
}

export interface WebhookFilters {
  status?: string
  type?: string
  dateRange?: {
    start: Date
    end: Date
  }
}
