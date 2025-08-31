export interface WhiteLabelMetrics {
  totalPartners: number
  activePartners: number
  totalRevenue: number
  monthlyGrowth: number
  brandSales: number
  customizations: number
  supportTickets: number
  conversionRate: number
}

interface MetricCard {
  title: string
  value: string
  change: string
  changeType: "positive" | "negative"
  period: string
  chartType: "bar" | "line"
  chartData: number[]
}

interface PartnerBalance {
  balance: string
  change: string
  changeType: "positive" | "negative"
  period: string
}

interface BrandOverviewItem {
  label: string
  percentage: number
  color: string
}

interface PartnerFunnelItem {
  label: string
  value: string
  color: string
  icon: string
}

interface BrandCategoryItem {
  name: string
  percentage: number
  partners: string
}

interface RecentPartner {
  id: string
  partnerName: string
  brandName: string
  joinDate: string
  status: "active" | "pending" | "inactive"
  revenue: string
  customizations: number
}
