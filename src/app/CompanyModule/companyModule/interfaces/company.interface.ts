export interface Company {
  id: string
  name: string
  tradeName: string
  document: string
  documentType: "cnpj" | "cpf"
  email: string
  phone: string
  website?: string
  logo?: string
  status: "active" | "inactive" | "pending" | "blocked"
  plan: "basic" | "premium" | "enterprise"
  createdDate: Date
  lastUpdate: Date
  address: {
    street: string
    number: string
    complement?: string
    neighborhood: string
    city: string
    state: string
    zipCode: string
    country: string
  }
  bankAccount: {
    bank: string
    bankCode: string
    agency: string
    account: string
    accountType: "checking" | "savings"
    accountHolder: string
    pixKey?: string
  }
  settings: {
    notifications: {
      email: boolean
      sms: boolean
      push: boolean
    }
    security: {
      twoFactor: boolean
      ipWhitelist: string[]
      sessionTimeout: number
    }
    billing: {
      autoPayment: boolean
      invoiceEmail: string
      paymentMethod: "card" | "boleto" | "pix"
    }
    integrations: {
      webhook: {
        enabled: boolean
        url?: string
        events: string[]
      }
      api: {
        enabled: boolean
        rateLimit: number
      }
    }
  }
  metrics: {
    totalTransactions: number
    totalVolume: number
    monthlyVolume: number
    averageTicket: number
    successRate: number
  }
  team: CompanyUser[]
  documents: CompanyDocument[]
}

export interface CompanyUser {
  id: string
  name: string
  email: string
  role: "admin" | "manager" | "operator" | "viewer"
  status: "active" | "inactive" | "pending"
  permissions: string[]
  lastAccess?: Date
  createdDate: Date
}

export interface CompanyDocument {
  id: string
  type: "contract" | "cnpj" | "license" | "certificate" | "other"
  name: string
  url: string
  status: "pending" | "approved" | "rejected"
  uploadDate: Date
  expiryDate?: Date
}

export interface CompanySettings {
  notifications: {
    email: boolean
    sms: boolean
    push: boolean
  }
  security: {
    twoFactor: boolean
    ipWhitelist: string[]
    sessionTimeout: number
  }
  billing: {
    autoPayment: boolean
    invoiceEmail: string
    paymentMethod: "card" | "boleto" | "pix"
  }
  integrations: {
    webhook: {
      enabled: boolean
      url?: string
      events: string[]
    }
    api: {
      enabled: boolean
      rateLimit: number
    }
  }
}
