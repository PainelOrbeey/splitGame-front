import { Component, type OnInit } from "@angular/core"
import type { PeriodRevenue, FinancialFilters, FinancialMetrics } from "../../interfaces/financial-report.interface"
import { CommonModule } from "@angular/common"
import { FormsModule } from "@angular/forms"
import { DialogModule } from "primeng/dialog"
import { CustomDialogComponent } from "../../../../../shared/components/custom-dialog/custom-dialog.component"
import { FilterTabsComponent } from "../../../../../shared/components/filter-tabs/filter-tabs.component"
import { SidebarFiltersComponent } from "../../../../../shared/components/sidebar-filters/sidebar-filters.component"
import { SummaryCardComponent } from "../../../../../shared/components/sumary-cards/sumary-cards.component"
import { UserMenuComponent } from "../../../../../shared/components/user-menu/user-menu.component"

@Component({
  selector: "app-period-revenue",
  templateUrl: "./period-revenue.component.html",
  styleUrls: ["./period-revenue.component.scss"],
  standalone: true,
    imports: [CommonModule, DialogModule, FormsModule, UserMenuComponent, FilterTabsComponent, SummaryCardComponent, SidebarFiltersComponent, CustomDialogComponent],

})
export class PeriodRevenueComponent implements OnInit {
  periods: PeriodRevenue[] = []
  filteredPeriods: PeriodRevenue[] = []
  selectedPeriod: PeriodRevenue | null = null

  sidebarVisible = false
  dialogVisible = false

  filters: FinancialFilters = {
    search: "",
    status: "",
    period: "monthly",
    dateFrom: "",
    dateTo: "",
    minRevenue: null,
    maxRevenue: null,
    companyId: "",
    acquirerId: "",
  }

  metrics: FinancialMetrics = {
    totalRevenue: 0,
    totalTransactions: 0,
    averageTicket: 0,
    totalProfit: 0,
    profitMargin: 0,
    growth: 0,
  }

  // Paginação
  currentPage = 1
  itemsPerPage = 10
  totalItems = 0

  ngOnInit() {
    this.loadPeriods()
    this.updateMetrics()
  }

  loadPeriods() {
    // Dados mockados
    this.periods = [
      {
        id: "1",
        period: "Janeiro 2024",
        startDate: new Date("2024-01-01"),
        endDate: new Date("2024-01-31"),
        totalRevenue: 125000,
        totalTransactions: 450,
        averageTicket: 277.78,
        growth: 12.5,
        status: "completed",
      },
      {
        id: "2",
        period: "Fevereiro 2024",
        startDate: new Date("2024-02-01"),
        endDate: new Date("2024-02-29"),
        totalRevenue: 138000,
        totalTransactions: 520,
        averageTicket: 265.38,
        growth: 10.4,
        status: "completed",
      },
      {
        id: "3",
        period: "Março 2024",
        startDate: new Date("2024-03-01"),
        endDate: new Date("2024-03-31"),
        totalRevenue: 142000,
        totalTransactions: 580,
        averageTicket: 244.83,
        growth: 2.9,
        status: "processing",
      },
    ]

    this.applyFilters()
  }

  applyFilters() {
    this.filteredPeriods = this.periods.filter((period) => {
      const matchesSearch =
        !this.filters.search || period.period.toLowerCase().includes(this.filters.search.toLowerCase())

      const matchesStatus = !this.filters.status || period.status === this.filters.status

      const matchesMinRevenue = !this.filters.minRevenue || period.totalRevenue >= this.filters.minRevenue
      const matchesMaxRevenue = !this.filters.maxRevenue || period.totalRevenue <= this.filters.maxRevenue

      return matchesSearch && matchesStatus && matchesMinRevenue && matchesMaxRevenue
    })

    this.totalItems = this.filteredPeriods.length
    this.updateMetrics()
  }

  updateMetrics() {
    const data = this.filteredPeriods

    this.metrics = {
      totalRevenue: data.reduce((sum, item) => sum + item.totalRevenue, 0),
      totalTransactions: data.reduce((sum, item) => sum + item.totalTransactions, 0),
      averageTicket: data.length > 0 ? data.reduce((sum, item) => sum + item.averageTicket, 0) / data.length : 0,
      totalProfit: data.reduce((sum, item) => sum + item.totalRevenue * 0.15, 0),
      profitMargin: 15,
      growth: data.length > 0 ? data.reduce((sum, item) => sum + item.growth, 0) / data.length : 0,
    }
  }

  setPeriodStatus(status: string) {
    this.filters.status = status
    this.applyFilters()
  }

  clearFilters() {
    this.filters = {
      search: "",
      status: "",
      period: "monthly",
      dateFrom: "",
      dateTo: "",
      minRevenue: null,
      maxRevenue: null,
      companyId: "",
      acquirerId: "",
    }
    this.applyFilters()
  }

  viewDetails(period: PeriodRevenue) {
    this.selectedPeriod = period
    this.dialogVisible = true
  }

  exportCSV() {
    console.log("Exportando CSV de faturamento por período...")
  }

  fmt(value: number, type: "currency" | "int" | "percent", min = 0, max = 2): string {
    if (type === "currency") {
      return new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
        minimumFractionDigits: min,
        maximumFractionDigits: max,
      }).format(value)
    } else if (type === "percent") {
      return new Intl.NumberFormat("pt-BR", {
        style: "percent",
        minimumFractionDigits: min,
        maximumFractionDigits: max,
      }).format(value / 100)
    } else {
      return new Intl.NumberFormat("pt-BR", {
        minimumFractionDigits: min,
        maximumFractionDigits: max,
      }).format(value)
    }
  }

  getStatusClass(status: string): string {
    switch (status) {
      case "completed":
        return "success"
      case "processing":
        return "warning"
      case "active":
        return "info"
      default:
        return "secondary"
    }
  }

  getStatusLabel(status: string): string {
    switch (status) {
      case "completed":
        return "Concluído"
      case "processing":
        return "Processando"
      case "active":
        return "Ativo"
      default:
        return status
    }
  }

  get paginatedPeriods() {
    const start = (this.currentPage - 1) * this.itemsPerPage
    const end = start + this.itemsPerPage
    return this.filteredPeriods.slice(start, end)
  }

  get totalPages() {
    return Math.ceil(this.totalItems / this.itemsPerPage)
  }

  changePage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page
    }
  }
}
