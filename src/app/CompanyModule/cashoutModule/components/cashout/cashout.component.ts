import { Component, type OnInit } from "@angular/core"
import type { Cashout, CashoutMetrics } from "../../interfaces/cashout.interface"
import { CommonModule } from "@angular/common"
import { FormsModule } from "@angular/forms"
import { CustomDialogComponent } from "../../../../../shared/components/custom-dialog/custom-dialog.component"
import { FilterTabsComponent } from "../../../../../shared/components/filter-tabs/filter-tabs.component"
import { PaginationComponent } from "../../../../../shared/components/pagination/pagination.component"
import { SidebarFiltersComponent } from "../../../../../shared/components/sidebar-filters/sidebar-filters.component"
import { SummaryCardComponent } from "../../../../../shared/components/sumary-cards/sumary-cards.component"
import { UserMenuComponent } from "../../../../../shared/components/user-menu/user-menu.component"

@Component({
  selector: "app-cashout",
  templateUrl: "./cashout.component.html",
  styleUrls: ["./cashout.component.scss"],
  standalone: true,
  imports: [CommonModule, PaginationComponent, FormsModule, UserMenuComponent, FilterTabsComponent, SummaryCardComponent, SidebarFiltersComponent, CustomDialogComponent],

})
export class CashoutComponent implements OnInit {
  // Data properties
  cashouts: Cashout[] = []
  metrics: CashoutMetrics = {
    totalCashouts: 0,
    pendingCashouts: 0,
    completedCashouts: 0,
    cancelledCashouts: 0,
    totalAmount: 0,
    totalFees: 0,
  }

  // Dialog states
  sidebarVisible = false
  isLoading = false

  // Filters and pagination
  currentPage = 1
  itemsPerPage = 10
  totalItems = 0
  filters = {
    search: "",
    status: "",
    client: "",
    paymentMethod: "",
    minAmount: null as number | null,
    maxAmount: null as number | null,
    dateFrom: "",
    dateTo: "",
    period: "all",
  }

  ngOnInit() {
    this.loadData()
    this.startAutoRefresh()
  }

  loadData() {
    this.isLoading = true
    // Simulate loading delay
    setTimeout(() => {
      this.loadCashouts()
      this.updateMetrics()
      this.isLoading = false
    }, 1000)
  }

  loadCashouts() {
    // Simulated data - in real app this would come from API
    this.cashouts = [
      {
        id: "CSH001",
        client: "Empresa ABC Ltda",
        total: 1500.0,
        description: "Saque de recebíveis - Vendas dezembro",
        status: "CONCLUIDO",
        createdAt: new Date("2024-12-04T10:30:00"),
        updatedAt: new Date("2024-12-04T11:45:00"),
        reference: "REF123456",
        paymentMethod: "PIX",
        destination: "12.345.678/0001-90",
        fee: 15.0,
      },
      {
        id: "CSH002",
        client: "João Silva MEI",
        total: 750.0,
        description: "Cashout automático - Limite atingido",
        status: "PROCESSANDO",
        createdAt: new Date("2024-12-04T14:20:00"),
        updatedAt: new Date("2024-12-04T14:20:00"),
        reference: "REF123457",
        paymentMethod: "TED",
        destination: "98.765.432/0001-10",
        fee: 7.5,
      },
      {
        id: "CSH003",
        client: "Maria Santos",
        total: 2200.0,
        description: "Saque mensal - Comissões afiliados",
        status: "PENDENTE",
        createdAt: new Date("2024-12-04T16:15:00"),
        updatedAt: new Date("2024-12-04T16:15:00"),
        reference: "REF123458",
        paymentMethod: "PIX",
        destination: "11.222.333/0001-44",
        fee: 22.0,
      },
    ]
    this.totalItems = this.cashouts.length
  }

  updateMetrics() {
    this.metrics = {
      totalCashouts: this.cashouts.length,
      pendingCashouts: this.cashouts.filter((c) => c.status === "PENDENTE").length,
      completedCashouts: this.cashouts.filter((c) => c.status === "CONCLUIDO").length,
      cancelledCashouts: this.cashouts.filter((c) => c.status === "CANCELADO").length,
      totalAmount: this.cashouts.reduce((sum, c) => sum + c.total, 0),
      totalFees: this.cashouts.reduce((sum, c) => sum + (c.fee || 0), 0),
    }
  }

  startAutoRefresh() {
    // Auto refresh every 30 seconds
    setInterval(() => {
      this.loadData()
    }, 30000)
  }

  // Filter methods
  setStatus(status: string) {
    this.filters.status = status
    this.applyFilters()
  }

  applyFilters() {
    this.currentPage = 1
    // Filter logic would be implemented here
  }

  clearFilters() {
    this.filters = {
      search: "",
      status: "",
      client: "",
      paymentMethod: "",
      minAmount: null,
      maxAmount: null,
      dateFrom: "",
      dateTo: "",
      period: "all",
    }
    this.applyFilters()
  }

  exportCSV() {
    console.log("Exporting cashouts CSV...")
  }

  // Utility methods
  fmt(value: number, type = "currency"): string {
    if (type === "currency") {
      return new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
      }).format(value)
    }
    return value.toString()
  }

  getStatusClass(status: string): string {
    const classes: { [key: string]: string } = {
      PENDENTE: "tag-warning",
      PROCESSANDO: "tag-info",
      CONCLUIDO: "tag-success",
      CANCELADO: "tag-secondary",
      ERRO: "tag-danger",
    }
    return classes[status] || "tag-secondary"
  }

  get filteredCashouts(): Cashout[] {
    let filtered = [...this.cashouts]

    if (this.filters.search) {
      const search = this.filters.search.toLowerCase()
      filtered = filtered.filter(
        (cashout) =>
          cashout.id.toLowerCase().includes(search) ||
          cashout.client.toLowerCase().includes(search) ||
          cashout.description.toLowerCase().includes(search),
      )
    }

    if (this.filters.status) {
      filtered = filtered.filter((cashout) => cashout.status === this.filters.status)
    }

    if (this.filters.client) {
      filtered = filtered.filter((cashout) => cashout.client.toLowerCase().includes(this.filters.client.toLowerCase()))
    }

    if (this.filters.minAmount) {
      filtered = filtered.filter((cashout) => cashout.total >= this.filters.minAmount!)
    }

    if (this.filters.maxAmount) {
      filtered = filtered.filter((cashout) => cashout.total <= this.filters.maxAmount!)
    }

    return filtered
  }

  get paginatedCashouts(): Cashout[] {
    const start = (this.currentPage - 1) * this.itemsPerPage
    return this.filteredCashouts.slice(start, start + this.itemsPerPage)
  }

  onPageChange(page: number) {
    this.currentPage = page
  }

  refreshData() {
    this.loadData()
  }
}
