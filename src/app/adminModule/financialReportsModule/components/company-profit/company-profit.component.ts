import { Component, type OnInit } from "@angular/core"
import { CommonModule } from "@angular/common"
import { FormsModule } from "@angular/forms"
import { CustomDialogComponent } from "../../../../../shared/components/custom-dialog/custom-dialog.component"
import { FilterTabsComponent } from "../../../../../shared/components/filter-tabs/filter-tabs.component"
import { SidebarFiltersComponent } from "../../../../../shared/components/sidebar-filters/sidebar-filters.component"
import { SummaryCardComponent } from "../../../../../shared/components/sumary-cards/sumary-cards.component"
import { UserMenuComponent } from "../../../../../shared/components/user-menu/user-menu.component"

interface CompanyProfit {
  id: string
  companyName: string
  cnpj: string
  totalRevenue: number
  totalCosts: number
  grossProfit: number
  netProfit: number
  profitMargin: number
  transactionCount: number
  averageTicket: number
  period: string
  status: "active" | "inactive" | "suspended"
  createdAt: Date
  updatedAt: Date
}

interface CompanyProfitFilters {
  search: string
  status: string
  period: string
  minProfit: number | null
  maxProfit: number | null
  minMargin: number | null
  maxMargin: number | null
  dateFrom: string
  dateTo: string
  segment: string
  region: string
}

interface CompanyProfitMetrics {
  totalCompanies: number
  totalRevenue: number
  totalProfit: number
  averageMargin: number
  profitableCompanies: number
  averageTicket: number
}

@Component({
  selector: "app-company-profit",
  standalone: true,
  imports: [CommonModule, FormsModule, UserMenuComponent, FilterTabsComponent, SummaryCardComponent, SidebarFiltersComponent, CustomDialogComponent],
  templateUrl: "./company-profit.component.html",
  styleUrls: ["./company-profit.component.scss"],
})
export class CompanyProfitComponent implements OnInit {
  sidebarVisible = false
  selectedProfit: CompanyProfit | null = null
  detailsVisible = false

  filters: CompanyProfitFilters = {
    search: "",
    status: "",
    period: "monthly",
    minProfit: null,
    maxProfit: null,
    minMargin: null,
    maxMargin: null,
    dateFrom: "",
    dateTo: "",
    segment: "",
    region: "",
  }

  metrics: CompanyProfitMetrics = {
    totalCompanies: 0,
    totalRevenue: 0,
    totalProfit: 0,
    averageMargin: 0,
    profitableCompanies: 0,
    averageTicket: 0,
  }

  profits: CompanyProfit[] = [
    {
      id: "1",
      companyName: "Tech Solutions Ltda",
      cnpj: "12.345.678/0001-90",
      totalRevenue: 850000,
      totalCosts: 620000,
      grossProfit: 230000,
      netProfit: 180000,
      profitMargin: 21.18,
      transactionCount: 1250,
      averageTicket: 680,
      period: "2024-01",
      status: "active",
      createdAt: new Date("2024-01-15"),
      updatedAt: new Date("2024-01-31"),
    },
    {
      id: "2",
      companyName: "Comércio Digital SA",
      cnpj: "98.765.432/0001-10",
      totalRevenue: 1200000,
      totalCosts: 950000,
      grossProfit: 250000,
      netProfit: 195000,
      profitMargin: 16.25,
      transactionCount: 2100,
      averageTicket: 571,
      period: "2024-01",
      status: "active",
      createdAt: new Date("2024-01-10"),
      updatedAt: new Date("2024-01-31"),
    },
  ]

  filteredProfits: CompanyProfit[] = []
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

  setProfitStatus(status: string) {
    this.filters.status = status
    this.applyFilters()
  }

  applyFilters() {
    this.filteredProfits = this.profits.filter((profit) => {
      const matchesSearch =
        !this.filters.search ||
        profit.companyName.toLowerCase().includes(this.filters.search.toLowerCase()) ||
        profit.cnpj.includes(this.filters.search)

      const matchesStatus = !this.filters.status || profit.status === this.filters.status

      const matchesMinProfit = !this.filters.minProfit || profit.netProfit >= this.filters.minProfit
      const matchesMaxProfit = !this.filters.maxProfit || profit.netProfit <= this.filters.maxProfit

      const matchesMinMargin = !this.filters.minMargin || profit.profitMargin >= this.filters.minMargin
      const matchesMaxMargin = !this.filters.maxMargin || profit.profitMargin <= this.filters.maxMargin

      return (
        matchesSearch && matchesStatus && matchesMinProfit && matchesMaxProfit && matchesMinMargin && matchesMaxMargin
      )
    })

    this.totalPages = Math.ceil(this.filteredProfits.length / this.itemsPerPage)
    this.updateMetrics()
  }

  updateMetrics() {
    const data = this.filteredProfits

    this.metrics = {
      totalCompanies: data.length,
      totalRevenue: data.reduce((sum, p) => sum + p.totalRevenue, 0),
      totalProfit: data.reduce((sum, p) => sum + p.netProfit, 0),
      averageMargin: data.length > 0 ? data.reduce((sum, p) => sum + p.profitMargin, 0) / data.length : 0,
      profitableCompanies: data.filter((p) => p.netProfit > 0).length,
      averageTicket: data.length > 0 ? data.reduce((sum, p) => sum + p.averageTicket, 0) / data.length : 0,
    }
  }

  clearFilters() {
    this.filters = {
      search: "",
      status: "",
      period: "monthly",
      minProfit: null,
      maxProfit: null,
      minMargin: null,
      maxMargin: null,
      dateFrom: "",
      dateTo: "",
      segment: "",
      region: "",
    }
    this.applyFilters()
  }

  exportCSV() {
    console.log("Exportando CSV de lucro por empresa...")
  }

  viewDetails(profit: CompanyProfit) {
    this.selectedProfit = profit
    this.detailsVisible = true
  }

  getStatusClass(status: string): string {
    const classes = {
      active: "success",
      inactive: "warning",
      suspended: "danger",
    }
    return classes[status as keyof typeof classes] || ""
  }

  getStatusLabel(status: string): string {
    const labels = {
      active: "Ativa",
      inactive: "Inativa",
      suspended: "Suspensa",
    }
    return labels[status as keyof typeof labels] || status
  }

  getPaginatedData(): CompanyProfit[] {
    const start = (this.currentPage - 1) * this.itemsPerPage
    const end = start + this.itemsPerPage
    return this.filteredProfits.slice(start, end)
  }

  goToPage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page
    }
  }
}
