import { Component, type OnInit } from "@angular/core"
import type {
  WhiteLabelTransaction,
  TransactionFilters,
  TransactionMetrics,
} from "../../interfaces/white-label-transaction.interface"
import { CommonModule } from "@angular/common"
import { FormsModule } from "@angular/forms"
import { CustomDialogComponent } from "../../../../../shared/components/custom-dialog/custom-dialog.component"
import { FilterTabsComponent } from "../../../../../shared/components/filter-tabs/filter-tabs.component"
import { SidebarFiltersComponent } from "../../../../../shared/components/sidebar-filters/sidebar-filters.component"
import { SummaryCardComponent } from "../../../../../shared/components/sumary-cards/sumary-cards.component"
import { UserMenuComponent } from "../../../../../shared/components/user-menu/user-menu.component"

@Component({
  selector: "app-white-label-transactions",
  templateUrl: "./white-label-transactions.component.html",
  styleUrls: ["./white-label-transactions.component.scss"],
    standalone: true,
      imports: [CommonModule, FormsModule, UserMenuComponent, FilterTabsComponent, SummaryCardComponent, SidebarFiltersComponent, CustomDialogComponent],

})
export class WhiteLabelTransactionsComponent implements OnInit {
  transactions: WhiteLabelTransaction[] = []
  filteredTransactions: WhiteLabelTransaction[] = []
  paginatedTransactions: WhiteLabelTransaction[] = []

  metrics: TransactionMetrics = {
    totalTransactions: 15847,
    totalVolume: 2456789.5,
    totalCommissions: 147406.77,
    totalFees: 73703.38,
    averageTicket: 155.12,
    conversionRate: 94.2,
    approvalRate: 96.8,
    topPartners: [],
    transactionsByType: [],
  }

  filters: TransactionFilters = {
    search: "",
    status: "",
    transactionType: "",
    partnerName: "",
    brandName: "",
    paymentMethod: "",
    acquirer: "",
    period: "all",
  }

  currentPage = 1
  itemsPerPage = 10
  totalPages = 0
  sidebarVisible = false
  detailsVisible = false
  selectedTransaction: WhiteLabelTransaction | null = null

  ngOnInit(): void {
    this.loadTransactions()
    this.applyFilters()
  }

  loadTransactions(): void {
    // Simulando dados de transações
    this.transactions = [
      {
        id: "TXN001",
        partnerName: "TechSolutions Ltda",
        brandName: "TechPay",
        transactionType: "PIX",
        amount: 1500.0,
        fee: 15.0,
        netAmount: 1485.0,
        status: "COMPLETED",
        createdAt: new Date("2024-01-15T10:30:00"),
        processedAt: new Date("2024-01-15T10:30:05"),
        description: "Pagamento de serviços",
        customerEmail: "cliente@email.com",
        partnerCommission: 45.0,
        platformFee: 15.0,
        customerName: "João Silva",
        customerDocument: "123.456.789-00",
        acquirer: "Stone",
        authorizationCode: "123456",
        nsu: "789012",
      },
      {
        id: "TXN002",
        partnerName: "E-commerce Plus",
        brandName: "ShopFast",
        transactionType: "CREDIT_CARD",
        amount: 2800.0,
        fee: 84.0,
        netAmount: 2716.0,
        status: "COMPLETED",
        createdAt: new Date("2024-01-15T09:15:00"),
        processedAt: new Date("2024-01-15T09:15:30"),
        description: "Compra de produtos",
        customerEmail: "comprador@email.com",
        partnerCommission: 140.0,
        platformFee: 84.0,
        customerName: "Maria Santos",
        customerDocument: "987.654.321-00",
        acquirer: "Cielo",
        authorizationCode: "654321",
        nsu: "345678",
        installments: 3,
        cardBrand: "Visa",
        cardLastDigits: "1234",
      },
      {
        id: "TXN003",
        partnerName: "EduTech Brasil",
        brandName: "LearnPay",
        transactionType: "BOLETO",
        amount: 890.0,
        fee: 8.9,
        netAmount: 881.1,
        status: "PENDING",
        createdAt: new Date("2024-01-15T08:45:00"),
        description: "Mensalidade curso online",
        customerEmail: "estudante@email.com",
        partnerCommission: 26.7,
        platformFee: 8.9,
        customerName: "Carlos Oliveira",
        customerDocument: "456.789.123-00",
      },
    ]
  }

