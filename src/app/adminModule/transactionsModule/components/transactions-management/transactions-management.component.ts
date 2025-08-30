import { Component, type OnInit } from "@angular/core"
import { CommonModule } from "@angular/common"
import { FormsModule } from "@angular/forms"
import type { Transaction, TransactionFilters, TransactionMetrics } from "../../interfaces/transaction.interface"
import { UserMenuComponent } from "../../../../../shared/components/user-menu/user-menu.component";
import { FilterTabsComponent } from "../../../../../shared/components/filter-tabs/filter-tabs.component";
import { SummaryCardComponent } from "../../../../../shared/components/sumary-cards/sumary-cards.component";
import { SidebarFiltersComponent } from "../../../../../shared/components/sidebar-filters/sidebar-filters.component";
import { CustomDialogComponent } from "../../../../../shared/components/custom-dialog/custom-dialog.component";

@Component({
  selector: "app-transactions-management",
  standalone: true,
  imports: [CommonModule, FormsModule, UserMenuComponent, FilterTabsComponent, SummaryCardComponent, SidebarFiltersComponent, CustomDialogComponent],
  templateUrl: "./transactions-management.component.html",
  styleUrls: ["./transactions-management.component.scss"],
})
export class TransactionsManagementComponent implements OnInit {
  transactions: Transaction[] = []
  filteredTransactions: Transaction[] = []
  selectedTransaction: Transaction | null = null
  transactionDialogVisible = false
  sidebarVisible = false

  filters: TransactionFilters = {
    search: "",
    type: "",
    status: "",
    paymentMethod: "",
    acquirer: "",
    companyId: "",
    period: "all",
    dateFrom: "",
    dateTo: "",
    amountMin: null,
    amountMax: null,
    feesMin: null,
    feesMax: null,
  }

  metrics: TransactionMetrics = {
    totalTransactions: 0,
    totalVolume: 0,
    completedTransactions: 0,
    pendingTransactions: 0,
    failedTransactions: 0,
    totalFees: 0,
    averageTicket: 0,
    conversionRate: 0,
    volumeGrowth: 12.5,
    transactionGrowth: 8.3,
  }

  // Pagination
  currentPage = 1
  itemsPerPage = 15
  totalItems = 0

  ngOnInit() {
    this.loadTransactions()
    this.updateMetrics()
  }

  loadTransactions() {
    // Mock data
    this.transactions = [
      {
        id: "TXN001",
        companyId: "COMP001",
        companyName: "Tech Solutions Ltda",
        amount: 1500.0,
        type: "payment",
        status: "completed",
        paymentMethod: "pix",
        acquirer: "Stone",
        createdAt: new Date("2024-01-20T10:30:00"),
        processedAt: new Date("2024-01-20T10:31:00"),
        description: "Pagamento de serviços de desenvolvimento",
        fees: {
          acquirerFee: 15.0,
          platformFee: 30.0,
          totalFees: 45.0,
        },
        customer: {
          name: "João Silva",
          email: "joao@email.com",
          document: "123.456.789-00",
        },
        metadata: {
          authCode: "AUTH123",
          nsu: "NSU456",
        },
      },
      {
        id: "TXN002",
        companyId: "COMP002",
        companyName: "Inovação Digital S.A.",
        amount: 2800.0,
        type: "payment",
        status: "pending",
        paymentMethod: "card",
        acquirer: "Cielo",
        createdAt: new Date("2024-01-20T14:15:00"),
        processedAt: null,
        description: "Consultoria em transformação digital",
        fees: {
          acquirerFee: 84.0,
          platformFee: 56.0,
          totalFees: 140.0,
        },
        customer: {
          name: "Maria Santos",
          email: "maria@email.com",
          document: "987.654.321-00",
        },
        metadata: {
          installments: 3,
          cardBrand: "Visa",
        },
      },
      {
        id: "TXN003",
        companyId: "COMP001",
        companyName: "Tech Solutions Ltda",
        amount: 500.0,
        type: "withdrawal",
        status: "completed",
        paymentMethod: "transfer",
        acquirer: "Banco do Brasil",
        createdAt: new Date("2024-01-19T16:45:00"),
        processedAt: new Date("2024-01-19T17:00:00"),
        description: "Saque para conta corrente",
        fees: {
          acquirerFee: 5.0,
          platformFee: 10.0,
          totalFees: 15.0,
        },
        customer: {
          name: "Tech Solutions Ltda",
          email: "financeiro@techsolutions.com",
          document: "12.345.678/0001-90",
        },
      },
      {
        id: "TXN004",
        companyId: "COMP003",
        companyName: "StartupXYZ",
        amount: 750.0,
        type: "payment",
        status: "failed",
        paymentMethod: "boleto",
        acquirer: "PagSeguro",
        createdAt: new Date("2024-01-18T09:20:00"),
        processedAt: null,
        description: "Pagamento de licença de software",
        fees: {
          acquirerFee: 0,
          platformFee: 0,
          totalFees: 0,
        },
        customer: {
          name: "Carlos Oliveira",
          email: "carlos@startup.com",
          document: "456.789.123-00",
        },
      },
      {
        id: "TXN005",
        companyId: "COMP004",
        companyName: "E-commerce Plus",
        amount: 3200.0,
        type: "payment",
        status: "processing",
        paymentMethod: "crypto",
        acquirer: "BitPay",
        createdAt: new Date("2024-01-21T11:10:00"),
        processedAt: null,
        description: "Pagamento em criptomoeda",
        fees: {
          acquirerFee: 96.0,
          platformFee: 64.0,
          totalFees: 160.0,
        },
        customer: {
          name: "Ana Costa",
          email: "ana@ecommerce.com",
          document: "789.123.456-00",
        },
      },
    ]

    this.applyFilters()
  }

