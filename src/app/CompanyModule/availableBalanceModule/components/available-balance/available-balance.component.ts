import { Component, type OnInit } from "@angular/core"
import type {
  AvailableBalance,
  BalanceTransaction,
  BalanceMetrics,
  BalanceFilter,
} from "../../interfaces/available-balance.interface"
import { CommonModule } from "@angular/common"
import { FormsModule } from "@angular/forms"
import { CustomDialogComponent } from "../../../../../shared/components/custom-dialog/custom-dialog.component"
import { FilterTabsComponent } from "../../../../../shared/components/filter-tabs/filter-tabs.component"
import { SidebarFiltersComponent } from "../../../../../shared/components/sidebar-filters/sidebar-filters.component"
import { SummaryCardComponent } from "../../../../../shared/components/sumary-cards/sumary-cards.component"
import { UserMenuComponent } from "../../../../../shared/components/user-menu/user-menu.component"
import { PaginationComponent } from "../../../../../shared/components/pagination/pagination.component"

@Component({
  selector: "app-available-balance",
  templateUrl: "./available-balance.component.html",
  styleUrls: ["./available-balance.component.scss"],
       standalone: true,
        imports: [CommonModule,PaginationComponent, FormsModule, UserMenuComponent, FilterTabsComponent, SummaryCardComponent, SidebarFiltersComponent, CustomDialogComponent],

})
export class AvailableBalanceComponent implements OnInit {
  // Data properties
  balance: AvailableBalance = {
    availableBalance: 22.78,
    protestBalance: 0.0,
    financialReserve: 0.0,
    toReceive: 0.0,
    lastUpdate: new Date(),
  }

  transactions: BalanceTransaction[] = []
  metrics: BalanceMetrics = {
    totalTransactions: 0,
    totalEntries: 0,
    totalExits: 0,
    netBalance: 0,
    monthlyMovement: 0,
    pendingTransactions: 0,
  }

  // UI States
  sidebarVisible = false
  refreshing = false

  // Filters and pagination
  currentPage = 1
  itemsPerPage = 10
  totalItems = 0
  filters: BalanceFilter = {
    search: "",
    status: "",
    type: "",
    category: "",
    dateFrom: "",
    dateTo: "",
    minAmount: null,
    maxAmount: null,
    period: "all",
  }

  ngOnInit() {
    this.loadData()
  }

  loadData() {
    this.loadBalance()
    this.loadTransactions()
    this.updateMetrics()
  }

  loadBalance() {
    // Simulated data - in real app would come from API
    this.balance = {
      availableBalance: 22.78,
      protestBalance: 0.0,
      financialReserve: 0.0,
      toReceive: 0.0,
      lastUpdate: new Date(),
    }
  }

  loadTransactions() {
    // Simulated transaction data
    this.transactions = [
      {
        id: "1",
        date: new Date("2024-12-04T10:30:00"),
        description: "Transferência recebida - Cliente ABC",
        type: "entrada",
        status: "completed",
        entryValue: 1500.0,
        exitValue: 0,
        total: 1500.0,
        reference: "TXN001",
        category: "transfer",
        source: "Cliente ABC",
      },
      {
        id: "2",
        date: new Date("2024-12-04T09:15:00"),
        description: "Taxa de processamento",
        type: "saida",
        status: "completed",
        entryValue: 0,
        exitValue: 25.0,
        total: -25.0,
        reference: "TXN002",
        category: "fee",
      },
      {
        id: "3",
        date: new Date("2024-12-03T16:45:00"),
        description: "Comissão de afiliado",
        type: "entrada",
        status: "completed",
        entryValue: 350.0,
        exitValue: 0,
        total: 350.0,
        reference: "TXN003",
        category: "commission",
        source: "Sistema de Afiliados",
      },
      {
        id: "4",
        date: new Date("2024-12-03T14:20:00"),
        description: "Saque solicitado",
        type: "saida",
        status: "processing",
        entryValue: 0,
        exitValue: 500.0,
        total: -500.0,
        reference: "TXN004",
        category: "withdrawal",
        destination: "Conta Bancária",
      },
      {
        id: "5",
        date: new Date("2024-12-02T11:30:00"),
        description: "Pagamento de serviço",
        type: "entrada",
        status: "completed",
        entryValue: 750.0,
        exitValue: 0,
        total: 750.0,
        reference: "TXN005",
        category: "payment",
        source: "Cliente XYZ",
      },
      {
        id: "6",
        date: new Date("2024-12-02T08:45:00"),
        description: "Estorno de transação",
        type: "saida",
        status: "failed",
        entryValue: 0,
        exitValue: 200.0,
        total: -200.0,
        reference: "TXN006",
        category: "refund",
      },
    ]

    this.totalItems = this.transactions.length
  }

