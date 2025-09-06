export interface BillingMetrics {
  totalInvoices: number
  currentInvoiceAmount: number
  totalPaidAmount: number
  pendingAmount: number
  totalRevenue: number
  averageInvoiceValue: number
}

export interface BillingInvoice {
  id: string
  invoiceNumber: string
  period: string
  issueDate: Date
  dueDate: Date
  amount: number
  status: "pending" | "paid" | "overdue" | "cancelled"
  paymentMethods: PaymentMethodDetail[]
  items: InvoiceItem[]
  tvpAmount: number
  additionalFees: number
  discounts: number
  downloadUrl: string
  paidDate?: Date
  paymentMethod?: string
}

export interface PaymentMethodDetail {
  type: string
  amount: number
  percentage: number
  totalPaid: number
}

export interface InvoiceItem {
  description: string
  quantity: number
  unitPrice: number
  totalPrice: number
  type: string
}

export interface PaymentMethod {
  id: string
  type: string
  name: string
  details: string
  isDefault: boolean
  isActive: boolean
  createdAt: Date
}

export interface BillingFilters {
  status: string
  search: string
  dateFrom: string
  dateTo: string
  minAmount: number | null
  maxAmount: number | null
}

export interface BillingUsage {
  id: string
  period: string
  transactionVolume: number
  transactionCount: number
  tvpRate: number
  tvpAmount: number
  status: string
  dueDate: Date
  createdAt: Date
}

export interface BillingSettings {
  tvpRate: number
  monthlyFee: number
  setupFee: number
  billingCycle: string
  autoPayment: boolean
  defaultPaymentMethod: string
  billingEmail: string
  taxId: string
  companyName: string
  billingAddress: {
    street: string
    number: string
    complement: string
    neighborhood: string
    city: string
    state: string
    zipCode: string
    country: string
  }
}

export interface UsageMetrics {
  currentMonth: {
    volume: number
    transactions: number
    estimatedTvp: number
  }
  lastMonth: {
    volume: number
    transactions: number
    tvpPaid: number
  }
  yearToDate: {
    volume: number
    transactions: number
    tvpPaid: number
  }
  averageTicket: number
  growthRate: number
}