  applyFilters(): void {
    this.filteredTransactions = this.transactions.filter((transaction) => {
      const matchesSearch =
        !this.filters.search ||
        transaction.id.toLowerCase().includes(this.filters.search.toLowerCase()) ||
        transaction.partnerName.toLowerCase().includes(this.filters.search.toLowerCase()) ||
        transaction.brandName.toLowerCase().includes(this.filters.search.toLowerCase()) ||
        transaction.customerEmail.toLowerCase().includes(this.filters.search.toLowerCase())

      const matchesStatus = !this.filters.status || transaction.status === this.filters.status
      const matchesType = !this.filters.transactionType || transaction.transactionType === this.filters.transactionType
      const matchesPartner =
        !this.filters.partnerName ||
        transaction.partnerName.toLowerCase().includes(this.filters.partnerName.toLowerCase())
      const matchesBrand =
        !this.filters.brandName || transaction.brandName.toLowerCase().includes(this.filters.brandName.toLowerCase())
      const matchesAmount =
        (!this.filters.minAmount || transaction.amount >= this.filters.minAmount) &&
        (!this.filters.maxAmount || transaction.amount <= this.filters.maxAmount)

      return matchesSearch && matchesStatus && matchesType && matchesPartner && matchesBrand && matchesAmount
    })

    this.totalPages = Math.ceil(this.filteredTransactions.length / this.itemsPerPage)
    this.currentPage = 1
    this.updatePaginatedTransactions()
  }

  updatePaginatedTransactions(): void {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage
    const endIndex = startIndex + this.itemsPerPage
    this.paginatedTransactions = this.filteredTransactions.slice(startIndex, endIndex)
  }

  setStatus(status: string): void {
    this.filters.status = status
    this.applyFilters()
  }

  changePage(page: number): void {
    this.currentPage = page
    this.updatePaginatedTransactions()
  }

  viewDetails(transaction: WhiteLabelTransaction): void {
    this.selectedTransaction = transaction
    this.detailsVisible = true
  }

  exportCSV(): void {
    console.log("Exportando transações para CSV")
  }

  clearFilters(): void {
    this.filters = {
      search: "",
      status: "",
      transactionType: "",
      partnerName: "",
      brandName: "",
      paymentMethod: "",
      acquirer: "",
      period: "all",
    }
    this.applyFilters()
  }

  getStatusClass(status: string): string {
    const statusClasses = {
      COMPLETED: "status-completed",
      PENDING: "status-pending",
      FAILED: "status-failed",
      CANCELLED: "status-cancelled",
    }
    return statusClasses[status as keyof typeof statusClasses] || ""
  }

  getStatusLabel(status: string): string {
    const statusLabels = {
      COMPLETED: "Concluída",
      PENDING: "Pendente",
      FAILED: "Falhou",
      CANCELLED: "Cancelada",
    }
    return statusLabels[status as keyof typeof statusLabels] || status
  }

  getTypeLabel(type: string): string {
    const typeLabels = {
      PIX: "PIX",
      CREDIT_CARD: "Cartão de Crédito",
      DEBIT_CARD: "Cartão de Débito",
      BOLETO: "Boleto",
      TRANSFER: "Transferência",
    }
    return typeLabels[type as keyof typeof typeLabels] || type
  }

  fmt(value: number, type: string, min = 0, max = 2): string {
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
    } else if (type === "int") {
      return new Intl.NumberFormat("pt-BR").format(value)
    }
    return value.toString()
  }
}
