export interface Company {
  id: string
  name: string
  cnpj: string
  email: string
  phone: string
  status: "active" | "inactive" | "pending" | "blocked"
  createdAt: Date
  updatedAt: Date
  totalRevenue: number
  totalTransactions: number
  kycStatus: "approved" | "pending" | "rejected"
  address: {
    street: string
    number: string
    city: string
    state: string
    zipCode: string
  }
  representative: {
    name: string
    email: string
    phone: string
    cpf: string
  }
  category: string
  employees: number
  monthlyVolume: number
}

export interface CompanyFilters {
  search: string
  status: string
  kycStatus: string
  category: string
  minRevenue: number | null
  maxRevenue: number | null
  minEmployees: number | null
  maxEmployees: number | null
  state: string
  dateFrom: string
  dateTo: string
  minVolume: number | null
  maxVolume: number | null
}

export interface CompanyMetrics {
  totalCompanies: number
  activeCompanies: number
  pendingKyc: number
  totalRevenue: number
  averageRevenue: number
  conversionRate: number
}
