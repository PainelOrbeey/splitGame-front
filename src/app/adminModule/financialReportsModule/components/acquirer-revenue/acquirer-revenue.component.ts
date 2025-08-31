import { Component, type OnInit } from "@angular/core"
import { CommonModule } from "@angular/common"
import { FormsModule } from "@angular/forms"
import { CustomDialogComponent } from "../../../../../shared/components/custom-dialog/custom-dialog.component"
import { FilterTabsComponent } from "../../../../../shared/components/filter-tabs/filter-tabs.component"
import { SidebarFiltersComponent } from "../../../../../shared/components/sidebar-filters/sidebar-filters.component"
import { SummaryCardComponent } from "../../../../../shared/components/sumary-cards/sumary-cards.component"
import { UserMenuComponent } from "../../../../../shared/components/user-menu/user-menu.component"

interface AcquirerRevenue {
  id: string
  acquirerName: string
  acquirerCode: string
  totalRevenue: number
  transactionCount: number
  averageTicket: number
  feeRevenue: number
  feePercentage: number
  marketShare: number
  period: string
  status: "active" | "inactive" | "maintenance"
  paymentMethods: string[]
  createdAt: Date
  updatedAt: Date
}

interface AcquirerRevenueFilters {
  search: string
  status: string
  period: string
  minRevenue: number | null
  maxRevenue: number | null
  minTransactions: number | null
  maxTransactions: number | null
  paymentMethod: string
  dateFrom: string
  dateTo: string
}

interface AcquirerRevenueMetrics {
  totalAcquirers: number
  totalRevenue: number
  totalTransactions: number
  averageTicket: number
  totalFees: number
  averageMarketShare: number
}

@Component({
  selector: "app-acquirer-revenue",
  standalone: true,
  imports: [CommonModule, FormsModule, UserMenuComponent, FilterTabsComponent, SummaryCardComponent, SidebarFiltersComponent, CustomDialogComponent],
  templateUrl: "./acquirer-revenue.component.html",
  styleUrls: ["./acquirer-revenue.component.scss"],
})
export class AcquirerRevenueComponent implements OnInit {
  sidebarVisible = false
  selectedRevenue: AcquirerRevenue | null = null
  detailsVisible = false

  filters: AcquirerRevenueFilters = {
    search: "",
    status: "",
    period: "monthly",
    minRevenue: null,
    maxRevenue: null,
    minTransactions: null,
    maxTransactions: null,
    paymentMethod: "",
    dateFrom: "",
    dateTo: "",
  }

  metrics: AcquirerRevenueMetrics = {
    totalAcquirers: 0,
    totalRevenue: 0,
    totalTransactions: 0,
    averageTicket: 0,
    totalFees: 0,
    averageMarketShare: 0,
  }

  revenues: AcquirerRevenue[] = [
    {
      id: "1",
      acquirerName: "Stone",
      acquirerCode: "STONE",
      totalRevenue: 2500000,
      transactionCount: 15000,
      averageTicket: 166.67,
      feeRevenue: 75000,
      feePercentage: 3.0,
      marketShare: 35.5,
      period: "2024-01",
      status: "active",
      paymentMethods: ["credit", "debit", "pix"],
      createdAt: new Date("2024-01-01"),
      updatedAt: new Date("2024-01-31"),
    },
    {
      id: "2",
      acquirerName: "Cielo",
      acquirerCode: "CIELO",
      totalRevenue: 3200000,
      transactionCount: 18500,
      averageTicket: 172.97,
      feeRevenue: 96000,
      feePercentage: 3.0,
      marketShare: 42.8,
      period: "2024-01",
      status: "active",
      paymentMethods: ["credit", "debit", "voucher"],
      createdAt: new Date("2024-01-01"),
      updatedAt: new Date("2024-01-31"),
    },
    {
      id: "3",
      acquirerName: "Rede",
      acquirerCode: "REDE",
      totalRevenue: 1800000,
      transactionCount: 12000,
      averageTicket: 150.0,
      feeRevenue: 54000,
      feePercentage: 3.0,
      marketShare: 21.7,
      period: "2024-01",
      status: "active",
      paymentMethods: ["credit", "debit"],
      createdAt: new Date("2024-01-01"),
      updatedAt: new Date("2024-01-31"),
    },
  ]

  filteredRevenues: AcquirerRevenue[] = []
  currentPage = 1
  itemsPerPage = 10
  totalPages = 1

