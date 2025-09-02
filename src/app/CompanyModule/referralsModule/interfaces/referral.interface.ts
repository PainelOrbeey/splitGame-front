export interface Referral {
  id: string
  referredName: string
  referredEmail: string
  referredPhone: string
  referredDocument: string
  referrerName: string
  referrerId: string
  status: "pending" | "active" | "inactive" | "rejected" | "blocked"
  registrationDate: Date
  activationDate?: Date
  lastActivityDate?: Date
  commissionRate: number
  totalCommissions: number
  totalTransactions: number
  totalVolume: number
  level: number
  source: "direct" | "social" | "email" | "whatsapp" | "website" | "event"
  notes?: string
  rejectionReason?: string
  kycStatus: "pending" | "approved" | "rejected" | "expired"
  riskScore: number
  tags: string[]
  contact: {
    preferredMethod: "email" | "phone" | "whatsapp"
    lastContact?: Date
    contactCount: number
  }
  performance: {
    conversionRate: number
    averageTicket: number
    retentionRate: number
    monthlyGrowth: number
  }
  address?: {
    street: string
    number: string
    complement?: string
    neighborhood: string
    city: string
    state: string
    zipCode: string
  }
  bankAccount?: {
    bank: string
    agency: string
    account: string
    accountType: "checking" | "savings"
    pixKey?: string
  }
}

export interface ReferralMetrics {
  totalReferrals: number
  activeReferrals: number
  pendingReferrals: number
  totalCommissions: number
  monthlyCommissions: number
  conversionRate: number
  averageCommissionPerReferral: number
  totalVolume: number
  averageTicket: number
  retentionRate: number
}

export interface ReferralFilters {
  search: string
  status: string
  kycStatus: string
  source: string
  level: string
  minCommissions: number | null
  maxCommissions: number | null
  minVolume: number | null
  maxVolume: number | null
  minRiskScore: number | null
  maxRiskScore: number | null
  period: string
  dateFrom: string
  dateTo: string
  tags: string[]
  hasTransactions: boolean | null
}
