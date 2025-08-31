import { Component, type OnInit } from "@angular/core"
import type { Withdrawal, WithdrawalFilters, WithdrawalMetrics } from "../../interfaces/withdrawal.interface"
import { CommonModule } from "@angular/common"
import { FormsModule } from "@angular/forms"
import { CustomDialogComponent } from "../../../../../shared/components/custom-dialog/custom-dialog.component"
import { FilterTabsComponent } from "../../../../../shared/components/filter-tabs/filter-tabs.component"
import { SidebarFiltersComponent } from "../../../../../shared/components/sidebar-filters/sidebar-filters.component"
import { SummaryCardComponent } from "../../../../../shared/components/sumary-cards/sumary-cards.component"
import { UserMenuComponent } from "../../../../../shared/components/user-menu/user-menu.component"
import { DialogModule } from "primeng/dialog"

@Component({
  selector: "app-withdrawals-management",
  templateUrl: "./withdrawals-management.component.html",
  styleUrls: ["./withdrawals-management.component.scss"],
  standalone: true,
  imports: [CommonModule, DialogModule, FormsModule, UserMenuComponent, FilterTabsComponent, SummaryCardComponent, SidebarFiltersComponent, CustomDialogComponent],
})
export class WithdrawalsManagementComponent implements OnInit {
  withdrawals: Withdrawal[] = []
  filteredWithdrawals: Withdrawal[] = []
  metrics: WithdrawalMetrics = {
    totalWithdrawals: 0,
    totalAmount: 0,
    totalFees: 0,
    averageAmount: 0,
    pendingCount: 0,
    completedCount: 0,
    failedCount: 0,
    conversionRate: 0,
    averageProcessingTime: 0,
  }

  filters: WithdrawalFilters = {
    search: "",
    status: "",
    method: "",
    priority: "",
    minAmount: null,
    maxAmount: null,
    dateFrom: "",
    dateTo: "",
    approvedBy: "",
    period: "all",
  }

  sidebarVisible = false
  selectedWithdrawal: Withdrawal | null = null
  dialogVisible = false

  // Pagination
  currentPage = 1
  itemsPerPage = 10
  totalItems = 0

  ngOnInit() {
    this.loadWithdrawals()
    this.updateMetrics()
  }

  loadWithdrawals() {
    // Simulated data
    this.withdrawals = [
      {
        id: "WD001",
        userId: "USR001",
        userName: "João Silva",
        userEmail: "joao@email.com",
        amount: 1500.0,
        fee: 15.0,
        netAmount: 1485.0,
        status: "completed",
        method: "pix",
        pixKey: "joao@email.com",
        requestDate: new Date("2024-01-15"),
        processedDate: new Date("2024-01-15"),
        completedDate: new Date("2024-01-15"),
        priority: "normal",
        approvedBy: "Admin Sistema",
        transactionId: "TXN001",
      },
      {
        id: "WD002",
        userId: "USR002",
        userName: "Maria Santos",
        userEmail: "maria@email.com",
        amount: 2500.0,
        fee: 25.0,
        netAmount: 2475.0,
        status: "pending",
        method: "ted",
        bankAccount: {
          bank: "Banco do Brasil",
          agency: "1234",
          account: "56789-0",
          accountType: "checking",
        },
        requestDate: new Date("2024-01-16"),
        priority: "high",
      },
      {
        id: "WD003",
        userId: "USR003",
        userName: "Pedro Costa",
        userEmail: "pedro@email.com",
        amount: 800.0,
        fee: 8.0,
        netAmount: 792.0,
        status: "processing",
        method: "pix",
        pixKey: "11999887766",
        requestDate: new Date("2024-01-16"),
        processedDate: new Date("2024-01-16"),
        priority: "normal",
      },
      {
        id: "WD004",
        userId: "USR004",
        userName: "Ana Oliveira",
        userEmail: "ana@email.com",
        amount: 3200.0,
        fee: 32.0,
        netAmount: 3168.0,
        status: "failed",
        method: "bank_transfer",
        bankAccount: {
          bank: "Itaú",
          agency: "5678",
          account: "12345-6",
          accountType: "savings",
        },
        requestDate: new Date("2024-01-14"),
        processedDate: new Date("2024-01-14"),
        priority: "normal",
        reason: "Dados bancários inválidos",
      },
      {
        id: "WD005",
        userId: "USR005",
        userName: "Carlos Mendes",
        userEmail: "carlos@email.com",
        amount: 5000.0,
        fee: 50.0,
        netAmount: 4950.0,
        status: "completed",
        method: "ted",
        bankAccount: {
          bank: "Santander",
          agency: "9876",
          account: "54321-0",
          accountType: "checking",
        },
        requestDate: new Date("2024-01-13"),
        processedDate: new Date("2024-01-13"),
        completedDate: new Date("2024-01-13"),
        priority: "urgent",
        approvedBy: "Admin Sistema",
        transactionId: "TXN005",
      },
    ]

    this.applyFilters()
  }