  updateMetrics() {
    const completedTransactions = this.transactions.filter((t) => t.status === "completed")

    this.metrics = {
      totalTransactions: this.transactions.length,
      totalEntries: completedTransactions.filter((t) => t.type === "entrada").reduce((sum, t) => sum + t.entryValue, 0),
      totalExits: completedTransactions.filter((t) => t.type === "saida").reduce((sum, t) => sum + t.exitValue, 0),
      netBalance: this.balance.availableBalance,
      monthlyMovement: completedTransactions.length,
      pendingTransactions: this.transactions.filter((t) => t.status === "pending" || t.status === "processing").length,
    }
  }

  // Filter methods
  setStatus(status: string) {
    this.filters.status = status
    this.applyFilters()
  }

  applyFilters() {
    this.currentPage = 1
    // Filter logic would be applied here
  }

  clearFilters() {
    this.filters = {
      search: "",
      status: "",
      type: "",
      category: "",
      dateFrom: "",
      dateTo: "",
      minAmount: null,
      maxAmount: null,
      period: "all",
    }
    this.applyFilters()
  }

  exportCSV() {
    // Export logic
    console.log("Exporting balance transactions to CSV...")
  }

  refreshBalance() {
    this.refreshing = true
    setTimeout(() => {
      this.loadData()
      this.refreshing = false
    }, 1500)
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
      pending: "tag-warning",
      processing: "tag-info",
      completed: "tag-success",
      failed: "tag-danger",
      cancelled: "tag-secondary",
    }
    return classes[status] || "tag-secondary"
  }

  getTypeClass(type: string): string {
    return type === "entrada" ? "type-entry" : "type-exit"
  }

  getCategoryIcon(category: string): string {
    const icons: { [key: string]: string } = {
      transfer: "pi-arrow-right-arrow-left",
      payment: "pi-credit-card",
      fee: "pi-percentage",
      refund: "pi-undo",
      commission: "pi-star",
      withdrawal: "pi-money-bill",
    }
    return icons[category] || "pi-circle"
  }

  get filteredTransactions(): BalanceTransaction[] {
    let filtered = [...this.transactions]

    if (this.filters.search) {
      const search = this.filters.search.toLowerCase()
      filtered = filtered.filter(
        (transaction) =>
          transaction.description.toLowerCase().includes(search) ||
          transaction.reference.toLowerCase().includes(search) ||
          (transaction.source && transaction.source.toLowerCase().includes(search)) ||
          (transaction.destination && transaction.destination.toLowerCase().includes(search)),
      )
    }

    if (this.filters.status) {
      filtered = filtered.filter((transaction) => transaction.status === this.filters.status)
    }

    if (this.filters.type) {
      filtered = filtered.filter((transaction) => transaction.type === this.filters.type)
    }

    if (this.filters.category) {
      filtered = filtered.filter((transaction) => transaction.category === this.filters.category)
    }

    if (this.filters.minAmount) {
      filtered = filtered.filter((transaction) => Math.abs(transaction.total) >= this.filters.minAmount!)
    }

    if (this.filters.maxAmount) {
      filtered = filtered.filter((transaction) => Math.abs(transaction.total) <= this.filters.maxAmount!)
    }

    return filtered
  }

  get paginatedTransactions(): BalanceTransaction[] {
    const filtered = this.filteredTransactions
    const start = (this.currentPage - 1) * this.itemsPerPage
    return filtered.slice(start, start + this.itemsPerPage)
  }

  onPageChange(page: number) {
    this.currentPage = page
  }

  getTransactionTotal(): number {
    return this.filteredTransactions.reduce((sum, transaction) => sum + transaction.total, 0)
  }
}
