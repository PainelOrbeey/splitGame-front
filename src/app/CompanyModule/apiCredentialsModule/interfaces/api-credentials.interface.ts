export interface ApiCredential {
  id: string
  name: string
  description: string
  apiKey: string
  secretKey: string
  status: "active" | "inactive" | "revoked"
  permissions: ApiPermission[]
  environment: "sandbox" | "production"
  createdAt: Date
  lastUsed: Date | null
  expiresAt: Date | null
  usageCount: number
  rateLimit: number
  ipWhitelist: string[]
}

export interface ApiPermission {
  resource: string
  actions: string[]
  description: string
}

export interface ApiUsageLog {
  id: string
  credentialId: string
  endpoint: string
  method: string
  statusCode: number
  timestamp: Date
  ipAddress: string
  userAgent: string
}

export interface CreateCredentialRequest {
  name: string
  description: string
  permissions: string[]
  environment: "sandbox" | "production"
  expiresAt?: Date
  rateLimit: number
  ipWhitelist: string[]
}