  applyFilters() {
    this.filteredWithdrawals = this.withdrawals.filter((withdrawal) => {
      const matchesSearch =
        !this.filters.search ||
        withdrawal.userName.toLowerCase().includes(this.filters.search.toLowerCase()) ||
        withdrawal.userEmail.toLowerCase().includes(this.filters.search.toLowerCase()) ||
        withdrawal.id.toLowerCase().includes(this.filters.search.toLowerCase())

      const matchesStatus = !this.filters.status || withdrawal.status === this.filters.status
      const matchesMethod = !this.filters.method || withdrawal.method === this.filters.method
      const matchesPriority = !this.filters.priority || withdrawal.priority === this.filters.priority

      const matchesMinAmount = !this.filters.minAmount || withdrawal.amount >= this.filters.minAmount
      const matchesMaxAmount = !this.filters.maxAmount || withdrawal.amount <= this.filters.maxAmount

      const matchesDateFrom =
        !this.filters.dateFrom || new Date(withdrawal.requestDate) >= new Date(this.filters.dateFrom)
      const matchesDateTo = !this.filters.dateTo || new Date(withdrawal.requestDate) <= new Date(this.filters.dateTo)

      const matchesApprovedBy =
        !this.filters.approvedBy ||
        (withdrawal.approvedBy && withdrawal.approvedBy.toLowerCase().includes(this.filters.approvedBy.toLowerCase()))

      return (
        matchesSearch &&
        matchesStatus &&
        matchesMethod &&
        matchesPriority &&
        matchesMinAmount &&
        matchesMaxAmount &&
        matchesDateFrom &&
        matchesDateTo &&
        matchesApprovedBy
      )
    })

    this.totalItems = this.filteredWithdrawals.length
    this.updateMetrics()
  }

  updateMetrics() {
    const data = this.filteredWithdrawals

    this.metrics = {
      totalWithdrawals: data.length,
      totalAmount: data.reduce((sum, w) => sum + w.amount, 0),
      totalFees: data.reduce((sum, w) => sum + w.fee, 0),
      averageAmount: data.length > 0 ? data.reduce((sum, w) => sum + w.amount, 0) / data.length : 0,
      pendingCount: data.filter((w) => w.status === "pending").length,
      completedCount: data.filter((w) => w.status === "completed").length,
      failedCount: data.filter((w) => w.status === "failed").length,
      conversionRate: data.length > 0 ? (data.filter((w) => w.status === "completed").length / data.length) * 100 : 0,
      averageProcessingTime: 2.5, // Simulated average in hours
    }
  }

  setStatus(status: string) {
    this.filters.status = status
    this.applyFilters()
  }

  clearFilters() {
    this.filters = {
      search: "",
      status: "",
      method: "",
      priority: "",
      minAmount: null,
      maxAmount: null,
      dateFrom: "",
      dateTo: "",
      approvedBy: "",
      period: "all",
    }
    this.applyFilters()
  }

  exportCSV() {
    const csvData = this.filteredWithdrawals.map((withdrawal) => ({
      ID: withdrawal.id,
      Usuario: withdrawal.userName,
      Email: withdrawal.userEmail,
      Valor: withdrawal.amount,
      Taxa: withdrawal.fee,
      "Valor Líquido": withdrawal.netAmount,
      Status: withdrawal.status,
      Método: withdrawal.method,
      Prioridade: withdrawal.priority,
      "Data Solicitação": withdrawal.requestDate.toLocaleDateString("pt-BR"),
      "Data Processamento": withdrawal.processedDate?.toLocaleDateString("pt-BR") || "",
      "Data Conclusão": withdrawal.completedDate?.toLocaleDateString("pt-BR") || "",
      "Aprovado Por": withdrawal.approvedBy || "",
      "ID Transação": withdrawal.transactionId || "",
    }))

    console.log("Exportando CSV:", csvData)
  }

  viewDetails(withdrawal: Withdrawal) {
    this.selectedWithdrawal = withdrawal
    this.dialogVisible = true
  }

  getStatusClass(status: string): string {
    const statusClasses: { [key: string]: string } = {
      pending: "warning",
      processing: "info",
      completed: "success",
      failed: "danger",
      cancelled: "secondary",
    }
    return statusClasses[status] || "secondary"
  }

  getMethodLabel(method: string): string {
    const methodLabels: { [key: string]: string } = {
      pix: "PIX",
      ted: "TED",
      bank_transfer: "Transferência",
      crypto: "Crypto",
    }
    return methodLabels[method] || method
  }

  getPriorityClass(priority: string): string {
    const priorityClasses: { [key: string]: string } = {
      low: "secondary",
      normal: "info",
      high: "warning",
      urgent: "danger",
    }
    return priorityClasses[priority] || "secondary"
  }

  fmt(value: number, type: "currency" | "int" | "percent" = "int", min = 0, max = 2): string {
    if (type === "currency") {
      return new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
        minimumFractionDigits: min,
        maximumFractionDigits: max,
      }).format(value)
    }

    if (type === "percent") {
      return new Intl.NumberFormat("pt-BR", {
        style: "percent",
        minimumFractionDigits: min,
        maximumFractionDigits: max,
      }).format(value / 100)
    }

    return new Intl.NumberFormat("pt-BR", {
      minimumFractionDigits: min,
      maximumFractionDigits: max,
    }).format(value)
  }

  get paginatedWithdrawals() {
    const start = (this.currentPage - 1) * this.itemsPerPage
    const end = start + this.itemsPerPage
    return this.filteredWithdrawals.slice(start, end)
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
