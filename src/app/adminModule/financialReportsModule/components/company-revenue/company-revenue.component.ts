import { Component, type OnInit } from "@angular/core"
import type { CompanyRevenue, FinancialFilters, FinancialMetrics } from "../../interfaces/financial-report.interface"
import { CommonModule } from "@angular/common"
import { FormsModule } from "@angular/forms"
import { DialogModule } from "primeng/dialog"
import { CustomDialogComponent } from "../../../../../shared/components/custom-dialog/custom-dialog.component"
import { FilterTabsComponent } from "../../../../../shared/components/filter-tabs/filter-tabs.component"
import { SidebarFiltersComponent } from "../../../../../shared/components/sidebar-filters/sidebar-filters.component"
import { SummaryCardComponent } from "../../../../../shared/components/sumary-cards/sumary-cards.component"
import { UserMenuComponent } from "../../../../../shared/components/user-menu/user-menu.component"

@Component({
  selector: "app-company-revenue",
  templateUrl: "./company-revenue.component.html",
  styleUrls: ["./company-revenue.component.scss"],
  standalone: true,
  imports: [CommonModule, DialogModule, FormsModule, UserMenuComponent, FilterTabsComponent, SummaryCardComponent, SidebarFiltersComponent, CustomDialogComponent],

})
export class CompanyRevenueComponent implements OnInit {
  companies: CompanyRevenue[] = []
  filteredCompanies: CompanyRevenue[] = []
  selectedCompany: CompanyRevenue | null = null

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
    this.loadCompanies()
    this.updateMetrics()
  }

  loadCompanies() {
    // Dados mockados
    this.companies = [
      {
        id: "1",
        companyId: "comp_001",
        companyName: "Tech Solutions Ltda",
        cnpj: "12.345.678/0001-90",
        totalRevenue: 85000,
        totalTransactions: 320,
        averageTicket: 265.63,
        growth: 15.2,
        lastTransaction: new Date("2024-03-15"),
        status: "active",
      },
      {
        id: "2",
        companyId: "comp_002",
        companyName: "Digital Commerce SA",
        cnpj: "98.765.432/0001-10",
        totalRevenue: 125000,
        totalTransactions: 450,
        averageTicket: 277.78,
        growth: 8.7,
        lastTransaction: new Date("2024-03-14"),
        status: "active",
      },
      {
        id: "3",
        companyId: "comp_003",
        companyName: "Startup Inovadora ME",
        cnpj: "11.222.333/0001-44",
        totalRevenue: 45000,
        totalTransactions: 180,
        averageTicket: 250.0,
        growth: -2.1,
        lastTransaction: new Date("2024-02-28"),
        status: "inactive",
      },
    ]

    this.applyFilters()
  }

  applyFilters() {
    this.filteredCompanies = this.companies.filter((company) => {
      const matchesSearch =
        !this.filters.search ||
        company.companyName.toLowerCase().includes(this.filters.search.toLowerCase()) ||
        company.cnpj.includes(this.filters.search)

      const matchesStatus = !this.filters.status || company.status === this.filters.status

      const matchesMinRevenue = !this.filters.minRevenue || company.totalRevenue >= this.filters.minRevenue
      const matchesMaxRevenue = !this.filters.maxRevenue || company.totalRevenue <= this.filters.maxRevenue

      return matchesSearch && matchesStatus && matchesMinRevenue && matchesMaxRevenue
    })

    this.totalItems = this.filteredCompanies.length
    this.updateMetrics()
  }

  updateMetrics() {
    const data = this.filteredCompanies

    this.metrics = {
      totalRevenue: data.reduce((sum, item) => sum + item.totalRevenue, 0),
      totalTransactions: data.reduce((sum, item) => sum + item.totalTransactions, 0),
      averageTicket: data.length > 0 ? data.reduce((sum, item) => sum + item.averageTicket, 0) / data.length : 0,
      totalProfit: data.reduce((sum, item) => sum + item.totalRevenue * 0.15, 0),
      profitMargin: 15,
      growth: data.length > 0 ? data.reduce((sum, item) => sum + item.growth, 0) / data.length : 0,
    }
  }

  setCompanyStatus(status: string) {
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

  viewDetails(company: CompanyRevenue) {
    this.selectedCompany = company
    this.dialogVisible = true
  }

  exportCSV() {
    console.log("Exportando CSV de faturamento por empresa...")
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
      case "active":
        return "success"
      case "inactive":
        return "warning"
      case "suspended":
        return "danger"
      default:
        return "secondary"
    }
  }
get activeCompaniesCount(): number {
  return this.filteredCompanies.filter(c => c.status === 'active').length;
}
get ticketMedio(): number {
  return this.metrics.averageTicket;
}

get totalTransacoes(): number {
  return this.metrics.totalTransactions;
}
  getStatusLabel(status: string): string {
    switch (status) {
      case "active":
        return "Ativa"
      case "inactive":
        return "Inativa"
      case "suspended":
        return "Suspensa"
      default:
        return status
    }
  }

  get paginatedCompanies() {
    const start = (this.currentPage - 1) * this.itemsPerPage
    const end = start + this.itemsPerPage
    return this.filteredCompanies.slice(start, end)
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