  ngOnInit() {
    this.updateMetrics()
    this.applyFilters()
  }

  fmt(value: number | null | undefined, type: "currency" | "int" | "percent" = "int", min = 0, max = 2): string {
    if (value === null || value === undefined) return "-"

    switch (type) {
      case "currency":
        return new Intl.NumberFormat("pt-BR", {
          style: "currency",
          currency: "BRL",
          minimumFractionDigits: min,
          maximumFractionDigits: max,
        }).format(value)
      case "percent":
        return new Intl.NumberFormat("pt-BR", {
          style: "percent",
          minimumFractionDigits: min,
          maximumFractionDigits: max,
        }).format(value / 100)
      default:
        return new Intl.NumberFormat("pt-BR", {
          minimumFractionDigits: min,
          maximumFractionDigits: max,
        }).format(value)
    }
  }

  setRevenueStatus(status: string) {
    this.filters.status = status
    this.applyFilters()
  }

  applyFilters() {
    this.filteredRevenues = this.revenues.filter((revenue) => {
      const matchesSearch =
        !this.filters.search ||
        revenue.acquirerName.toLowerCase().includes(this.filters.search.toLowerCase()) ||
        revenue.acquirerCode.toLowerCase().includes(this.filters.search.toLowerCase())

      const matchesStatus = !this.filters.status || revenue.status === this.filters.status

      const matchesMinRevenue = !this.filters.minRevenue || revenue.totalRevenue >= this.filters.minRevenue
      const matchesMaxRevenue = !this.filters.maxRevenue || revenue.totalRevenue <= this.filters.maxRevenue

      const matchesMinTransactions =
        !this.filters.minTransactions || revenue.transactionCount >= this.filters.minTransactions
      const matchesMaxTransactions =
        !this.filters.maxTransactions || revenue.transactionCount <= this.filters.maxTransactions

      const matchesPaymentMethod =
        !this.filters.paymentMethod || revenue.paymentMethods.includes(this.filters.paymentMethod)

      return (
        matchesSearch &&
        matchesStatus &&
        matchesMinRevenue &&
        matchesMaxRevenue &&
        matchesMinTransactions &&
        matchesMaxTransactions &&
        matchesPaymentMethod
      )
    })

    this.totalPages = Math.ceil(this.filteredRevenues.length / this.itemsPerPage)
    this.updateMetrics()
  }

  updateMetrics() {
    const data = this.filteredRevenues

    this.metrics = {
      totalAcquirers: data.length,
      totalRevenue: data.reduce((sum, r) => sum + r.totalRevenue, 0),
      totalTransactions: data.reduce((sum, r) => sum + r.transactionCount, 0),
      averageTicket: data.length > 0 ? data.reduce((sum, r) => sum + r.averageTicket, 0) / data.length : 0,
      totalFees: data.reduce((sum, r) => sum + r.feeRevenue, 0),
      averageMarketShare: data.length > 0 ? data.reduce((sum, r) => sum + r.marketShare, 0) / data.length : 0,
    }
  }

  clearFilters() {
    this.filters = {
      search: "",
      status: "",
      period: "monthly",
      minRevenue: null,
      maxRevenue: null,
      minTransactions: null,
      maxTransactions: null,
      paymentMethod: "",
      dateFrom: "",
      dateTo: "",
    }
    this.applyFilters()
  }

  exportCSV() {
    console.log("Exportando CSV de faturamento por adquirente...")
  }

  viewDetails(revenue: AcquirerRevenue) {
    this.selectedRevenue = revenue
    this.detailsVisible = true
  }

  getStatusClass(status: string): string {
    const classes = {
      active: "success",
      inactive: "warning",
      maintenance: "danger",
    }
    return classes[status as keyof typeof classes] || ""
  }

  getStatusLabel(status: string): string {
    const labels = {
      active: "Ativo",
      inactive: "Inativo",
      maintenance: "Manutenção",
    }
    return labels[status as keyof typeof labels] || status
  }

  getPaymentMethodLabel(method: string): string {
    const labels = {
      credit: "Crédito",
      debit: "Débito",
      pix: "PIX",
      voucher: "Voucher",
    }
    return labels[method as keyof typeof labels] || method
  }

  getPaginatedData(): AcquirerRevenue[] {
    const start = (this.currentPage - 1) * this.itemsPerPage
    const end = start + this.itemsPerPage
    return this.filteredRevenues.slice(start, end)
  }

  goToPage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page
    }
  }
}