  updateMetrics() {
    const filtered = this.filteredTransactions

    this.metrics.totalTransactions = filtered.length
    this.metrics.totalVolume = filtered.reduce((sum, t) => sum + t.amount, 0)
    this.metrics.completedTransactions = filtered.filter((t) => t.status === "completed").length
    this.metrics.pendingTransactions = filtered.filter((t) => t.status === "pending").length
    this.metrics.failedTransactions = filtered.filter((t) => t.status === "failed").length
    this.metrics.totalFees = filtered.reduce((sum, t) => sum + t.fees.totalFees, 0)
    this.metrics.averageTicket =
      this.metrics.totalTransactions > 0 ? this.metrics.totalVolume / this.metrics.totalTransactions : 0
    this.metrics.conversionRate =
      this.metrics.totalTransactions > 0
        ? (this.metrics.completedTransactions / this.metrics.totalTransactions) * 100
        : 0
  }

  applyFilters() {
    this.filteredTransactions = this.transactions.filter((transaction) => {
      const matchesSearch =
        !this.filters.search ||
        transaction.id.toLowerCase().includes(this.filters.search.toLowerCase()) ||
        transaction.companyName.toLowerCase().includes(this.filters.search.toLowerCase()) ||
        transaction.customer.name.toLowerCase().includes(this.filters.search.toLowerCase()) ||
        transaction.customer.email.toLowerCase().includes(this.filters.search.toLowerCase())

      const matchesType = !this.filters.type || transaction.type === this.filters.type
      const matchesStatus = !this.filters.status || transaction.status === this.filters.status
      const matchesPaymentMethod =
        !this.filters.paymentMethod || transaction.paymentMethod === this.filters.paymentMethod
      const matchesAcquirer = !this.filters.acquirer || transaction.acquirer === this.filters.acquirer
      const matchesCompany = !this.filters.companyId || transaction.companyId === this.filters.companyId

      const matchesAmountMin = this.filters.amountMin === null || transaction.amount >= this.filters.amountMin
      const matchesAmountMax = this.filters.amountMax === null || transaction.amount <= this.filters.amountMax

      return (
        matchesSearch &&
        matchesType &&
        matchesStatus &&
        matchesPaymentMethod &&
        matchesAcquirer &&
        matchesCompany &&
        matchesAmountMin &&
        matchesAmountMax
      )
    })

    this.totalItems = this.filteredTransactions.length
    this.updateMetrics()
  }

  onFilterChange() {
    this.currentPage = 1
    this.applyFilters()
  }

  clearFilters() {
    this.filters = {
      search: "",
      type: "",
      status: "",
      paymentMethod: "",
      acquirer: "",
      companyId: "",
      period: "all",
      dateFrom: "",
      dateTo: "",
      amountMin: null,
      amountMax: null,
      feesMin: null,
      feesMax: null,
    }
    this.applyFilters()
  }
// ...existing code...

get paginatedTransactions() {
  const start = (this.currentPage - 1) * this.itemsPerPage
  const end = start + this.itemsPerPage
  return this.filteredTransactions.slice(start, end)
}

// Adicionar este método para expor Math.min ao template
getMin(a: number, b: number): number {
  return Math.min(a, b)
}

// Ou criar um getter para facilitar o uso da paginação
get paginationInfo() {
  const start = (this.currentPage - 1) * this.itemsPerPage + 1
  const end = Math.min(this.currentPage * this.itemsPerPage, this.totalItems)
  return { start, end, total: this.totalItems }
}
  setPaidStatus(status: string) {
    this.filters.status = status
    this.onFilterChange()
  }

  viewTransaction(transaction: Transaction) {
    this.selectedTransaction = transaction
    this.transactionDialogVisible = true
  }

  handleDialogAction(action: any) {
    if (action.id === "close") {
      this.transactionDialogVisible = false
      this.selectedTransaction = null
    }
  }

  exportCSV() {
    const csvData = this.filteredTransactions.map((t) => ({
      ID: t.id,
      Empresa: t.companyName,
      Valor: t.amount,
      Tipo: t.type,
      Status: t.status,
      "Método de Pagamento": t.paymentMethod,
      Adquirente: t.acquirer,
      "Data de Criação": t.createdAt.toLocaleDateString("pt-BR"),
      "Data de Processamento": t.processedAt?.toLocaleDateString("pt-BR") || "N/A",
      Cliente: t.customer.name,
      "E-mail do Cliente": t.customer.email,
      "Taxa Total": t.fees.totalFees,
    }))

    console.log("Exportando CSV:", csvData)
  }

  getStatusClass(status: string): string {
    const statusClasses = {
      completed: "success",
      pending: "warning",
      failed: "danger",
      cancelled: "danger",
      processing: "info",
    }
    return statusClasses[status as keyof typeof statusClasses] || ""
  }

  getTypeClass(type: string): string {
    const typeClasses = {
      payment: "success",
      withdrawal: "info",
      advance: "warning",
      fee: "secondary",
      refund: "danger",
    }
    return typeClasses[type as keyof typeof typeClasses] || ""
  }

  fmt(value: number, type: "currency" | "int" | "percent" = "currency", min = 0, max = 2): string {
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

  onPageChange(page: number) {
    this.currentPage = page
  }

}
