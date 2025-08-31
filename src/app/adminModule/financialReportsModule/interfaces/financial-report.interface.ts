export interface PeriodRevenue {
  id: string
  period: string
  startDate: Date
  endDate: Date
  totalRevenue: number
  totalTransactions: number
  averageTicket: number
  growth: number
  status: "active" | "completed" | "processing"
}

export interface CompanyRevenue {
  id: string
  companyId: string
  companyName: string
  cnpj: string
  totalRevenue: number
  totalTransactions: number
  averageTicket: number
  growth: number
  lastTransaction: Date
  status: "active" | "inactive" | "suspended"
}

export interface CompanyProfit {
  id: string
  companyId: string
  companyName: string
  cnpj: string
  totalRevenue: number
  totalCosts: number
  totalProfit: number
  profitMargin: number
  growth: number
  lastUpdate: Date
  status: "profitable" | "break_even" | "loss"
}

export interface AcquirerRevenue {
  id: string
  acquirerId: string
  acquirerName: string
  totalRevenue: number
  totalTransactions: number
  averageTicket: number
  marketShare: number
  growth: number
  lastTransaction: Date
  status: "active" | "inactive"
}

export interface FinancialFilters {
  search: string
  status: string
  period: string
  dateFrom: string
  dateTo: string
  minRevenue: number | null
  maxRevenue: number | null
  companyId: string
  acquirerId: string
}

export interface FinancialMetrics {
  totalRevenue: number
  totalTransactions: number
  averageTicket: number
  totalProfit: number
  profitMargin: number
  growth: number
}
